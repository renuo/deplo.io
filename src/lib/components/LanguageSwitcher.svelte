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
  <button class="text-deploio md:text-white text-2xl md:text-[15px]" onclick={() => switchToLanguage('de')} class:font-bold={language === 'de'}>
    {m.navigation_de()}
  </button>
  <div class="h-[46px] md:h-[22px] md:h-7 w-[2px] md:w-px max-w-[2px] bg-deploio md:bg-white self-center">&nbsp;</div>
  <button class="text-deploio md:text-white text-2xl md:text-[15px]" onclick={() => switchToLanguage('en')} class:font-bold={language === 'en'}>
    {m.navigation_en()}
  </button>
</div>
