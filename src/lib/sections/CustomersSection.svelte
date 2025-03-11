<script lang="ts">
  import Carousel from '$lib/components/Carousel.svelte';
  import * as m from '$lib/paraglide/messages';
  import { appear } from '$lib';

  import bdo from '$lib/assets/logos/bdo.svg';
  import bienenSchweiz from '$lib/assets/logos/bienen_schweiz.svg';
  import stadtZuerich from '$lib/assets/logos/stadt_zuerich.svg';
  import swissIct from '$lib/assets/logos/swiss_ict.svg';
  import modeWeber from '$lib/assets/logos/mode_weber.png';
</script>

<section class="relative overflow-x-clip bg-deploio pb-6 pt-8">
  <div class="container relative z-10">
    <span class="mb-6 block text-left text-lg font-normal text-white">{m.customers_trust()}</span>

    <Carousel>
      <div
        class="pointer-events-none flex w-max select-none items-center gap-[10vw] lg:w-full lg:justify-between lg:gap-16"
        use:appear={{ delay: 0 }}
      >
        <img class="h-34 w-auto object-contain brightness-0 invert" src={stadtZuerich} alt="Stadt Zürich" />
        <img class="h-34 w-auto object-contain brightness-0 invert" src={bdo} alt="BDO" />
        <img class="h-34 w-auto object-contain brightness-0 invert" src={swissIct} alt="Swiss ICT" />
        <img class="h-34 w-auto object-contain brightness-0 invert" src={bienenSchweiz} alt="Bienen Schweiz" />
        <img class="h-34 w-auto object-contain brightness-0 invert" src={modeWeber} alt="Modeweber" />
      </div>
    </Carousel>
  </div>
</section>
