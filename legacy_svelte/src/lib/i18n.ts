import { goto } from '$app/navigation';
import { page } from '$app/stores';
import type { AvailableLanguageTag } from '$lib/paraglide/runtime';
import * as runtime from '$lib/paraglide/runtime';
import { createI18n } from '@inlang/paraglide-sveltekit';
import { get } from 'svelte/store';
export const i18n = createI18n(runtime, {
  prefixDefaultLanguage: 'never',
  exclude: ['/sitemap.xml'],
});

export function switchToLanguage(newLanguage: AvailableLanguageTag) {
  document.cookie = `deploio_language=${newLanguage};Path=/;SameSite=Lax;Max-Age=31557600`;
  const canonicalPath = i18n.route(get(page).url.pathname);
  const localisedPath = i18n.resolveRoute(canonicalPath, newLanguage);
  return goto(localisedPath);
}
