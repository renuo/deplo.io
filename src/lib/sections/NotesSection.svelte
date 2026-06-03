<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Note from '$lib/components/Note.svelte';
  import SuccessStoryCard from '$lib/components/SuccessStoryCard.svelte';
  import * as m from '$lib/paraglide/messages';
  import { appear } from '$lib';
  import successStoryBackground from '$lib/assets/backgrounds/success_story_background.webp';
  import demokratisSuccessStoryBackground from '$lib/assets/backgrounds/demokratis_success_story_background.webp';

  import deploioSticker from '$lib/assets/deploio_sticker.webp';
  import mountainVector from '$lib/assets/backgrounds/mountain_vector.svg';
  import mountainOne from '$lib/assets/backgrounds/mountain_1.webp';
  import swissMadeSoftware from '$lib/assets/swiss_made_software_and_hosting.webp';

  import type { SuccessStoryCardProps } from '$lib/components/SuccessStoryCard.svelte';

  const successStories: Array<SuccessStoryCardProps> = [
    {
      title: m.success_story_title(),
      subtitle: m.success_story_subtitle(),
      description: m.success_story_description(),
      backgroundImage: successStoryBackground,
    },
    {
      title: m.success_story_demokratis_title(),
      subtitle: m.success_story_demokratis_subtitle(),
      description: m.success_story_demokratis_description(),
      backgroundImage: demokratisSuccessStoryBackground,
      url: '/demokratis',
    },
  ];
</script>

<img src={mountainVector} alt="mountain vector background" class="pointer-events-none -my-px w-full bg-deploio" />

<section class="bg-mountain">
  <div
    class="no-scrollbar container -mb-16 flex w-max !max-w-full gap-6 overflow-auto !pb-[5rem] sm:w-full sm:!max-w-7xl sm:flex-col md:-mb-4"
  >
    {#each successStories as successStory}
      <SuccessStoryCard {...successStory} />
    {/each}
  </div>

  <div
    class="group container relative z-10 mx-auto text-deploio max-md:mt-20 md:max-w-xl md:pl-40 md:pr-4 lg:max-w-3xl"
  >
    <img
      src={deploioSticker}
      draggable="false"
      alt="hosted on deploio sticker"
      class="pointer-events-none absolute right-10 size-48 -rotate-12 opacity-5 transition-transform group-hover:rotate-12 max-md:-top-20 md:bottom-auto md:right-auto md:-ml-40 md:-mt-8"
    />
    <h2 class="text-h2 mb-5 mt-8 md:mt-0" use:appear={{ delay: 50 }}>{m.feature_why_title()}</h2>
    <p class="mb-8 text-[20px]" use:appear={{ delay: 100 }}>{m.feature_why_description()}</p>
    <div class="flex" use:appear={{ delay: 150 }}>
      <Button variant="secondary" href="https://docs.deplo.io" target="_blank">
        {m.feature_why_button()}
      </Button>
    </div>
  </div>

  <div class="relative z-10 mx-auto my-16 flex w-max no-scrollbar overflow-auto max-w-full gap-6 px-6 py-5 md:my-0 lg:justify-between">
    <Note title={m.notes_1_title()} description={m.notes_1_description()} />
    <Note title={m.notes_2_title()} description={m.notes_2_description()} />
    <Note title={m.notes_3_title()} description={m.notes_3_description()} />
    <Note title={m.notes_4_title()} description={m.notes_4_description()} />
  </div>

  <div
    class="relative -z-0 -mt-[130%] h-[1400px] md:-mt-[30%] md:h-[1000px] lg:h-[1400px] 2xl:-mt-[600px] 2xl:h-[2000px]"
  >
    <img
      src={mountainOne}
      alt="mountain from the swiss alps"
      loading="lazy"
      class="absolute bottom-0 top-0 h-full w-full object-cover object-[30%_70%]"
    />

    <div
      class="relative flex h-full w-full flex-col items-center justify-end bg-gradient-to-t from-transparent to-mountain"
    >
      <div
        class="flex w-full flex-col items-center bg-gradient-to-t from-black/70 from-50% to-transparent px-8 py-[16%] 2xl:py-96"
      >
        <img
          src={swissMadeSoftware}
          alt="swiss made software badge"
          class="mb-20 h-16"
          width="319"
          height="64"
          use:appear={{ delay: 0 }}
        />
        <h3 class="text-h2 mb-5 text-center text-white" use:appear={{ delay: 100 }}>
          {m.swiss_title()}
        </h3>
        <p class="max-w-xl whitespace-pre-line text-center text-white" use:appear={{ delay: 200 }}>
          {m.swiss_description()}
        </p>
      </div>
    </div>
  </div>
</section>
