<script lang="ts">
  import deploioWave from '$lib/assets/deploio_wave.svg';
  import node from '$lib/assets/language_node.png';
  import django from '$lib/assets/language_django.png';
  import go from '$lib/assets/language_go.png';
  import php from '$lib/assets/language_php.png';
  import python from '$lib/assets/language_python.png';
  import ruby from '$lib/assets/language_ruby.png';
  import Carousel from '$lib/components/Carousel.svelte';
  import * as m from '$lib/paraglide/messages';
</script>

<section class="relative overflow-x-clip bg-deploio pb-16 pt-20">
  <img
    src={deploioWave}
    alt="abstract waves background"
    class="pointer-events-none absolute left-0 right-0 top-0 z-0 w-full -rotate-6 scale-[3] opacity-5 sm:scale-[2] md:scale-[1.25]"
  />

  <Carousel class="container relative z-10 mb-8">
    <div
      class="pointer-events-none flex w-max select-none items-center gap-[10vw] lg:w-full lg:justify-between lg:gap-16"
    >
      <img class="h-10" src={node} alt="Node.js" />
      <img class="h-10" src={django} alt="Django" />
      <img class="h-10" src={go} alt="Go" />
      <img class="h-10" src={php} alt="PHP" />
      <img class="h-10" src={python} alt="Python" />
      <img class="h-10" src={ruby} alt="Ruby" />
    </div>
  </Carousel>

  <div class="container relative z-10 mb-32 flex flex-col gap-16 md:flex-row">
    <div class="space-y-6 font-medium text-white">
      <h2 class="text-3xl uppercase">{m.feature_1_title()}</h2>
      <p>{m.feature_1_description()}</p>
    </div>

    <div class="space-y-6 font-medium text-white">
      <h2 class="text-3xl uppercase">{m.feature_2_title()}</h2>
      <p>{m.feature_2_description()}</p>
    </div>
  </div>
</section>
