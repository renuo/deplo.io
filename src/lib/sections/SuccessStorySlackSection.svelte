<script lang="ts">
  import { appear } from '$lib';

  import deploioWave from '$lib/assets/deploio_wave.svg';
  import SlackMessage from '$lib/components/SlackMessage.svelte';

  interface Message {
    baseDelay: number;
    avatar: string;
    name: string;
    date: string;
    messages: string;
  }

  interface SuccessStorySlackSectionProps {
    messages: Array<Message>;
    title1: string;
    text1: string;
    title2: string;
    text2: string;
  }

  const { messages, title1, text1, title2, text2 }: SuccessStorySlackSectionProps = $props();
</script>

<section class="relative overflow-x-clip bg-deploio pb-16 pt-20">
  <img
    src={deploioWave}
    alt="abstract waves background"
    class="pointer-events-none absolute left-0 right-0 top-0 z-0 w-full -rotate-6 scale-[3] opacity-5 sm:scale-[2] md:scale-[1.25]"
  />

  <div class="mb-30 container relative z-10 flex flex-col gap-12 lg:flex-row">
    <div class="flex flex-col gap-5 lg:w-1/2">
      {#each messages as message}
        <SlackMessage baseDelay={message.baseDelay} name={message.name} avatar={message.avatar} date={message.date}>
          {@html message.content}
        </SlackMessage>
      {/each}
    </div>
    <div class="lg:w-1/2">
      <div class="text-white" use:appear={{ delay: 100 }}>
        <h3 class="text-h3 pb-4">
          {title1}
        </h3>
        <p use:appear={{ delay: 200 }}>
          {@html text1}
        </p>
      </div>

      <div class="ml-auto text-white xl:w-2/3">
        <h3 class="text-h3 mt-8 pb-4" use:appear={{ delay: 300 }}>{title2}</h3>
        <p use:appear={{ delay: 400 }}>
          {text2}
        </p>
      </div>
    </div>
  </div>
</section>
