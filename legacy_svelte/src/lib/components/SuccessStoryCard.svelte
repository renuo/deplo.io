<script lang="ts">
  import * as m from '$lib/paraglide/messages';
  import { appear } from '$lib';

  import chevronIcon from '$lib/assets/icons/chevron.svg';

  export interface SuccessStoryCardProps {
    title: string;
    subtitle: string;
    description: string;
    backgroundImage: string;
    url?: string;
  }

  let { title, subtitle, description, backgroundImage, url = '' }: SuccessStoryCardProps = $props();
</script>

<a
  href="/success_story{url}"
  class="align-stretch relative z-10 flex w-full min-w-[80vw] flex-col items-stretch border-t-2 border-deploio bg-white text-deploio transition-all hover:scale-105 sm:min-w-0 sm:flex-row"
  style="box-shadow: 0px 30px 40px 0px #141D501A;"
>
  <div class="z-10 order-1 flex-1 pb-7 pl-6 pr-6 pt-7 max-sm:mt-32 sm:order-first sm:pr-0 md:pl-6 md:pr-4">
    <h3 class="uppercase">{subtitle}</h3>
    <h2
      class="sm:text-h2 mb-5 mt-0 text-2xl uppercase max-sm:font-normal sm:whitespace-nowrap md:mt-0"
      use:appear={{ delay: 50 }}
    >
      {title}
    </h2>
    <p class="mb-8 text-[20px]" use:appear={{ delay: 100 }}>{description}</p>
    <span class="flex whitespace-nowrap font-medium text-deploio" use:appear={{ delay: 150 }}>
      {m.feature_why_button()}
      <img src={chevronIcon} alt="chevron" />
    </span>
  </div>
  <div class="flex-1">
    <div class="absolute h-1/3 w-full sm:right-0 sm:h-full sm:w-1/2"></div>
    <div class="absolute h-1/3 w-full sm:right-0 sm:h-full sm:w-1/2">
      <img
        src={backgroundImage}
        alt="Renuo success story"
        loading="lazy"
        class="h-full w-full object-cover object-top"
      />
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
