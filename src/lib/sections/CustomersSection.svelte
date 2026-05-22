<script lang="ts">
  import Carousel from '$lib/components/Carousel.svelte';
  import * as m from '$lib/paraglide/messages';

  import bdo from '$lib/assets/logos/bdo.svg';
  import bienenSchweiz from '$lib/assets/logos/bienen_schweiz.svg';
  import stadtZuerich from '$lib/assets/logos/stadt_zuerich.svg';
  import swissIct from '$lib/assets/logos/swiss_ict.svg';
  import modeWeber from '$lib/assets/logos/mode_weber.png';
  import demokratis from '$lib/assets/logos/demokratis.svg';
  import swissstaffing from '$lib/assets/logos/swissstaffing.svg';
  import gebaeudepass from '$lib/assets/logos/gebaeudepass.svg';
  import brevalia from '$lib/assets/logos/brevalia.png';
  import tincan from '$lib/assets/logos/tincan.svg';
  import ohoDesign from '$lib/assets/logos/oho_design.svg';
  import jobRocks from '$lib/assets/logos/job_rocks.png';
  import kidesia from '$lib/assets/logos/kidesia.svg';

  const customers = [
    { src: stadtZuerich, alt: 'Stadt Zürich' },
    { src: bdo, alt: 'BDO' },
    { src: swissIct, alt: 'Swiss ICT' },
    { src: bienenSchweiz, alt: 'Bienen Schweiz' },
    { src: modeWeber, alt: 'Modeweber', lazy: true },
    { src: demokratis, alt: 'Demokratis' },
    { src: swissstaffing, alt: 'swissstaffing' },
    { src: gebaeudepass, alt: 'Gebäudepass' },
    { src: brevalia, alt: 'Brevalia', lazy: true },
    { src: tincan, alt: 'Tincan' },
    { src: ohoDesign, alt: 'OHO Design' },
    { src: jobRocks, alt: 'job.rocks', lazy: true },
    { src: kidesia, alt: 'Kidesia' },
  ];
</script>

<section class="relative overflow-x-clip bg-deploio pb-6 max-md:pt-10">
  <div class="container relative z-10">
    <span class="mb-6 block text-left text-lg font-normal text-white md:-mt-10">{m.customers_trust()}</span>

    <Carousel class="gap-[10vw] lg:gap-16">
      <div
        class="pointer-events-none flex w-max select-none items-center gap-[10vw] lg:min-w-full lg:justify-between lg:gap-16"
      >
        {#each customers as customer}
          <img
            class="max-h-[90px] object-contain brightness-0 invert"
            src={customer.src}
            alt={customer.alt}
            loading={customer.lazy ? 'lazy' : null}
          />
        {/each}
      </div>
    </Carousel>
  </div>
</section>
