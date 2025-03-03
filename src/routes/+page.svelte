<script lang="ts">
  import HeroSection from '$lib/sections/HeroSection.svelte';
  import CustomersSection from '$lib/sections/CustomersSection.svelte';
  import FeaturesSection from '$lib/sections/FeaturesSection.svelte';
  import NotesSection from '$lib/sections/NotesSection.svelte';
  import ComparisonSection from '$lib/sections/ComparisonSection.svelte';
  import RegisterSection from '$lib/sections/RegisterSection.svelte';
  import GoogleTag from '$lib/components/GoogleTag.svelte';
</script>

<svelte:head>
  <title>Deploio - Schweizer PaaS</title>
  <GoogleTag />
</svelte:head>

<main class="relative z-0">
  <HeroSection />
  <CustomersSection />
  <FeaturesSection />
  <NotesSection />
  <ComparisonSection />
  <RegisterSection />
</main>
