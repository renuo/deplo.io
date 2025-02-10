<script lang="ts">
  import Carousel from '$lib/components/Carousel.svelte';
  import * as m from '$lib/paraglide/messages';
  import { appear } from '$lib';

  import deploioWave from '$lib/assets/deploio_wave.svg';
  import node from '$lib/assets/language_node.webp';
  import django from '$lib/assets/language_django.webp';
  import go from '$lib/assets/language_go.webp';
  import php from '$lib/assets/language_php.webp';
  import python from '$lib/assets/language_python.webp';
  import ruby from '$lib/assets/language_ruby.webp';
  import Feature from '$lib/components/Feature.svelte';
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
      use:appear={{ delay: 0 }}
    >
      <img class="h-10" src={node} alt="Node.js" />
      <img class="h-10" src={django} alt="Django" />
      <img class="h-10" src={go} alt="Go" />
      <img class="h-10" src={php} alt="PHP" />
      <img class="h-10" src={python} alt="Python" />
      <img class="h-10" src={ruby} alt="Ruby" />
    </div>
  </Carousel>

  <div class="container relative z-10 mb-32 space-y-20">
    <Feature
      title={m.feature_1_title()}
      description={m.feature_1_description()}
      commands={[
        { command: 'git push origin main', result: '🪄' },
        { command: 'curl -I https://deine-plattform.ch/up', result: 'HTTP/2 200' },
      ]}
    />

    <Feature
      title={m.feature_2_title()}
      description={m.feature_2_description()}
      commands={[{ command: 'curl -s https://ipinfo.io/178.209.32.0 | jq .country', result: '"CH"' }]}
    />

    <Feature
      title={m.feature_3_title()}
      description={m.feature_3_description()}
      commands={[
        {
          command: 'whois deploio.ch',
          result:
            'Nine Internet Solutions AG\nowned by Tom, Tim and 9 more employees\nAS29691\nRechenzentren NTS AG, NTT AG (Zürich)',
        },
      ]}
    />
  </div>
</section>
