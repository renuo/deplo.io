<script lang="ts">
  import SuccessStoryHeroSection from '$lib/sections/SuccessStoryHeroSection.svelte';
  import CustomersSection from '$lib/sections/CustomersSection.svelte';
  import SuccessStorySlackSection from '$lib/sections/SuccessStorySlackSection.svelte';
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
  <SuccessStoryHeroSection />
  <SuccessStorySlackSection />
  <NotesSection />
  <RegisterSection />
</main>
