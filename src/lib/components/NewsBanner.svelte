<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import * as m from '$lib/paraglide/messages';
  import callMadeIcon from '$lib/assets/icons/call_made_lg.svg';
  import chevronIcon from '$lib/assets/icons/chevron_lg.svg';
  import closeIcon from '$lib/assets/icons/close_lg.svg';

  let isOpen = $state(false);
  let isReady = $state(false);

  onMount(() => {
    const saved = localStorage.getItem('newsBannerIsOpen');
    isOpen = saved ? saved === 'true' : true;
    isReady = true;
  });

  $effect(() => {
    if (isReady && browser) {
      localStorage.setItem('newsBannerIsOpen', String(isOpen));
    }
  });

  function toggleMenu() {
    isOpen = !isOpen;
  }
</script>

<div class="fixed bottom-0 left-0 z-20 w-full">
  <button
    class="absolute bottom-full right-10 bg-white p-1"
    aria-controls="news-banner"
    aria-expanded={isOpen}
    onclick={toggleMenu}
  >
    {#if isOpen}
      <img class="size-8" src={closeIcon} alt="Close news banner" />
    {:else}
      <img class="size-8" src={chevronIcon} alt="Open news banner" />
    {/if}
  </button>
  {#if isOpen && isReady}
    <div class="bg-white">
      <div id="news-banner" class="container flex flex-wrap items-center gap-y-1 !py-4 font-mono text-xl">
        <span class="me-10 font-medium text-[#3D3D3A]">{@html m.news_question()}</span>
        <span class="me-5">{m.news_cta()}</span>
        <a
          href="https://github.com/ninech/deploio-skills"
          target="_blank"
          class="btn btn-primary flex items-center text-[#476DCC]"
        >
          {m.news_link()}
          <img src={callMadeIcon} class="ml-1 size-8" alt="External link" />
        </a>
      </div>
    </div>
  {/if}
</div>
