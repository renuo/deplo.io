import { createServer } from 'node:http';
import { negotiateLanguagePreferences } from '@inlang/paraglide-js/internal/adapter-utils';
import { handler } from './build/handler.js';
import { availableLanguageTags, sourceLanguageTag } from './src/lib/paraglide/runtime.js';

const host = process.env.HOST ?? '0.0.0.0';
const port = Number.parseInt(process.env.PORT ?? '3000', 10);
const excludedPaths = new Set(['/claude_skill', '/sitemap.xml', '/terms']);

const server = createServer((request, response) => {
  const url = new URL(request.url ?? '/', 'http://localhost');
  const accept = String(request.headers.accept ?? '');
  const acceptLanguage = request.headers['accept-language'];
  const savedLanguage = String(request.headers.cookie ?? '').match(/(?:^|;\s*)paraglide_lang=([^;]+)/)?.[1];
  const preferredLanguage = availableLanguageTags.some((language) => language === savedLanguage)
    ? savedLanguage
    : acceptLanguage && acceptLanguage !== '*'
      ? negotiateLanguagePreferences(String(acceptLanguage), availableLanguageTags)[0]
      : undefined;
  const hasLanguagePrefix = availableLanguageTags.some(
    (language) => url.pathname === `/${language}` || url.pathname.startsWith(`/${language}/`),
  );

  if (
    (request.method === 'GET' || request.method === 'HEAD') &&
    accept.includes('text/html') &&
    !excludedPaths.has(url.pathname) &&
    !hasLanguagePrefix &&
    preferredLanguage &&
    preferredLanguage !== sourceLanguageTag
  ) {
    response.writeHead(302, {
      location: `/${preferredLanguage}${url.pathname}${url.search}`,
      vary: 'Accept-Language, Cookie',
    });
    response.end();
    return;
  }

  void Promise.resolve(
    handler(request, response, () => {
      if (!response.writableEnded) {
        response.writeHead(404);
        response.end('Not found');
      }
    }),
  ).catch((error) => {
    console.error(error);

    if (!response.headersSent) {
      response.writeHead(500);
      response.end('Internal server error');
    } else {
      response.destroy();
    }
  });
});

server.listen(port, host, () => console.log(`Listening on http://${host}:${port}`));
