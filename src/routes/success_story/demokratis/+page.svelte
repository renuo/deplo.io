<script lang="ts">
  import successStoryBackground from '$lib/assets/backgrounds/demokratis_success_story_background.webp';
  import samuelAvatar from '$lib/assets/avatars/demokratis_fabian.webp';
  import SuccessStoryHeroSection from '$lib/sections/SuccessStoryHeroSection.svelte';
  import SuccessStorySlackSection from '$lib/sections/SuccessStorySlackSection.svelte';
  import SuccessStoryNotesSection from '$lib/sections/SuccessStoryNotesSection.svelte';
  import RegisterSection from '$lib/sections/RegisterSection.svelte';
  import GoogleTag from '$lib/components/GoogleTag.svelte';
  import * as m from '$lib/paraglide/messages';

  const clientName = 'Demokratis';

  const slackMessages = [
    {
      baseDelay: 200,
      name: m.success_story_demokratis_slack_message_name(),
      avatar: samuelAvatar,
      date: m.success_story_demokratis_slack_message_date(),
      content: m.success_story_demokratis_slack_message_text(),
    },
  ];
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
  <SuccessStorySlackSection
    messages={slackMessages}
    title1={m.success_story_demokratis_public_hand_title()}
    text1={m.success_story_demokratis_public_hand_text()}
    title2={m.success_story_demokratis_swissness_title()}
    text2={m.success_story_demokratis_swissness_text()}
  />
  <SuccessStoryNotesSection
    title={m.success_story_demokratis_note_title()}
    text={m.success_story_demokratis_note_text()}
  />
  <RegisterSection />
</main>
