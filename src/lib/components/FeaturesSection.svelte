<script lang="ts">
  import deploioWave from '$lib/assets/deploio_wave.svg';
  import node from '$lib/assets/language_node.png';
  import django from '$lib/assets/language_django.png';
  import go from '$lib/assets/language_go.png';
  import php from '$lib/assets/language_php.png';
  import python from '$lib/assets/language_python.png';
  import ruby from '$lib/assets/language_ruby.png';
  import Carousel from '$lib/components/Carousel.svelte';
</script>

<section class="bg-deploio relative overflow-x-clip">
  <img
    src={deploioWave}
    alt="abstract waves background"
    class="-z-0 absolute w-full -rotate-6 scale-[3] opacity-5 sm:scale-[2] md:scale-[1.25]"
  />

  <Carousel class="z-10 container h-32">
    <div class="pointer-events-none flex w-max select-none items-center gap-[10vw] lg:justify-between lg:gap-32">
      <img src={node} alt="Node.js" />
      <img src={django} alt="Django" />
      <img src={go} alt="Go" />
      <img src={php} alt="PHP" />
      <img src={python} alt="Python" />
      <img src={ruby} alt="Ruby" />
    </div>
  </Carousel>
</section>
