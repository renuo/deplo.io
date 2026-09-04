<script lang="ts">
  import RegisterSection from '$lib/sections/RegisterSection.svelte';
  import PricingSection from '$lib/sections/PricingSection.svelte';
  import * as m from '$lib/paraglide/messages';
</script>

<svelte:head>
  <title>{m.meta_title_pricing()}</title>
  <meta name="description" content={m.meta_description_pricing()} />
</svelte:head>

<main>
  <PricingSection />
  <RegisterSection />
</main>
