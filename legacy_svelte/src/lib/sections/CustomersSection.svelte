<script lang="ts">
  import Marquee from '$lib/components/Marquee.svelte';
  import * as m from '$lib/paraglide/messages';

  import bdo from '$lib/assets/logos/bdo.svg';
  import bienenSchweiz from '$lib/assets/logos/bienen_schweiz.svg';
  import stadtZuerich from '$lib/assets/logos/stadt_zuerich.svg';
  import swissIct from '$lib/assets/logos/swiss_ict.svg';
  import modeWeber from '$lib/assets/logos/mode_weber.webp';
  import demokratis from '$lib/assets/logos/demokratis.svg';
  import swissstaffing from '$lib/assets/logos/swissstaffing.svg';
  import gebaeudepass from '$lib/assets/logos/gebaeudepass.svg';
  import brevalia from '$lib/assets/logos/brevalia.webp';
  import tincan from '$lib/assets/logos/tincan.svg';
  import ohoDesign from '$lib/assets/logos/oho_design.svg';
  import jobRocks from '$lib/assets/logos/job_rocks.webp';
  import kidesia from '$lib/assets/logos/kidesia.svg';
  import adss from '$lib/assets/logos/adss.svg';

  const customers = [
    { src: stadtZuerich, alt: 'Stadt Zürich' },
    { src: jobRocks, alt: 'job.rocks', lazy: true },
    { src: bdo, alt: 'BDO' },
    { src: brevalia, alt: 'Brevalia', lazy: true },
    { src: adss, alt: 'Allianz Digitale Sicherheit Schweiz' },
    { src: tincan, alt: 'Tincan' },
    { src: swissIct, alt: 'Swiss ICT' },
    { src: bienenSchweiz, alt: 'Bienen Schweiz' },
    { src: modeWeber, alt: 'Modeweber', lazy: true },
    { src: demokratis, alt: 'Demokratis' },
    { src: ohoDesign, alt: 'OHO Design' },
    { src: swissstaffing, alt: 'swissstaffing' },
    { src: kidesia, alt: 'Kidesia' },
    { src: gebaeudepass, alt: 'Gebäudepass' },
  ];
</script>

<section class="relative overflow-x-clip bg-deploio pb-6 max-md:pt-10">
  <div class="container relative z-10">
    <span class="mb-6 block text-left text-lg font-normal text-white md:-mt-10">{m.customers_trust()}</span>
    <Marquee class="pointer-events-none">
      {#each customers as customer}
        <img class="max-h-[90px] object-contain brightness-0 invert" src={customer.src} alt={customer.alt} />
      {/each}
    </Marquee>
  </div>
</section>
