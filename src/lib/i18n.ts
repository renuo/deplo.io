import { goto } from '$app/navigation';
import { page } from '$app/stores';
import type { AvailableLanguageTag } from '$lib/paraglide/runtime';
import * as runtime from '$lib/paraglide/runtime';
import { createI18n } from '@inlang/paraglide-sveltekit';
import { get } from 'svelte/store';
export const i18n = createI18n(runtime);

export function switchToLanguage(newLanguage: AvailableLanguageTag) {
  const canonicalPath = i18n.route(get(page).url.pathname);
  const localisedPath = i18n.resolveRoute(canonicalPath, newLanguage);
  goto(localisedPath);
}
