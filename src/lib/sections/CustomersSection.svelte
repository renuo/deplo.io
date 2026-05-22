<script lang="ts">
  import Carousel from '$lib/components/Carousel.svelte';
  import * as m from '$lib/paraglide/messages';
  import { appear } from '$lib';

  import bdo from '$lib/assets/logos/bdo.svg';
  import bienenSchweiz from '$lib/assets/logos/bienen_schweiz.svg';
  import stadtZuerich from '$lib/assets/logos/stadt_zuerich.svg';
  import swissIct from '$lib/assets/logos/swiss_ict.svg';
  import modeWeber from '$lib/assets/logos/mode_weber.png';
  import demokratis from '$lib/assets/logos/demokratis.svg';
  import swissstaffing from '$lib/assets/logos/swissstaffing.svg';
  import gebaeudepass from '$lib/assets/logos/gebaeudepass.svg';
  import brevalia from '$lib/assets/logos/brevalia.webp';
  import tincan from '$lib/assets/logos/tincan.svg';
  import ohoDesign from '$lib/assets/logos/oho_design.svg';
  import jobRocks from '$lib/assets/logos/job_rocks.webp';
  import kidesia from '$lib/assets/logos/kidesia.svg';

  const customers = [
    { src: stadtZuerich, alt: "Stadt Zürich" },
    { src: bdo, alt: "BDO" },
    { src: swissIct, alt: "Swiss ICT" },
    { src: bienenSchweiz, alt: "Bienen Schweiz" },
    { src: modeWeber, alt: "Modeweber", lazy: true },
    { src: demokratis, alt: "Demokratis" },
    { src: swissstaffing, alt: "swissstaffing", lazy: true },
    { src: gebaeudepass, alt: "Gebäudepass ", lazy: true },
    { src: brevalia, alt: "Brevalia", lazy: true },
    { src: tincan, alt: "Tincan", lazy: true },
    { src: ohoDesign, alt: "OHO Design", lazy: true },
    { src: jobRocks, alt: "job.rocks", lazy: true },
    { src: kidesia, alt: "Kidesia", lazy: true },
  ]
</script>

<section class="relative overflow-x-clip bg-deploio pb-6 max-md:pt-10">
  <div class="container relative z-10">
    <span class="mb-6 block text-left text-lg font-normal text-white md:-mt-10">{m.customers_trust()}</span>

    <Carousel>
      <div
        class="pointer-events-none flex w-max select-none items-center gap-[10vw] lg:w-full lg:justify-between lg:gap-16"
        use:appear={{ delay: 0 }}
      >
        {#each customers as customer }
            <img class="h-34 w-auto object-contain brightness-0 invert"
                 src={customer.src}
                 alt={customer.alt}
                 loading={customer.lazy ? 'lazy' : null} />
        {/each}
      </div>
    </Carousel>
  </div>
</section>
