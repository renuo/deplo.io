import { availableLanguageTags } from '$lib/paraglide/runtime';
import type { Handle } from '@sveltejs/kit';
import { i18n } from '$lib/i18n';
import { sequence } from '@sveltejs/kit/hooks';

const LANGUAGE_COOKIE = 'preferred-language';

const handleLanguageRedirect: Handle = async ({ event, resolve }) => {
  const { pathname } = event.url;

  // Only redirect root path or paths that don't start with a language prefix
  const hasLanguagePrefix = availableLanguageTags.some(
    (lang) => pathname === `/${lang}` || pathname.startsWith(`/${lang}/`)
  );

  if (!hasLanguagePrefix && (pathname === '/' || !pathname.startsWith('/sitemap'))) {
    // Check cookie first (user's explicit choice)
    const cookieLang = event.cookies.get(LANGUAGE_COOKIE);
    if (cookieLang && availableLanguageTags.includes(cookieLang as never)) {
      return Response.redirect(new URL(`/${cookieLang}${pathname === '/' ? '' : pathname}`, event.url), 302);
    }

    // Parse Accept-Language header
    const acceptLanguage = event.request.headers.get('accept-language') ?? '';
    const preferred = acceptLanguage
      .split(',')
      .map((part) => part.split(';')[0].trim().toLowerCase().slice(0, 2))
      .find((lang) => availableLanguageTags.includes(lang as never));

    const targetLang = preferred ?? 'en';
    if (targetLang !== 'en' || pathname !== '/') {
      return Response.redirect(new URL(`/${targetLang}${pathname === '/' ? '' : pathname}`, event.url), 302);
    }
  }

  return resolve(event);
};

const handleParaglide: Handle = i18n.handle();
export const handle: Handle = sequence(handleLanguageRedirect, handleParaglide);
