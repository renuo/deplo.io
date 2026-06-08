<script lang="ts">
  import SuccessStoryHeroSection from '$lib/sections/SuccessStoryHeroSection.svelte';
  import CustomersSection from '$lib/sections/CustomersSection.svelte';
  import SuccessStorySlackSection from '$lib/sections/SuccessStorySlackSection.svelte';
  import SuccessStoryNotesSection from '$lib/sections/SuccessStoryNotesSection.svelte';
  import ComparisonSection from '$lib/sections/ComparisonSection.svelte';
  import RegisterSection from '$lib/sections/RegisterSection.svelte';
  import GoogleTag from '$lib/components/GoogleTag.svelte';
  import * as m from '$lib/paraglide/messages';
</script>

<svelte:head>
  <title>{m.meta_title_success_story()}</title>
  <meta name="description" content={m.meta_description_success_story()} />
  <GoogleTag />
</svelte:head>

<main class="relative z-0">
  <SuccessStoryHeroSection />
  <SuccessStorySlackSection />
  <SuccessStoryNotesSection />
  <RegisterSection />
</main>
