<script lang="ts">
  import * as m from '$lib/paraglide/messages';
  import { i18n, switchToLanguage } from '$lib/i18n';
  import { page } from '$app/stores';
  import { twMerge } from 'tailwind-merge';

  interface LanguageSwitcherProps {
    class?: string;
  }

  let { class: className }: LanguageSwitcherProps = $props();

  const language = $derived(i18n.getLanguageFromUrl($page.url));
</script>

<div class={twMerge('flex gap-2', className)}>
  <button class="text-deploio text-2xl" onclick={() => switchToLanguage('de')} class:font-bold={language === 'de'}>
    {m.navigation_de()}
  </button>
  <div class="h-7 w-px max-w-px bg-deploio self-center">&nbsp;</div>
  <button class="text-deploio text-2xl" onclick={() => switchToLanguage('en')} class:font-bold={language === 'en'}>
    {m.navigation_en()}
  </button>
</div>
