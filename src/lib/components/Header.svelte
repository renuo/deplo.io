<script lang="ts">
  import * as m from '$lib/paraglide/messages';
  import Link from '$lib/components/Link.svelte';
  import Button from '$lib/components/Button.svelte';
  import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
  import { onMount } from 'svelte';
  import deploioLogoHeader from '$lib/assets/deploio_logo_header.svg';
  import deploioLogoMobile from '$lib/assets/logos/deploio_logo.svg';
  import deploioLogo from '$lib/assets/deploio_logo.svg';
  import deploioName from '$lib/assets/deploio_name.svg';
  import hamburgerIcon from '$lib/assets/icons/hamburger.svg';
  import closeIcon from '$lib/assets/icons/close.svg';

  let isOpen = false;
  let isScrolled = false;

  function toggleMenu() {
    isOpen = !isOpen;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  onMount(() => {
    const handleScroll = () => {
      isScrolled = window.scrollY > 10;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = '';
    };
  });
</script>

<header class="container absolute left-0 right-0 top-0 z-30 flex items-center justify-between">
  <a href="/" class="flex select-none flex-row items-center justify-center gap-2 md:hidden {isOpen ? 'hidden' : ''}">
    <img class="h-7" src={deploioLogo} alt="deploio logo" />
    <img class="h-6" src={deploioName} alt="deploio" />
  </a>

  <a href="/" class="absolute hidden lg:block {isOpen ? 'opacity-0' : ''}">
    <img class="mt-12 h-48 w-48 object-contain" src={deploioLogoHeader} alt="deploio header logo" />
  </a>

  <nav class="-mt-10 ml-auto hidden items-center gap-8 md:flex">
    <LanguageSwitcher class="text-white" />
    <Link href="/pricing">{m.navigation_pricing()}</Link>
    <Link href="/team">{m.navigation_team()}</Link>
    <Link href="https://docs.deplo.io">{m.navigation_documentation()}</Link>
    <Link href="https://cockpit.nine.ch/{m.navigation_language()}/session/new?origin=deploio" target="_blank"
      >{m.navigation_login()}</Link
    >
    <Button
      variant="primary"
      href="https://cockpit.nine.ch/{m.navigation_language()}/fast_onboardings/new?origin=deploio"
      target="_blank">{m.navigation_start()}</Button
    >
  </nav>

  <button
    class="z-40 p-3 md:hidden {isOpen ? 'fixed right-4 top-3' : 'relative'}"
    aria-label={isOpen ? 'Close menu' : 'Open menu'}
    on:click={toggleMenu}
  >
    {#if isOpen}
      <img src={closeIcon} alt="Close menu" />
    {:else}
      <img src={hamburgerIcon} alt="Open menu" />
    {/if}
  </button>
</header>

{#if isOpen}
  <div class="fixed inset-0 z-20 flex flex-col bg-white pt-5 md:hidden">
    <div class="container">
      <a href="/" class="flex items-center">
        <img class="-mt-1 h-7" src={deploioLogoMobile} alt="deploio logo" />
      </a>
    </div>

    <nav class="container mt-4 flex h-full w-full flex-col pt-12">
      <a href="/pricing" on:click={toggleMenu} class="w-full py-3 text-2xl font-normal tracking-[0.02em] text-deploio">
        {m.navigation_pricing()}
      </a>

      <a
        href="https://docs.deplo.io"
        on:click={toggleMenu}
        class="w-full py-3 text-2xl font-normal tracking-[0.02em] text-deploio"
      >
        {m.navigation_documentation()}
      </a>

      <a
        href="https://cockpit.nine.ch/{m.navigation_language()}/session/new?origin=deploio"
        target="_blank"
        on:click={toggleMenu}
        class="w-full py-3 text-2xl font-normal tracking-[0.02em] text-deploio"
      >
        {m.navigation_login()}
      </a>

      <a href="/team" on:click={toggleMenu} class="w-full py-3 text-2xl font-normal tracking-[0.02em] text-deploio">
        {m.navigation_team()}
      </a>

      <div class="mt-auto"></div>

      <LanguageSwitcher class="text-deploio" onSelect={toggleMenu} />

      <div class="h-6"></div>

      <a
        href="https://cockpit.nine.ch/{m.navigation_language()}/signup?origin=deploio"
        on:click={toggleMenu}
        class="w-full bg-deploio py-2 text-center text-lg tracking-[0.02em] text-white"
      >
        {m.navigation_start()}
      </a>

      <div class="h-8"></div>
    </nav>
  </div>
{/if}
