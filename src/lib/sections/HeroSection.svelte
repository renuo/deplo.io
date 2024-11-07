<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Link from '$lib/components/Link.svelte';
  import * as m from '$lib/paraglide/messages';

  import deploioVideo from '$lib/assets/backgrounds/deploio_video.mp4';
</script>

<section class="relative h-[800px]">
  <video class="absolute h-full min-w-full object-cover" autoplay muted loop>
    <source src={deploioVideo} type="video/mp4" />
  </video>

  <div class="absolute flex h-full w-full flex-col justify-end bg-gradient-to-t from-deploio text-white">
    <div class="container mb-16 space-y-6">
      <h1 class="max-w-[500px] text-5xl text-[46px] font-medium leading-[50px]">{m.hero_title()}</h1>
      <p class="max-w-[500px] text-lg">{m.hero_description()}</p>

      <div class="flex flex-wrap gap-2">
        <Button variant="primary" href="#register">{m.hero_start_now()}</Button>
        <Button variant="outline">{m.hero_learn_more()}</Button>
      </div>
      <div class="flex items-center gap-2 text-xs opacity-70">
        <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0.416748 9.01688V0L7.73071 4.50844L0.416748 9.01688ZM1.50008 7.12042L5.76612 4.50844L1.50008 1.89646V7.12042Z"
            fill="white"
          />
        </svg>

        <Link href="https://www.youtube.com/watch?v=3iOWZ4ou49Y">{m.hero_see_video()}</Link>
      </div>
    </div>
  </div>
</section>
