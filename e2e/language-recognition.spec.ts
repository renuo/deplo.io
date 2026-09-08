import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { expect, test } from '@playwright/test';

const redirectScript = readFileSync('static/language-redirect.js', 'utf8');
const alternateLinks = [
  { hreflang: 'de', href: 'https://deplo.io/' },
  { hreflang: 'en', href: 'https://deplo.io/en' },
  { hreflang: 'fr', href: 'https://deplo.io/fr' },
  { hreflang: 'it', href: 'https://deplo.io/it' },
];

function runRedirect({
  browserLanguages,
  cookie = '',
  currentLanguage = 'de',
  pathname = '/',
}: {
  browserLanguages: string[];
  cookie?: string;
  currentLanguage?: string;
  pathname?: string;
}) {
  let redirectedTo: string | undefined;

  runInNewContext(redirectScript, {
    document: {
      cookie,
      documentElement: { lang: currentLanguage },
      querySelectorAll: () => alternateLinks,
    },
    location: {
      hash: '',
      pathname,
      search: '',
      replace: (target: string) => (redirectedTo = target),
    },
    navigator: { languages: browserLanguages },
    URL,
  });

  return redirectedTo;
}

test('uses English for a client configured for US English', () => {
  expect(runRedirect({ browserLanguages: ['en-US', 'en'] })).toBe('/en');
});

test('keeps German for a client configured for Swiss German', () => {
  expect(runRedirect({ browserLanguages: ['de-CH', 'de'] })).toBeUndefined();
});

test('respects a previously selected language', () => {
  expect(runRedirect({ browserLanguages: ['de-CH'], cookie: 'paraglide_lang=en' })).toBe('/en');
});

test('does not override an explicit language in the URL', () => {
  expect(runRedirect({ browserLanguages: ['en-US'], currentLanguage: 'fr', pathname: '/fr' })).toBeUndefined();
});
