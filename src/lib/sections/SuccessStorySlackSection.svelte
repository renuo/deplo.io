<script lang="ts">
  import { appear } from '$lib';
  import * as m from '$lib/paraglide/messages';

  import deploioWave from '$lib/assets/deploio_wave.svg';
  import samuelAvatar from '$lib/assets/samuel.png';
  import thomasAvatar from '$lib/assets/thomas.png';
  import SlackMessage from '$lib/components/SlackMessage.svelte';
</script>

<section class="relative overflow-x-clip bg-deploio pb-16 pt-20">
  <img
    src={deploioWave}
    alt="abstract waves background"
    class="pointer-events-none absolute left-0 right-0 top-0 z-0 w-full -rotate-6 scale-[3] opacity-5 sm:scale-[2] md:scale-[1.25]"
  />

  <div class="mb-30 container relative z-10 flex flex-col lg:flex-row gap-12">
    <div class="flex lg:w-1/2 flex-col gap-5">
      <SlackMessage
        baseDelay={200}
        name={m.success_story_slack_message_1_name()}
        avatar={samuelAvatar}
        date={m.success_story_slack_message_1_date()}
      >
        {m.success_story_slack_message_1_text()}
      </SlackMessage>

      <SlackMessage 
        baseDelay={300} 
        name={m.success_story_slack_message_2_name()} 
        avatar={thomasAvatar} 
        date={m.success_story_slack_message_2_date()}
      >
        {@html m.success_story_slack_message_2_text().replace('nine.ch', '<a href="https://nine.ch" class="text-blue-600">nine.ch</a>')}
      </SlackMessage>
    </div>
    <div class="lg:w-1/2">
      <div class="text-white" use:appear={{ delay: 100 }}>
        <h3 class="text-h3 pb-4">
          {m.success_story_slack_before_cloud()}
        </h3>
        <p use:appear={{ delay: 200 }}>
          {m.success_story_slack_text()}
        </p>
      </div>

      <div class="ml-auto xl:w-2/3 text-white">
        <h3 class="text-h3 mt-8 pb-4" use:appear={{ delay: 300 }}>{m.success_story_slack_beauty_beast()}</h3>
        <p use:appear={{ delay: 400 }}>
          {m.success_story_slack_beauty_beast_text()}
        </p>
      </div>
    </div>
  </div>
</section>
