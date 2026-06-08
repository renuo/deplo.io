<script lang="ts">
  import { appear } from '$lib';
  import mountainVector from '$lib/assets/backgrounds/mountain_vector_dark.svg';

  interface SuccessStoryNotesSectionProps {
    title: string;
    text: string;
    quote?: {
      avatar: string;
      text: string;
      name: string;
      role: string;
    };
  }

  const { title, text, quote }: SuccessStoryNotesSectionProps = $props();
</script>

<img src={mountainVector} alt="mountain vector background" class="pointer-events-none -my-px w-full bg-deploio" />

<section class="bg-background">
  <div class="container flex flex-col gap-9 xl:flex-row">
    <div class="relative z-10 text-deploio md:pr-4 xl:max-w-xl">
      <h2 class="text-h2 mb-5 mt-8 md:mt-0" use:appear={{ delay: 50 }}>{title}</h2>
      <p class="text-[20px] font-normal" use:appear={{ delay: 100 }}>
        {@html text}
      </p>
      <div class="flex" use:appear={{ delay: 150 }}></div>
    </div>

    {#if quote}
      <div
        class="relative mt-0 h-max self-end border-t-2 border-deploio bg-white p-4 pb-10 font-medium text-deploio xl:mt-48"
        style="box-shadow: 0px 30px 40px 0px #141D501A;"
        use:appear={{ delay: 300 }}
      >
        <span class="text-2xl">
          {quote.text}
        </span>
        <div class="mt-6 flex items-center font-normal">
          <div class="border-t-1 mr-4 flex-shrink-0 border-deploio">
            <img src={quote.avatar} alt={quote.name} class="m-2 h-full w-11 rounded-full bg-gray-200 object-cover" />
          </div>
          <div class="text-base">
            <p use:appear={{ delay: 350 }}>{quote.name}</p>
            <p use:appear={{ delay: 400 }} class="opacity-70">{quote.role}</p>
          </div>
        </div>
      </div>
    {/if}
  </div>
</section>
