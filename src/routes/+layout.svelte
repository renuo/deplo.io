<script lang="ts">
  import '../app.css';
  import { i18n } from '$lib/i18n';
  import { ParaglideJS } from '@inlang/paraglide-sveltekit';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { page } from '$app/stores';
  import { languageTag, availableLanguageTags } from '$lib/paraglide/runtime';

  let { children } = $props();

  const isTeamPage = $derived($page.url.pathname.includes('/team'));

  const origin = 'https://deplo.io';

  const canonicalUrl = $derived(() => {
    const lang = languageTag();
    const canonicalPath = i18n.route($page.url.pathname);
    return `${origin}/${lang}${canonicalPath === '/' ? '' : canonicalPath}`;
  });

  const hreflangs = $derived(() => {
    const canonicalPath = i18n.route($page.url.pathname);
    return availableLanguageTags.map((lang) => ({
      lang,
      href: `${origin}/${lang}${canonicalPath === '/' ? '' : canonicalPath}`,
    }));
  });

</script>

<svelte:head>
  <link rel="canonical" href={canonicalUrl()} />
  {#each hreflangs() as { lang, href }}
    <link rel="alternate" hreflang={lang} {href} />
  {/each}
  <link rel="alternate" hreflang="x-default" href={`${origin}/en${(() => { const p = i18n.route($page.url.pathname); return p === '/' ? '' : p; })()}`} />
</svelte:head>

<ParaglideJS {i18n}>
  <Header />
  {@render children()}
  <Footer {isTeamPage} />
</ParaglideJS>
