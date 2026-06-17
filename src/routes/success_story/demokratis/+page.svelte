<script lang="ts">
  import { appear } from '$lib';
  import successStoryBackground from '$lib/assets/backgrounds/demokratis_success_story_background.webp';
  import fabianAvatar from '$lib/assets/avatars/demokratis_fabian.webp';
  import SuccessStoryHeroSection from '$lib/sections/SuccessStoryHeroSection.svelte';
  import SuccessStoryMainSection from '$lib/sections/SuccessStoryMainSection.svelte';
  import SuccessStoryNotesSection from '$lib/sections/SuccessStoryNotesSection.svelte';
  import RegisterSection from '$lib/sections/RegisterSection.svelte';
  import GoogleTag from '$lib/components/GoogleTag.svelte';
  import * as m from '$lib/paraglide/messages';

  const clientName = 'Demokratis';
</script>

<svelte:head>
  <title>{m.meta_title_success_story({ clientName })}</title>
  <meta name="description" content={m.success_story_demokratis_description()} />
  <GoogleTag />
</svelte:head>

<main class="relative z-0">
  <SuccessStoryHeroSection
    title={m.success_story_demokratis_title()}
    description={m.success_story_demokratis_long_description()}
    {clientName}
    clientWebsite="demokratis.ch"
    backgroundImage={successStoryBackground}
  />
  <SuccessStoryMainSection
    title1={m.success_story_demokratis_public_hand_title()}
    text1={m.success_story_demokratis_public_hand_text()}
    title2={m.success_story_demokratis_swissness_title()}
    text2={m.success_story_demokratis_swissness_text()}
  >
    <div
      class="relative col-span-12 h-max border-t-2 border-deploio bg-white p-4 pb-10 font-medium text-deploio xl:col-span-4 xl:col-start-9"
      style="box-shadow: 0px 30px 40px 0px #141D501A;"
      use:appear={{ delay: 300 }}
    >
      <span class="text-2xl">
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html m.success_story_demokratis_quote_text()}
      </span>
      <div class="mt-6 flex items-center font-normal">
        <div class="border-t-1 mr-4 flex-shrink-0 border-deploio">
          <img
            src={fabianAvatar}
            alt={m.success_story_demokratis_quote_name()}
            class="m-2 h-full w-11 rounded-full bg-gray-200 object-cover"
          />
        </div>
        <div class="text-base">
          <p use:appear={{ delay: 350 }}>{m.success_story_demokratis_quote_name()}</p>
          <p use:appear={{ delay: 400 }} class="opacity-70">{m.success_story_demokratis_quote_role()}</p>
        </div>
      </div>
    </div>
  </SuccessStoryMainSection>
  <SuccessStoryNotesSection
    title={m.success_story_demokratis_note_title()}
    text={m.success_story_demokratis_note_text()}
  />
  <RegisterSection />
</main>
