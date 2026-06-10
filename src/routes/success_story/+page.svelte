<script lang="ts">
  import successStoryBackground from '$lib/assets/backgrounds/success_story_background.webp';
  import SuccessStoryHeroSection from '$lib/sections/SuccessStoryHeroSection.svelte';
  import SuccessStorySlackSection from '$lib/sections/SuccessStorySlackSection.svelte';
  import SuccessStoryNotesSection from '$lib/sections/SuccessStoryNotesSection.svelte';
  import RegisterSection from '$lib/sections/RegisterSection.svelte';
  import GoogleTag from '$lib/components/GoogleTag.svelte';
  import * as m from '$lib/paraglide/messages';

  import samuelAvatar from '$lib/assets/avatars/samuel.webp';
  import thomasAvatar from '$lib/assets/avatars/thomas.webp';
  import josuaAvatar from '$lib/assets/avatars/josua.webp';

  const clientName = 'Renuo AG';

  const slackMessages = [
    {
      baseDelay: 200,
      name: m.success_story_slack_message_1_name(),
      avatar: samuelAvatar,
      date: m.success_story_slack_message_1_date(),
      content: m.success_story_slack_message_1_text(),
    },
    {
      baseDelay: 300,
      name: m.success_story_slack_message_2_name(),
      avatar: thomasAvatar,
      date: m.success_story_slack_message_2_date(),
      content: m
        .success_story_slack_message_2_text()
        .replace('nine.ch', '<a href="https://nine.ch" class="text-blue-600">nine.ch</a>'),
    },
  ];
</script>

<svelte:head>
  <title>{m.meta_title_success_story({ clientName })}</title>
  <meta name="description" content={m.meta_description_success_story()} />
  <GoogleTag />
</svelte:head>

<main class="relative z-0">
  <SuccessStoryHeroSection
    title={m.success_story_title()}
    description={m.success_story_long_description()}
    {clientName}
    clientWebsite="renuo.ch"
    backgroundImage={successStoryBackground}
  />
  <SuccessStorySlackSection
    messages={slackMessages}
    title1={m.success_story_before_cloud_title()}
    text1={m.success_story_before_cloud_text()}
    title2={m.success_story_beauty_and_the_beast_title()}
    text2={m.success_story_beauty_and_the_beast_text()}
  />
  <SuccessStoryNotesSection
    title={m.success_story_note_title()}
    text={m.success_story_note_text()}
    quote={{ text: m.success_story_note_quote(), avatar: josuaAvatar, name: 'Josua Schmid', role: 'CTO Renuo AG' }}
  />
  <RegisterSection />
</main>
