<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Carousel from '$lib/components/Carousel.svelte';
  import Note from '$lib/components/Note.svelte';
  import * as m from '$lib/paraglide/messages';
  import { appear } from '$lib';

  import deploioSticker from '$lib/assets/deploio_sticker.webp';
  import chevronIcon from '$lib/assets/icons/chevron.svg';
  import mountainVector from '$lib/assets/backgrounds/mountain_vector.svg';
  import successStoryBackground from '$lib/assets/backgrounds/success_story_background.webp';
  import mountainOne from '$lib/assets/backgrounds/mountain_1.webp';
  import swissMadeSoftware from '$lib/assets/swiss_made_software_and_hosting.webp';
  import Link from '$lib/components/Link.svelte';
</script>

<img src={mountainVector} alt="mountain vector background" class="pointer-events-none -my-px w-full bg-deploio" />

<section class="bg-mountain">
  <div class="container p-0">
    <a
      href="/success_story"
      class="hover:scale-105 transition-all align-stretch relative z-10 flex w-full flex-col items-stretch border-t-2 border-deploio bg-white text-deploio sm:flex-row"
      style="box-shadow: 0px 30px 40px 0px #141D501A;"
    >
      <div class="z-10 order-1 flex-1 pb-7 pl-6 pr-6 pt-7 max-sm:mt-32 sm:order-first sm:pr-0 md:pl-6 md:pr-4">
        <h3 class="">{m.success_story_subtitle()}</h3>
        <h2
          class="sm:text-h2 mb-5 mt-0 text-2xl max-sm:font-normal sm:whitespace-nowrap md:mt-0"
          use:appear={{ delay: 50 }}
        >
          {m.success_story_title()}
        </h2>
        <p class="mb-8 text-[20px]" use:appear={{ delay: 100 }}>{m.success_story_description()}</p>
        <span class="flex font-medium text-deploio whitespace-nowrap" use:appear={{ delay: 150 }}>
          {m.feature_why_button()}
          <img src={chevronIcon} alt="chevron" />
        </span>
      </div>
      <div class="flex-1">
        <div class="absolute h-1/3 w-full sm:right-0 sm:h-full sm:w-1/2"></div>
        <div class="absolute h-1/3 w-full sm:right-0 sm:h-full sm:w-1/2">
          <img src={successStoryBackground} alt="Renuo success story" class="h-full w-full object-cover object-top" />
        </div>

        <!-- Mobile Gradient -->
        <div
          class="absolute block h-1/3 w-full sm:hidden"
          style="background: linear-gradient(0deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%);
"
        ></div>
        <!-- Desktop Gradient -->
        <div
          class="absolute top-0 hidden h-full sm:right-0 sm:block sm:w-1/2"
          style="background: linear-gradient(90deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%);"
        ></div>
      </div>
    </a>
  </div>

  <div class="group container relative z-10 mx-auto text-deploio md:max-w-xl md:pl-40 md:pr-4 lg:max-w-3xl max-md:mt-20">
    <img
      src={deploioSticker}
      draggable="false"
      alt="hosted on deploio sticker"
      class="pointer-events-none absolute max-md:-top-20 right-10 size-48 -rotate-12 opacity-5 transition-transform group-hover:rotate-12 md:bottom-auto md:right-auto md:-ml-40 md:-mt-8"
    />
    <h2 class="text-h2 mb-5 mt-8 md:mt-0" use:appear={{ delay: 50 }}>{m.feature_why_title()}</h2>
    <p class="mb-8 text-[20px]" use:appear={{ delay: 100 }}>{m.feature_why_description()}</p>
    <div class="flex" use:appear={{ delay: 150 }}>
      <Button
        variant="secondary"
        href="https://docs.deplo.io"
        target="_blank"
      >
        {m.feature_why_button()}
      </Button>
    </div>
  </div>

  <Carousel class="relative z-10 px-6 py-5">
    <div class="mx-auto my-16 flex w-max gap-6 md:my-0 lg:justify-between" use:appear={{ delay: 0 }}>
      <Note title={m.notes_1_title()} description={m.notes_1_description()} />
      <Note title={m.notes_2_title()} description={m.notes_2_description()} />
      <Note title={m.notes_3_title()} description={m.notes_3_description()} />
      <Note title={m.notes_4_title()} description={m.notes_4_description()} />
    </div>
  </Carousel>

  <div
    class="relative -z-0 -mt-[130%] h-[1400px] md:h-[1000px] md:-mt-[30%] lg:h-[1400px] 2xl:-mt-[600px] 2xl:h-[2000px]">
    <img
      src={mountainOne}
      alt="mountain from the swiss alps"
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
