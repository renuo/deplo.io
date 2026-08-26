<script lang="ts">
  import Background from '$lib/components/Background.svelte';
  import deploioVideo from '$lib/assets/backgrounds/deploio_video.mp4';
  import * as m from '$lib/paraglide/messages';
  import { languageTag } from '$lib/paraglide/runtime.js';
  import { appear } from '$lib';
  import { page } from '$app/state';

  const currentLanguage = $derived(languageTag());
  const pricingCalculatorSrc = $derived(
    `https://main.c7d7505.deploio.app/?lang=${currentLanguage}&linkbase=${encodeURIComponent(page.url.href)}&embed=true`
  );
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
      src={pricingCalculatorSrc}
      use:appear={{ delay: 200 }}
    ></iframe>
  </div>
</div>
