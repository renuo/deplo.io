import type { RequestHandler } from './$types';

const ORIGIN = 'https://deplo.io';
const ROUTES = ['/', '/pricing', '/team', '/success_story'];
const LANGUAGES = ['en', 'de', 'fr', 'it'];

export const prerender = true;

export const GET: RequestHandler = () => {
  const urls = ROUTES.flatMap((route) => {
    const path = route === '/' ? '' : route;
    const alternates = LANGUAGES.map(
      (lang) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${ORIGIN}/${lang}${path}" />`,
    );
    alternates.push(
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN}/en${path}" />`,
    );

    return LANGUAGES.map(
      (lang) => `  <url>
    <loc>${ORIGIN}/${lang}${path}</loc>
${alternates.join('\n')}
  </url>`,
    );
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
