<script lang="ts">
  import * as m from '$lib/paraglide/messages';
  import Link from '$lib/components/Link.svelte';
  import Button from '$lib/components/Button.svelte';
  import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
  import { onMount } from 'svelte';

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

<header class="container absolute left-0 right-0 top-0 z-20 flex items-start justify-between">
  <a
    href="/"
    class="{isOpen ? 'hidden' : 'flex'} md:flex select-none flex-row items-center justify-center gap-2 md:h-48 md:w-48 md:flex-col md:rounded-full md:bg-deploio"
  >
    <img class="h-[30px] md:h-16" src={deploioLogo} alt="deploio logo" />
    <img class="h-5 md:h-7" src={deploioName} alt="deploio" />
  </a>

  <nav class="hidden md:flex items-center gap-8">
    <LanguageSwitcher />
    <Link href="/pricing">{m.navigation_pricing()}</Link>
    <Link href="https://docs.deplo.io">{m.navigation_documentation()}</Link>
    <Link href="https://cockpit.nine.ch/de/session/new?origin=%2F" target="_blank">{m.navigation_login()}</Link>
    <Button variant="primary" href="#register">{m.navigation_start()}</Button>
  </nav>

  <button 
    class="md:hidden p-3 z-30 ml-auto {isOpen ? 'text-deploio absolute top-0 right-0 p-0 pr-7 pt-3' : 'text-white absolute top-0 right-0'}"
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
  <div 
    class="fixed inset-0 bg-white z-10 flex flex-col md:hidden"
  >
    <div class="container pt-4">
      <a href="/" class="flex items-center">
        <img class="h-[30px]" src={deploioLogoMobile} alt="deploio logo" />
      </a>
    </div>
    
    <nav class="flex flex-col w-full pt-12 mt-9 container h-full relative">
      <a 
        href="/pricing" 
        on:click={toggleMenu}
        class="text-deploio py-3 text-2xl tracking-[0.02em] font-normal w-full"
      >
        {m.navigation_pricing()}
      </a>
      
      <a 
        href="https://docs.deplo.io" 
        on:click={toggleMenu}
        class="text-deploio py-3 text-2xl tracking-[0.02em] font-normal w-full"
      >
        {m.navigation_documentation()}
      </a>
      
      <a 
        href="https://cockpit.nine.ch/de/session/new?origin=%2F" 
        target="_blank" 
        on:click={toggleMenu}
        class="text-deploio py-3 text-2xl tracking-[0.02em] font-normal w-full"
      >
        {m.navigation_login()}
      </a>
      
      <div class="h-8"></div>
      
      <a 
        href="#register" 
        on:click={toggleMenu}
        class="bg-deploio text-white py-2 text-lg tracking-[0.02em] text-center w-full"
      >
        {m.navigation_start()}
      </a>
      
      <div class="absolute bottom-8 left-4">
        <LanguageSwitcher />
      </div>
    </nav>
  </div>
{/if}
