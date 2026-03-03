<script lang="ts">
  import HeroSection from '$lib/sections/HeroSection.svelte';
  import CustomersSection from '$lib/sections/CustomersSection.svelte';
  import FeaturesSection from '$lib/sections/FeaturesSection.svelte';
  import NotesSection from '$lib/sections/NotesSection.svelte';
  import ComparisonSection from '$lib/sections/ComparisonSection.svelte';
  import ComplexProjectSection from '$lib/sections/ComplexProjectSection.svelte';
  import GoogleTag from '$lib/components/GoogleTag.svelte';
  import * as m from '$lib/paraglide/messages';
</script>

<svelte:head>
  <title>{m.meta_title_home()}</title>
  <meta name="description" content={m.meta_description_home()} />
  <GoogleTag />
</svelte:head>

<main class="relative z-0">
  <HeroSection />
  <CustomersSection />
  <FeaturesSection />
  <NotesSection />
  <ComparisonSection />
  <ComplexProjectSection />
</main>
