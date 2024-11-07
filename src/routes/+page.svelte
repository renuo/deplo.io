<script lang="ts">
  import HeroSection from '$lib/sections/HeroSection.svelte';
  import FeaturesSection from '$lib/sections/FeaturesSection.svelte';
  import NotesSection from '$lib/sections/NotesSection.svelte';
  import ComparisonSection from '$lib/sections/ComparisonSection.svelte';
</script>

<svelte:head>
  <title>Deploio - Schweizer PaaS</title>
</svelte:head>

<main>
  <HeroSection />
  <FeaturesSection />
  <NotesSection />
  <ComparisonSection />

  <section title="register" class="container">register</section>
</main>
