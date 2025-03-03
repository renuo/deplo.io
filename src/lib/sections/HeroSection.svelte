<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Background from '$lib/components/Background.svelte';
  import * as m from '$lib/paraglide/messages';
  import { appear } from '$lib';

  import deploioVideo from '$lib/assets/backgrounds/deploio_video.mp4';
</script>

<Background
  video={deploioVideo}
  class="h-[800px] max-sm:h-[700px]"
  background-class="max-sm:max-h-[450px]"
  gradient-class="bg-gradient-to-t from-deploio to-hero/40"
  wrapper-class="h-full"
>
  <section class="container relative flex h-full flex-col justify-end pb-16 text-deploio">
    <div class="relative flex h-full w-full flex-col justify-end text-white">
      <div class="mb-8">
        <h1 class="text-h1 mb-4 max-w-[450px] md:max-w-[600px]" use:appear={{ delay: 0 }}>
          {m.hero_title()}
        </h1>
        <p class="mb-10 max-w-[550px] text-[20px]" use:appear={{ delay: 100 }}>{m.hero_description()}</p>

        <div class="mb-3 flex flex-wrap gap-2 md:gap-6" use:appear={{ delay: 200 }}>
          <Button variant="primary" href="#register">{m.hero_start_now()}</Button>
          <Button variant="outline" href="https://docs.deplo.io/" target="_blank">
            {m.hero_learn_more()}
          </Button>
        </div>

        <a
          href="https://www.youtube.com/watch?v=3iOWZ4ou49Y"
          target="_blank"
          class="flex items-center gap-2 py-3 text-xs"
          use:appear={{ delay: 300 }}
        >
          <svg
            class="opacity-70"
            width="8"
            height="10"
            viewBox="0 0 8 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.416748 9.01688V0L7.73071 4.50844L0.416748 9.01688ZM1.50008 7.12042L5.76612 4.50844L1.50008 1.89646V7.12042Z"
              fill="white"
            />
          </svg>

          <p class="opacity-70 transition-opacity hover:opacity-100">{m.hero_see_video()}</p>
        </a>
      </div>
    </div>
  </section>
</Background>
