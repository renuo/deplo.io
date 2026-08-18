import { expect, test } from '@playwright/test';

const TERMS_URL = 'https://docs.nine.ch/docs/legal-documents/general-terms-and-conditions/';

for (const path of ['/terms', '/terms/']) {
  test(`${path} redirects to the nine.ch general terms and conditions with a 301`, async ({ request }) => {
    const response = await request.get(path, { maxRedirects: 0 });

    expect(response.status()).toBe(301);
    expect(response.headers()['location']).toBe(TERMS_URL);
  });
}
