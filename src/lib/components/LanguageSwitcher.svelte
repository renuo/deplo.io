<script lang="ts">
  import { i18n, switchToLanguage } from '$lib/i18n';
  import { page } from '$app/stores';
  import { twMerge } from 'tailwind-merge';
  import type { AvailableLanguageTag } from '$lib/paraglide/runtime';

  interface Props {
    class?: string;
    onSelect?: () => void;
  }

  let { class: className, onSelect }: Props = $props();

  const language = $derived(i18n.getLanguageFromUrl($page.url));
  let open = $state(false);
  let container: HTMLElement | undefined;

  const langs: { tag: AvailableLanguageTag; label: string }[] = [
    { tag: 'de', label: 'DE' },
    { tag: 'en', label: 'EN' },
    { tag: 'fr', label: 'FR' },
    { tag: 'it', label: 'IT' },
  ];

  const currentLabel = $derived(langs.find((l) => l.tag === language)?.label ?? 'DE');

  function select(tag: AvailableLanguageTag) {
    switchToLanguage(tag);
    open = false;
    onSelect?.();
  }

  function handleWindowClick(e: MouseEvent) {
    if (open && container && !container.contains(e.target as Node)) {
      open = false;
    }
  }
</script>

<svelte:window onclick={handleWindowClick} />

<!-- Desktop: compact dropdown -->
<div bind:this={container} class={twMerge('relative hidden md:inline-block', className)}>
  <button
    class="flex items-center gap-1.5 text-current text-[15px]"
    onclick={() => (open = !open)}
    aria-haspopup="listbox"
    aria-expanded={open}
    aria-label="Select language"
  >
    <span>{currentLabel}</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-3 w-3 transition-transform duration-150 {open ? 'rotate-180' : ''}"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="3"
      aria-hidden="true"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  {#if open}
    <ul
      class="absolute z-50 top-full mt-2 left-1/2 -translate-x-1/2 overflow-hidden rounded bg-white shadow-lg"
      role="listbox"
    >
      {#each langs as lang}
        <li role="none">
          <button
            class="block w-full px-5 py-2 text-sm text-deploio hover:bg-gray-50 {language === lang.tag ? 'font-bold' : 'font-normal'}"
            onclick={() => select(lang.tag)}
            role="option"
            aria-selected={language === lang.tag}
          >
            {lang.label}
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<!-- Mobile: row of large tappable buttons -->
<div class={twMerge('flex md:hidden gap-6', className)}>
  {#each langs as lang}
    <button
      class="text-current py-2 text-2xl tracking-[0.02em] {language === lang.tag ? 'font-bold' : 'font-normal'}"
      onclick={() => select(lang.tag)}
    >
      {lang.label}
    </button>
  {/each}
</div>
