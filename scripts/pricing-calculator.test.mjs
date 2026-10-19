import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { test } from 'node:test';

const require = createRequire(import.meta.url);
const calculator = require('../assets/js/pricing-calculator.js');

const root = new URL('..', import.meta.url).pathname;
const loadYaml = (path) =>
  JSON.parse(
    execFileSync('ruby', ['-ryaml', '-rjson', '-e', 'puts YAML.load_file(ARGV[0]).to_json', `${root}${path}`]),
  );
const config = loadYaml('_data/pricing.yml');
const products = JSON.parse(readFileSync(`${root}scripts/fixtures/pricing-products.json`, 'utf8'));
// Same shape as the strings _includes/pricing/config.html hands to the page
const strings = Object.fromEntries(
  Object.entries(loadYaml('_i18n/en.yml').en)
    .filter(([key]) => key.startsWith('pricing_calc_'))
    .map(([key, value]) => [key.replace('pricing_calc_', ''), value]),
);
const catalog = calculator.buildCatalog(products, config, 'en');

test('every configured slot resolves to a product', () => {
  assert.deepEqual(calculator.missingSlots(catalog), []);
});

test('slots pick the expected products', () => {
  assert.equal(catalog.app.mini.price, 17.5);
  assert.equal(catalog.single.mysql.m.price, 9.9);
  assert.equal(catalog.dedicated.postgresql.xs.price, 68.2);
  assert.equal(catalog.dedicated.postgresql.xxl.price, 274.2);
  assert.equal(catalog.search.multi.s.price, 204.6);
  assert.equal(catalog.search.multi.xs, null);
  assert.equal(catalog.addOns.static_egress.price, 16);
  assert.equal(catalog.addOns.ipv4.price, 5);
  assert.equal(catalog.addOns.object_storage_space.price, 0.033);
});

test('specs come from bundle contents', () => {
  assert.deepEqual(calculator.specLines(catalog.app.standard_1, strings), ['1 GB RAM', '0.5 vCPU']);
  assert.deepEqual(calculator.specLines(catalog.search.multi.m, strings), [
    '3 nodes',
    '24 GiB RAM',
    '12 vCPU',
    '180 GiB storage',
  ]);
});

test('the page starts with the default preset', () => {
  const state = calculator.presetState(config, config.default_preset);
  const estimate = calculator.computeEstimate(config, catalog, state, strings);

  assert.equal(calculator.matchingPreset(config, state), 'hobby');
  assert.deepEqual(
    estimate.items.map(({ name, detail }) => [name, detail]),
    [
      ['App · Micro', '1 × 8.75'],
      ['PostgreSQL', 'Single database · 1 GB'],
    ],
  );
});

test('one app with a small database matches the design estimate', () => {
  const state = calculator.normalizeState(config, {
    ...calculator.defaultState(config),
    app: { ...calculator.defaultState(config).app, standard_1: 1 },
    dbEngine: 'postgresql',
  });
  const estimate = calculator.computeEstimate(config, catalog, state, strings);

  assert.deepEqual(
    estimate.items.map(({ name, detail, total }) => [name, detail, total]),
    [
      ['App · Standard-1', '1 × 35.00', 35],
      ['PostgreSQL', 'Single database · 1 GB', 5.5],
    ],
  );
  assert.deepEqual(estimate.sections, { app: 35, database: 5.5, add_ons: 0 });
  assert.equal(estimate.exclVat, 40.5);
  assert.equal(estimate.vatAmount, 3.28);
  assert.equal(estimate.inclVat, 43.78);
});

test('presets add up', () => {
  const totals = ['hobby', 'production', 'scale'].map((key) => {
    const estimate = calculator.computeEstimate(config, catalog, calculator.presetState(config, key), strings);
    return [key, estimate.items.length, estimate.exclVat];
  });
  assert.deepEqual(totals, [
    ['hobby', 2, 14.25],
    ['production', 3, 85.48],
    ['scale', 9, 493.22],
  ]);
});

