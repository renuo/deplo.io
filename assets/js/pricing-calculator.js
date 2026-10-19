const DEFAULT_VAT_RATE = 8.1;
const MAX_QUANTITY = 99;
const MAX_USAGE_GIB = 1000000;
const SEARCH_LEVELS = ['none', 'single', 'multi'];
const DB_PLANS = ['single', 'dedicated'];

const roundCurrency = (amount) => Math.round((amount + Math.sign(amount) * Number.EPSILON) * 100) / 100;

const calculateVat = (exclVat, vatRate = DEFAULT_VAT_RATE) => {
  const roundedExclVat = roundCurrency(exclVat);
  const vatAmount = roundCurrency(roundedExclVat * (vatRate / 100));
  return { exclVat: roundedExclVat, vatAmount, inclVat: roundCurrency(roundedExclVat + vatAmount), vatRate };
};

const formatNumber = (value, options) => new Intl.NumberFormat('de-CH', options).format(value);

// Keeps sub-cent prices such as 0.033 intact, everything else gets two decimals
const formatAmount = (amount, fixedFractionDigits) => {
  const value = Number.parseFloat(Number(amount).toPrecision(10));
  const decimals = fixedFractionDigits ?? Math.max(2, (value.toString().split('.')[1] || '').length);
  return formatNumber(value, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
};

const formatQuantity = (value) => formatNumber(value, { maximumFractionDigits: 3 });

const findProduct = (products, { category, name }) => {
  const inCategory = products.filter((product) => {
    const path = Array.isArray(product.categ_id) ? product.categ_id[1] : '';
    return product.active !== false && path.includes(category);
  });
  const needle = name.toLowerCase();
  return (
    inCategory.find((product) => product.name.toLowerCase() === needle) ||
    inCategory.find((product) => product.name.toLowerCase().includes(needle)) ||
    null
  );
};

const productSpecs = (product) => {
  const specs = {};
  (product.bundle_products || []).forEach((item) => {
    const component = Array.isArray(item.sh_product_id) ? item.sh_product_id[1] : '';
    const quantity = Number(item.sh_qty);
    if (/RAM/.test(component)) {
      specs.ram = quantity;
      specs.ramUnit = /\(GB\)/.test(component) ? 'GB' : 'GiB';
    } else if (/vCPU/.test(component)) specs.vcpu = quantity;
    else if (/Block Storage/.test(component)) specs.storage = quantity;
    else if (/OpenSearch/.test(component)) specs.nodes = quantity;
  });
  return specs;
};

const toSlot = (product, language) => {
  if (!product) return null;
  const german = language === 'de';
  return {
    name: (german && product.name_de) || product.display_name || product.name,
    description: (german && product.description_sale_de) || product.description_sale || '',
    price: Number(product.list_price),
    specs: productSpecs(product),
  };
};

const buildCatalog = (products, config, language = 'de') => {
  const slot = (matcher) => toSlot(findProduct(products, matcher), language);
  const catalog = { app: {}, single: {}, dedicated: {}, kvs: {}, search: { single: {}, multi: {} }, addOns: {} };

  config.app.forEach((entry) => {
    catalog.app[entry.key] = slot(entry);
  });
  config.database.engines.forEach((engine) => {
    catalog.single[engine.key] = {};
    catalog.dedicated[engine.key] = {};
    config.database.single.forEach((size) => {
      catalog.single[engine.key][size.key] = slot({ category: engine.single_category, name: size.name });
    });
    config.database.dedicated.forEach((size) => {
      catalog.dedicated[engine.key][size.key] = slot({ category: engine.dedicated_category, name: size.name });
    });
  });
  config.key_value_store.forEach((entry) => {
    catalog.kvs[entry.key] = slot(entry);
  });
  config.search.sizes.forEach((size) => {
    ['single', 'multi'].forEach((level) => {
      catalog.search[level][size.key] = size[level]
        ? slot({ category: config.search.category, name: size[level] })
        : null;
    });
  });
  Object.entries(config.add_ons).forEach(([key, matcher]) => {
    catalog.addOns[key] = slot(matcher);
  });
  return catalog;
};

const missingSlots = (catalog) => {
  const missing = [];
  const walk = (node, path) => {
    Object.entries(node).forEach(([key, value]) => {
      const childPath = path ? `${path}.${key}` : key;
      if (value === null) missing.push(childPath);
      else if (!('price' in value)) walk(value, childPath);
    });
  };
  walk(catalog, '');
  // XS search only exists as a single node, so its missing multi variant is expected
  return missing.filter((path) => path !== 'search.multi.xs');
};

const defaultState = (config) => ({
  app: Object.fromEntries(config.app.map((entry) => [entry.key, 0])),
  appFocus: config.app[0].key,
  dbEngine: 'none',
  dbPlan: 'single',
  dbSingleSize: config.database.single[0].key,
  dbDedicatedSize: config.database.dedicated[0].key,
  kvs: 'none',
  search: 'none',
  searchSize: config.search.sizes[1]?.key ?? config.search.sizes[0].key,
  objectStorage: false,
  storageGiB: 50,
  trafficGiB: 100,
  staticEgress: false,
  ipv4: 0,
  blockStorage: 0,
  grafana: false,
});

const clampInteger = (value, min, max) => {
  const number = Math.floor(Number(value));
  if (!Number.isFinite(number)) return min;
  return Math.min(max, Math.max(min, number));
};

// Static egress needs an IPv4 address, so it can't go below one while egress is on
const minimumOf = (state, field) => (field === 'ipv4' && state.staticEgress ? 1 : 0);

const normalizeState = (config, state) => {
  const next = { ...state, app: { ...state.app } };
  Object.keys(next.app).forEach((key) => {
    next.app[key] = clampInteger(next.app[key], 0, MAX_QUANTITY);
  });
  if (!(next.appFocus in next.app)) next.appFocus = config.app[0].key;
  if (next.search === 'multi') {
    const size = config.search.sizes.find((entry) => entry.key === next.searchSize);
    if (!size?.multi) next.searchSize = config.search.sizes.find((entry) => entry.multi).key;
  }
  next.ipv4 = clampInteger(next.ipv4, minimumOf(next, 'ipv4'), MAX_QUANTITY);
  next.blockStorage = clampInteger(next.blockStorage, minimumOf(next, 'blockStorage'), MAX_QUANTITY);
  next.storageGiB = clampInteger(next.storageGiB, 0, MAX_USAGE_GIB);
  next.trafficGiB = clampInteger(next.trafficGiB, 0, MAX_USAGE_GIB);
  return next;
};

const firstAppWithQuantity = (app, fallback) => Object.keys(app).find((key) => app[key] > 0) || fallback;

const presetState = (config, presetKey) => {
  const state = defaultState(config);
  const preset = config.presets.find((entry) => entry.key === presetKey);
  if (!preset) return state;

  Object.entries(preset.app || {}).forEach(([key, quantity]) => {
    if (key in state.app) state.app[key] = quantity;
  });
  state.appFocus = firstAppWithQuantity(state.app, state.appFocus);
  state.dbEngine = preset.db_engine || 'none';
  state.dbPlan = preset.db_plan || 'single';
  if (preset.db_size) state[state.dbPlan === 'single' ? 'dbSingleSize' : 'dbDedicatedSize'] = preset.db_size;
  state.kvs = preset.kvs || 'none';
  state.search = preset.search || 'none';
  if (preset.search_size) state.searchSize = preset.search_size;
  state.objectStorage = Boolean(preset.object_storage);
  if (preset.object_storage?.space !== undefined) state.storageGiB = preset.object_storage.space;
  if (preset.object_storage?.traffic !== undefined) state.trafficGiB = preset.object_storage.traffic;
  state.staticEgress = preset.static_egress === true;
  state.ipv4 = preset.ipv4 || 0;
  state.blockStorage = preset.block_storage || 0;
  state.grafana = preset.grafana === true;
  return normalizeState(config, state);
};

const comparableState = ({ appFocus, ...state }) => {
  if (state.dbEngine === 'none') {
    delete state.dbPlan;
    delete state.dbSingleSize;
    delete state.dbDedicatedSize;
  } else delete state[state.dbPlan === 'single' ? 'dbDedicatedSize' : 'dbSingleSize'];
  if (state.search === 'none') delete state.searchSize;
  if (!state.objectStorage) {
    delete state.storageGiB;
    delete state.trafficGiB;
  }
  return JSON.stringify(state);
};

const matchingPreset = (config, state) =>
  config.presets.find((preset) => comparableState(presetState(config, preset.key)) === comparableState(state))?.key ??
  null;

const dbSlot = (catalog, state) => {
  if (state.dbEngine === 'none') return null;
  return state.dbPlan === 'single'
    ? catalog.single[state.dbEngine]?.[state.dbSingleSize]
    : catalog.dedicated[state.dbEngine]?.[state.dbDedicatedSize];
};

const searchSlot = (catalog, state) =>
  state.search === 'none' ? null : catalog.search[state.search]?.[state.searchSize];

const labelOf = (entries, key) => entries.find((entry) => entry.key === key)?.label ?? key;

const computeEstimate = (config, catalog, state, strings) => {
  const items = [];
  const add = (section, name, detail, total) => items.push({ section, name, detail, total: roundCurrency(total) });

  config.app.forEach((entry) => {
    const quantity = state.app[entry.key];
    const slot = catalog.app[entry.key];
    if (quantity && slot) {
      add('app', `${strings.app} · ${slot.name}`, `${quantity} × ${formatAmount(slot.price)}`, quantity * slot.price);
    }
  });

  const db = dbSlot(catalog, state);
  if (db) {
    const detail =
      state.dbPlan === 'single'
        ? `${strings.single_database} · ${labelOf(config.database.single, state.dbSingleSize)}`
        : `${strings.dedicated} · ${labelOf(config.database.dedicated, state.dbDedicatedSize)}`;
    add('database', labelOf(config.database.engines, state.dbEngine), detail, db.price);
  }
  const kvs = catalog.kvs[state.kvs];
  if (kvs) add('database', strings.key_value_store, labelOf(config.key_value_store, state.kvs), kvs.price);

  const search = searchSlot(catalog, state);
  if (search) {
    const level = state.search === 'single' ? strings.single_node : strings.high_availability;
    add('add_ons', strings.search, `${labelOf(config.search.sizes, state.searchSize)} · ${level}`, search.price);
  }

  const { addOns } = catalog;
  if (state.objectStorage && state.storageGiB > 0 && addOns.object_storage_space) {
    const { price } = addOns.object_storage_space;
    add('add_ons', strings.object_storage_space, `${formatQuantity(state.storageGiB)} GiB`, state.storageGiB * price);
  }
  if (state.objectStorage && state.trafficGiB > 0 && addOns.object_storage_traffic) {
    const detail = strings.gib_outgoing.replace('{gib}', formatQuantity(state.trafficGiB));
    add('add_ons', strings.object_storage_traffic, detail, state.trafficGiB * addOns.object_storage_traffic.price);
  }
  if (state.staticEgress && addOns.static_egress) {
    add('add_ons', strings.static_egress, 'deplo.io', addOns.static_egress.price);
  }
  if (state.ipv4 > 0 && addOns.ipv4) {
    const { price } = addOns.ipv4;
    add('add_ons', strings.additional_ipv4, `${state.ipv4} × ${formatAmount(price)}`, state.ipv4 * price);
  }
  if (state.blockStorage > 0 && addOns.block_storage) {
    const { price } = addOns.block_storage;
    add('add_ons', strings.block_storage, `${state.blockStorage * 10} GiB`, state.blockStorage * price);
  }
  if (state.grafana && addOns.grafana) add('add_ons', strings.grafana, strings.one_instance, addOns.grafana.price);

  const sum = (entries) => roundCurrency(entries.reduce((total, item) => total + item.total, 0));
  const sections = Object.fromEntries(
    ['app', 'database', 'add_ons'].map((section) => [section, sum(items.filter((item) => item.section === section))]),
  );
  return { items, sections, ...calculateVat(sum(items), config.vat_rate) };
};

const STATE_PARAMS = [
  'app',
  'db',
  'plan',
  'size',
  'kvs',
  'search',
  'search_size',
  'storage',
  'egress',
  'ipv4',
  'block',
  'grafana',
];

const stateToParams = (state) => {
  const params = new URLSearchParams();
  const app = Object.entries(state.app)
    .filter(([, quantity]) => quantity > 0)
    .map(([key, quantity]) => `${key}:${quantity}`)
    .join(',');
  if (app) params.set('app', app);
  params.set('db', state.dbEngine);
  if (state.dbEngine !== 'none') {
    params.set('plan', state.dbPlan);
    params.set('size', state.dbPlan === 'single' ? state.dbSingleSize : state.dbDedicatedSize);
  }
  if (state.kvs !== 'none') params.set('kvs', state.kvs);
  if (state.search !== 'none') {
    params.set('search', state.search);
    params.set('search_size', state.searchSize);
  }
  if (state.objectStorage) params.set('storage', `${state.storageGiB},${state.trafficGiB}`);
  if (state.staticEgress) params.set('egress', '1');
  if (state.ipv4 > 0) params.set('ipv4', String(state.ipv4));
  if (state.blockStorage > 0) params.set('block', String(state.blockStorage));
  if (state.grafana) params.set('grafana', '1');
  return params;
};

const stateFromParams = (config, params) => {
  if (!STATE_PARAMS.some((name) => params.has(name))) return null;

  const state = defaultState(config);
  const oneOf = (value, allowed, fallback) => (allowed.includes(value) ? value : fallback);
  const keys = (entries) => entries.map((entry) => entry.key);

  (params.get('app') || '').split(',').forEach((pair) => {
    const [key, quantity] = pair.split(':');
    if (key in state.app) state.app[key] = clampInteger(quantity, 0, MAX_QUANTITY);
  });
  state.appFocus = firstAppWithQuantity(state.app, state.appFocus);
  state.dbEngine = oneOf(params.get('db'), ['none', ...keys(config.database.engines)], 'none');
  state.dbPlan = oneOf(params.get('plan'), DB_PLANS, 'single');
  const size = params.get('size');
  if (state.dbPlan === 'single') state.dbSingleSize = oneOf(size, keys(config.database.single), state.dbSingleSize);
  else state.dbDedicatedSize = oneOf(size, keys(config.database.dedicated), state.dbDedicatedSize);
  state.kvs = oneOf(params.get('kvs'), keys(config.key_value_store), 'none');
  state.search = oneOf(params.get('search'), SEARCH_LEVELS, 'none');
  state.searchSize = oneOf(params.get('search_size'), keys(config.search.sizes), state.searchSize);
  if (params.has('storage')) {
    const [storage, traffic] = params.get('storage').split(',');
    state.objectStorage = true;
    state.storageGiB = clampInteger(storage, 0, MAX_USAGE_GIB);
    state.trafficGiB = clampInteger(traffic, 0, MAX_USAGE_GIB);
  }
  state.staticEgress = params.get('egress') === '1';
  state.ipv4 = clampInteger(params.get('ipv4'), 0, MAX_QUANTITY);
  state.blockStorage = clampInteger(params.get('block'), 0, MAX_QUANTITY);
  state.grafana = params.get('grafana') === '1';
  return normalizeState(config, state);
};

const specLines = (slot, strings, extra = []) => {
  if (!slot) return [];
  const { ram, ramUnit, vcpu, storage, nodes } = slot.specs;
  const lines = [];
  if (nodes > 1) lines.push(`${nodes} ${strings.nodes}`);
  if (ram !== undefined) lines.push(`${formatQuantity(ram)} ${ramUnit} RAM`);
  if (vcpu !== undefined) lines.push(`${formatQuantity(vcpu)} vCPU`);
  if (storage !== undefined) lines.push(`${formatQuantity(storage)} GiB ${strings.storage}`);
  return [...lines, ...extra];
};

if (typeof module !== 'undefined') {
  module.exports = {
    buildCatalog,
    calculateVat,
    computeEstimate,
    defaultState,
    formatAmount,
    matchingPreset,
    missingSlots,
    normalizeState,
    presetState,
    specLines,
    stateFromParams,
    stateToParams,
  };
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('[data-pricing]');
    if (!root) return;

    const { config, strings, language, apiUrl } = JSON.parse(root.querySelector('[data-pricing-config]').textContent);
    const desktop = window.matchMedia('(min-width: 768px)');
    let catalog = null;
    let state =
      stateFromParams(config, new URLSearchParams(window.location.search)) ||
      presetState(config, config.default_preset);

    const all = (selector) => root.querySelectorAll(selector);
    const setText = (selector, text) => all(selector).forEach((element) => (element.textContent = text));
    const setPressed = (element, pressed) => element.setAttribute('aria-pressed', String(pressed));
    const parseSet = (button) => button.dataset.set.split(':');

    const fillSlot = (key, slot, extraSpecs) => {
      setText(`[data-price="${key}"]`, slot ? formatAmount(slot.price) : '–');
      all(`[data-specs="${key}"]`).forEach((element) => {
        element.replaceChildren(
          ...specLines(slot, strings, extraSpecs).map((line) => {
            const row = document.createElement('span');
            row.className = 'block';
            row.textContent = line;
            return row;
          }),
        );
      });
      all(`[data-slot="${key}"]`).forEach((element) => (element.dataset.unavailable = String(!slot)));
    };

    const renderPrices = () => {
      config.app.forEach((entry) => {
        const slot = catalog.app[entry.key];
        fillSlot(`app.${entry.key}`, slot);
        if (slot) setText(`[data-name="app.${entry.key}"]`, slot.name);
      });
      const engine = state.dbEngine === 'none' ? config.database.engines[0].key : state.dbEngine;
      config.database.single.forEach((size) =>
        fillSlot(`single.${size.key}`, catalog.single[engine][size.key], [strings.connections]),
      );
      config.database.dedicated.forEach((size) =>
        fillSlot(`dedicated.${size.key}`, catalog.dedicated[engine][size.key]),
      );
      config.key_value_store.forEach((entry) =>
        fillSlot(`kvs.${entry.key}`, catalog.kvs[entry.key], [strings.service_fee_included]),
      );
      // XS has no high-availability variant; it stays visible (disabled) with its single-node price
      const level = state.search === 'multi' ? 'multi' : 'single';
      config.search.sizes.forEach((size) =>
        fillSlot(`search.${size.key}`, catalog.search[level][size.key] ?? catalog.search.single[size.key]),
      );
      Object.keys(config.add_ons).forEach((key) => fillSlot(`add_ons.${key}`, catalog.addOns[key]));
    };

    // Desktop highlights every size in use; mobile the size the single stepper edits, with badges for sizes in use
    const renderAppControls = () => {
      all('[data-app-tile]').forEach((tile) => {
        const key = tile.dataset.appTile;
        setPressed(tile, desktop.matches ? state.app[key] > 0 : key === state.appFocus);
      });
      all('[data-app-qty]').forEach((element) => (element.textContent = state.app[element.dataset.appQty]));
      all('[data-app-badge]').forEach((badge) => {
        const quantity = state.app[badge.dataset.appBadge];
        badge.textContent = `× ${quantity}`;
        badge.hidden = quantity === 0;
      });
      all('[data-app-step]').forEach((button) => {
        const key = button.dataset.appStep || state.appFocus;
        button.disabled = Number(button.dataset.delta) < 0 && state.app[key] === 0;
      });
      setText('[data-app-focus-qty]', state.app[state.appFocus]);

      const describedKey =
        desktop.matches && state.app[state.appFocus] === 0 ? firstAppWithQuantity(state.app, null) : state.appFocus;
      const described = catalog?.app[describedKey];
      root.querySelector('[data-app-description-box]').hidden = !described;
      setText('[data-app-description-name]', described ? `${described.name}:` : '');
      setText('[data-app-description]', described?.description ?? '');
    };

    const renderControls = () => {
      const preset = matchingPreset(config, state);
      all('[data-preset]').forEach((button) => setPressed(button, button.dataset.preset === preset));
      renderAppControls();

      all('[data-set]').forEach((button) => {
        const [field, value] = parseSet(button);
        setPressed(button, String(state[field]) === value);
      });
      all('[data-slot]').forEach((button) => {
        button.disabled =
          button.dataset.unavailable === 'true' ||
          (button.dataset.singleNodeOnly === 'true' && state.search === 'multi');
      });
      all('[data-toggle]').forEach((button) =>
        button.setAttribute('aria-checked', String(state[button.dataset.toggle])),
      );
      all('[data-step]').forEach((button) => {
        const field = button.dataset.step;
        button.disabled = Number(button.dataset.delta) < 0 && state[field] <= minimumOf(state, field);
      });
      setText('[data-value-of="ipv4"]', state.ipv4);
      setText('[data-value-of="blockStorage"]', state.blockStorage * 10);
      all('[data-input]').forEach((input) => {
        if (document.activeElement !== input) input.value = state[input.dataset.input];
      });

      const visible = {
        database: state.dbEngine !== 'none',
        single: state.dbPlan === 'single',
        dedicated: state.dbPlan === 'dedicated',
        search: state.search !== 'none',
        'search-multi': state.search === 'multi',
        'search-single': state.search === 'single',
        'object-storage': state.objectStorage,
        egress: state.staticEgress,
        'no-egress': !state.staticEgress,
      };
      all('[data-visible]').forEach((element) => {
        element.hidden = !element.dataset.visible.split(' ').every((condition) => visible[condition]);
      });
    };

    const renderEstimate = () => {
      const estimate = computeEstimate(config, catalog, state, strings);
      Object.entries(estimate.sections).forEach(([section, total]) =>
        setText(`[data-total="${section}"]`, formatAmount(total, 2)),
      );
      setText('[data-subtotal]', formatAmount(estimate.exclVat, 2));
      setText('[data-vat]', formatAmount(estimate.vatAmount, 2));
      setText('[data-grand-total]', formatAmount(estimate.inclVat, 2));
      setText(
        '[data-item-count]',
        (estimate.items.length === 1 ? strings.item : strings.items).replace('{count}', estimate.items.length),
      );

      const template = root.querySelector('[data-estimate-item-template]').content.firstElementChild;
      const toRow = (item) => {
        const row = template.cloneNode(true);
        row.querySelector('[data-item-name]').textContent = item.name;
        row.querySelector('[data-item-detail]').textContent = item.detail;
        row.querySelector('[data-item-total]').textContent = formatAmount(item.total, 2);
        return row;
      };
      const itemsIn = (section) => estimate.items.filter((item) => !section || item.section === section);
      // A list with a section name (print sheet) only shows that section's items
      all('[data-estimate-items]').forEach((list) =>
        list.replaceChildren(...itemsIn(list.dataset.estimateItems).map(toRow)),
      );
      all('[data-estimate-section]').forEach((element) => {
        element.hidden = itemsIn(element.dataset.estimateSection).length === 0;
      });
      all('[data-estimate-empty]').forEach((element) => (element.hidden = estimate.items.length > 0));
    };

    const render = () => {
      renderControls();
      if (catalog) renderEstimate();
    };

    const update = (changes) => {
      state = normalizeState(config, { ...state, ...changes });
      const query = stateToParams(state).toString();
      window.history.replaceState(null, '', `${window.location.pathname}?${query}${window.location.hash}`);
      // Database and search tiles show the prices of the selected engine or availability level
      if (catalog && ('dbEngine' in changes || 'search' in changes)) renderPrices();
      render();
    };

    const load = async () => {
      root.dataset.state = 'loading';
      try {
        const response = await fetch(apiUrl, { headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error(`Pricing API responded with ${response.status}`);
        const products = await response.json();
        if (!Array.isArray(products)) throw new Error('Pricing API returned an unexpected response');

        catalog = buildCatalog(products, config, language);
        const missing = missingSlots(catalog);
        if (missing.length > 0) console.warn(`[pricing] No product found for: ${missing.join(', ')}`);
        renderPrices();
        render();
        root.dataset.state = 'ready';
      } catch (error) {
        console.error(error);
        root.dataset.state = 'error';
      }
    };

    const sheet = root.querySelector('[data-sheet]');
    const sheetOverlay = root.querySelector('[data-sheet-overlay]');
    const setSheetOpen = (open) => {
      sheet.hidden = !open;
      sheetOverlay.hidden = !open;
      all('[data-sheet-toggle]').forEach((button) => button.setAttribute('aria-expanded', String(open)));
      setText('[data-sheet-toggle-label]', open ? strings.hide_details : strings.show_details);
      all('[data-sheet-chevron]').forEach((icon) => icon.classList.toggle('-scale-y-100', open));
      document.body.classList.toggle('max-lg:overflow-hidden', open);
    };

    const copyLink = (button) => {
      navigator.clipboard?.writeText(window.location.href).then(() => {
        const label = button.textContent;
        button.textContent = strings.link_copied;
        window.setTimeout(() => (button.textContent = label), 2000);
      });
    };

    // Buttons pick their action through a data attribute; the first attribute listed here wins
    const actions = {
      preset: (button) => update(presetState(config, button.dataset.preset)),
      appTile: (button) => {
        const key = button.dataset.appTile;
        // On desktop the tile switches the size on and off, on mobile it only picks the size the stepper edits
        const app = desktop.matches ? { ...state.app, [key]: state.app[key] > 0 ? 0 : 1 } : state.app;
        update({ appFocus: key, app });
      },
      appStep: (button) => {
        const key = button.dataset.appStep || state.appFocus;
        update({ appFocus: key, app: { ...state.app, [key]: state.app[key] + Number(button.dataset.delta) } });
      },
      set: (button) => {
        const [field, value] = parseSet(button);
        // Switching the plan starts over at the smallest size of the new plan
        const sizes =
          field === 'dbPlan' && value !== state.dbPlan
            ? { dbSingleSize: config.database.single[0].key, dbDedicatedSize: config.database.dedicated[0].key }
            : {};
        update({ [field]: value, ...sizes });
      },
      toggle: ({ dataset: { toggle: field } }) => update({ [field]: !state[field] }),
      step: ({ dataset: { step: field, delta } }) => update({ [field]: state[field] + Number(delta) }),
      copyLink,
      print: () => window.print(),
      retry: load,
      sheetToggle: () => setSheetOpen(sheet.hidden),
      sheetClose: () => setSheetOpen(false),
    };

    root.addEventListener('click', (event) => {
      const button = event.target.closest('button');
      if (!button || button.disabled) return;
      const action = Object.keys(actions).find((name) => name in button.dataset);
      if (action) actions[action](button);
    });

    root.addEventListener('input', (event) => {
      const field = event.target.dataset?.input;
      if (field) update({ [field]: event.target.value === '' ? 0 : event.target.value });
    });

    sheetOverlay.addEventListener('click', () => setSheetOpen(false));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setSheetOpen(false);
    });

    // The mobile total bar only shows while the calculator is on screen, so it never covers the footer
    const bottomBar = root.querySelector('[data-bottom-bar]');
    new IntersectionObserver(([entry]) => {
      bottomBar.classList.toggle('translate-y-full', !entry.isIntersecting);
      if (!entry.isIntersecting) setSheetOpen(false);
    }).observe(root.querySelector('[data-pricing-sections]'));

    desktop.addEventListener('change', render);
    setText('[data-print-date]', new Intl.DateTimeFormat(`${language}-CH`, { dateStyle: 'long' }).format(new Date()));
    render();
    load();
  });
}
