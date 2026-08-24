<script lang="ts">
  import Background from '$lib/components/Background.svelte';
  import deploioVideo from '$lib/assets/backgrounds/deploio_video.mp4';
  import * as m from '$lib/paraglide/messages';
  import { appear } from '$lib';
</script>

<Background
  video={deploioVideo}
  class="h-[600px]"
  gradient-class="bg-gradient-to-t from-background via-80% to-transparent"
  wrapper-class="h-full"
>
  <section class="container flex h-full flex-col justify-end space-y-6 pb-16 text-deploio">
    <h1 class="max-w-[500px] text-5xl text-[46px] font-medium uppercase leading-[50px]" use:appear={{ delay: 0 }}>
      {m.pricing_title()}
    </h1>
    <p class="max-w-[500px] text-lg" use:appear={{ delay: 100 }}>
      {m.pricing_description()}
    </p>
  </section>
</Background>

<div class="bg-background">
  <div class="container !pb-32 !pt-0">
    <iframe
      width="100%"
      height="787px"
      title="pricing"
      allow="clipboard-read; clipboard-write"
      src="https://pricing-calculator-deploio-main.renuoapp.ch"
      use:appear={{ delay: 200 }}
    ></iframe>
  </div>
</div>