test('add-ons are priced by usage and quantity', () => {
  const state = calculator.normalizeState(config, {
    ...calculator.defaultState(config),
    objectStorage: true,
    storageGiB: 50,
    trafficGiB: 100,
    staticEgress: true,
    ipv4: 2,
    blockStorage: 3,
    grafana: true,
  });
  const estimate = calculator.computeEstimate(config, catalog, state, strings);

  assert.deepEqual(
    estimate.items.filter((item) => item.section === 'add_ons').map(({ name, detail, total }) => [name, detail, total]),
    [
      ['Object Storage space', '50 GiB', 1.65],
      ['Object Storage traffic', '100 GiB outgoing', 2],
      ['Static egress', 'deplo.io', 16],
      ['Additional IPv4 address', '2 × 5.00', 10],
      ['Extra block storage', '30 GiB', 4.8],
      ['Grafana', '1 instance', 8],
    ],
  );
  assert.equal(estimate.sections.add_ons, 42.45);
});

test('static egress needs at least one IPv4 address, which also works on its own', () => {
  const base = calculator.defaultState(config);
  assert.equal(calculator.normalizeState(config, { ...base, staticEgress: true, ipv4: 0 }).ipv4, 1);
  assert.equal(calculator.normalizeState(config, { ...base, staticEgress: false, ipv4: 3 }).ipv4, 3);
  assert.equal(calculator.normalizeState(config, { ...base, staticEgress: false, ipv4: 0 }).ipv4, 0);
});

test('every app instance can be removed', () => {
  const hobby = calculator.presetState(config, 'hobby');
  const state = calculator.normalizeState(config, { ...hobby, app: { ...hobby.app, micro: 0 } });

  assert.equal(state.app.micro, 0);
  assert.deepEqual(
    calculator.computeEstimate(config, catalog, state, strings).items.map((item) => item.section),
    ['database'],
  );
});

test('high availability search skips the single-node-only XS size', () => {
  const state = calculator.normalizeState(config, {
    ...calculator.defaultState(config),
    search: 'multi',
    searchSize: 'xs',
  });
  assert.equal(state.searchSize, 's');
});

test('presets are recognised regardless of hidden selections', () => {
  const state = { ...calculator.presetState(config, 'production'), dbDedicatedSize: 'xl', appFocus: 'micro' };
  assert.equal(calculator.matchingPreset(config, state), 'production');
  assert.equal(calculator.matchingPreset(config, { ...state, grafana: true }), null);
});

test('the configuration round-trips through the URL', () => {
  const state = calculator.normalizeState(config, {
    ...calculator.presetState(config, 'scale'),
    app: { ...calculator.presetState(config, 'scale').app, micro: 3 },
    search: 'multi',
    searchSize: 'l',
    ipv4: 3,
    blockStorage: 2,
    grafana: true,
  });
  const params = calculator.stateToParams(state);
  const restored = calculator.stateFromParams(config, new URLSearchParams(params.toString()));

  assert.equal(calculator.stateToParams(restored).toString(), params.toString());
  assert.equal(calculator.stateFromParams(config, new URLSearchParams('lang=de')), null);
});

test('invalid URL values fall back to defaults', () => {
  const state = calculator.stateFromParams(
    config,
    new URLSearchParams('app=micro:-4,mini:2,huge:3&db=oracle&ipv4=-1&search=multi&search_size=xs'),
  );
  assert.equal(state.app.micro, 0);
  assert.equal(state.app.mini, 2);
  assert.equal('huge' in state.app, false);
  assert.equal(state.dbEngine, 'none');
  assert.equal(state.ipv4, 0);
  assert.equal(state.searchSize, 's');
});

test('amounts keep sub-cent precision', () => {
  assert.equal(calculator.formatAmount(0.033), '0.033');
  assert.equal(calculator.formatAmount(35), '35.00');
  // The de-CH thousands separator is ' or ’ depending on the ICU version
  assert.match(calculator.formatAmount(1234.5, 2), /^1['’]234\.50$/);
});
