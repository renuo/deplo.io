<script lang="ts">
  import '../app.css';
  import { i18n } from '$lib/i18n';
  import { ParaglideJS } from '@inlang/paraglide-sveltekit';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import NewsBanner from '$lib/components/NewsBanner.svelte';
  import { page } from '$app/stores';
  import { languageTag, availableLanguageTags } from '$lib/paraglide/runtime';

  let { children } = $props();

  const isTeamPage = $derived($page.url.pathname.includes('/team'));
  const isHomePage = $derived(i18n.route($page.url.pathname) === '/');
  const isRailsWorldPage = $derived($page.url.pathname.includes('/rails_world_2026'));

  const origin = 'https://deplo.io';

  const canonicalUrl = $derived(() => {
    const canonicalPath = i18n.route($page.url.pathname);
    return `${origin}${i18n.resolveRoute(canonicalPath, languageTag())}`;
  });

  const hreflangs = $derived(() => {
    const canonicalPath = i18n.route($page.url.pathname);
    return availableLanguageTags.map((lang) => ({
      lang,
      href: `${origin}${i18n.resolveRoute(canonicalPath, lang)}`,
    }));
  });
</script>

<svelte:head>
  <link rel="canonical" href={canonicalUrl()} />
  {#each hreflangs() as { lang, href }}
    <link rel="alternate" hreflang={lang} {href} />
  {/each}
  <link
    rel="alternate"
    hreflang="x-default"
    href={`${origin}${i18n.resolveRoute(i18n.route($page.url.pathname), 'en')}`}
  />
</svelte:head>

<ParaglideJS {i18n}>
  {#if !isRailsWorldPage}
    <Header />
  {/if}
  {@render children()}
  {#if !isRailsWorldPage}
    <Footer {isTeamPage} />
  {/if}
  {#if isHomePage && !isRailsWorldPage}
    <NewsBanner />
  {/if}
</ParaglideJS>
