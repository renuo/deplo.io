<script lang="ts">
  import successStoryBackground from '$lib/assets/backgrounds/demokratis_success_story_background.webp';
  import SuccessStoryHeroSection from '$lib/sections/SuccessStoryHeroSection.svelte';
  import SuccessStorySlackSection from '$lib/sections/SuccessStorySlackSection.svelte';
  import SuccessStoryNotesSection from '$lib/sections/SuccessStoryNotesSection.svelte';
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
  <SuccessStoryHeroSection
    title={m.success_story_demokratis_title()}
    description={m.success_story_demokratis_long_description()}
    clientName="Demokratis"
    clientWebsite="demokratis.ch"
    backgroundImage={successStoryBackground}
  />
  <SuccessStorySlackSection />
  <SuccessStoryNotesSection />
  <RegisterSection />
</main>
