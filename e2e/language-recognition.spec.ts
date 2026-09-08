import { expect, test } from '@playwright/test';

const htmlHeaders = { accept: 'text/html' };

test('uses English for a client configured for US English', async ({ request }) => {
  const response = await request.get('/', {
    headers: { ...htmlHeaders, 'accept-language': 'en-US,en;q=0.9' },
  });

  expect(response.url()).toMatch(/\/en\/?$/);
  expect(await response.text()).toContain('<html lang="en"');
});

test('keeps German for a client configured for Swiss German', async ({ request }) => {
  const response = await request.get('/', {
    headers: { ...htmlHeaders, 'accept-language': 'de-CH,de;q=0.9' },
  });

  expect(response.url()).toMatch(/\/$/);
  expect(await response.text()).toContain('<html lang="de"');
});

test('respects a previously selected language', async ({ request }) => {
  const response = await request.get('/', {
    headers: {
      ...htmlHeaders,
      'accept-language': 'de-CH,de;q=0.9',
      cookie: 'paraglide_lang=en',
    },
  });

  expect(response.url()).toMatch(/\/en\/?$/);
  expect(await response.text()).toContain('<html lang="en"');
});

test('does not override an explicit language in the URL', async ({ request }) => {
  const response = await request.get('/fr', {
    headers: { ...htmlHeaders, 'accept-language': 'en-US,en;q=0.9' },
  });

  expect(response.url()).toMatch(/\/fr\/?$/);
  expect(await response.text()).toContain('<html lang="fr"');
});
