import { negotiateLanguagePreferences } from '@inlang/paraglide-js/internal/adapter-utils';
import { availableLanguageTags, sourceLanguageTag } from '../src/lib/paraglide/runtime.js';

const EXCLUDED_PATHS = new Set(['/claude_skill', '/sitemap.xml', '/terms']);

/**
 * Returns a localized path when an initial document request needs redirecting.
 * Explicit URL prefixes and an existing language cookie take precedence over
 * the browser's Accept-Language header.
 *
 * @param {{
 *   headers: import('node:http').IncomingHttpHeaders;
 *   method?: string;
 *   url?: string;
 * }} request
 */
export function getLanguageRedirect(request) {
  if (request.method !== 'GET' && request.method !== 'HEAD') return;

  const accept = headerValue(request.headers.accept);
  if (!accept?.toLowerCase().includes('text/html')) return;

  const url = new URL(request.url ?? '/', 'http://localhost');
  if (EXCLUDED_PATHS.has(url.pathname) || hasLanguagePrefix(url.pathname)) return;

  const savedLanguage = getCookie(headerValue(request.headers.cookie), 'paraglide_lang');
  const acceptLanguage = headerValue(request.headers['accept-language']);
  const preferredLanguage = availableLanguageTags.some((language) => language === savedLanguage)
    ? savedLanguage
    : acceptLanguage && acceptLanguage.trim() !== '*'
      ? negotiateLanguagePreferences(acceptLanguage, availableLanguageTags)[0]
      : undefined;

  if (!preferredLanguage || preferredLanguage === sourceLanguageTag) return;

  return `/${preferredLanguage}${url.pathname}${url.search}`;
}

/** @param {string} pathname */
function hasLanguagePrefix(pathname) {
  return availableLanguageTags.some((language) => pathname === `/${language}` || pathname.startsWith(`/${language}/`));
}

/** @param {string | undefined} cookieHeader @param {string} name */
function getCookie(cookieHeader, name) {
  return cookieHeader
    ?.split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${name}=`))
    ?.slice(name.length + 1);
}

/** @param {string | string[] | undefined} value */
function headerValue(value) {
  return Array.isArray(value) ? value.join(',') : value;
}
