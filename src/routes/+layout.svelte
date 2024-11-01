<script lang="ts">
  import '../app.css';
  import { i18n } from '$lib/i18n';
  import { ParaglideJS } from '@inlang/paraglide-sveltekit';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let { children } = $props();
</script>

<ParaglideJS {i18n}>
  <Header />
  {@render children()}
  <Footer />
</ParaglideJS>
