<script lang="ts">
  import Carousel from '$lib/components/Carousel.svelte';
  import CodeBox from '$lib/components/CodeBox.svelte';
  import * as m from '$lib/paraglide/messages';
  import { appear } from '$lib';

  import deploioWave from '$lib/assets/deploio_wave.svg';
  import node from '$lib/assets/language_node.png';
  import django from '$lib/assets/language_django.png';
  import go from '$lib/assets/language_go.png';
  import php from '$lib/assets/language_php.png';
  import python from '$lib/assets/language_python.png';
  import ruby from '$lib/assets/language_ruby.png';
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

  <div class="container relative z-10 mb-32 grid grid-cols-1 gap-16 gap-y-24 md:grid-cols-2">
    <div class="order-1 font-medium text-white">
      <h2 class="mb-4 text-3xl uppercase" use:appear={{ delay: 0 }}>{m.feature_1_title()}</h2>
      <p use:appear={{ delay: 100 }}>{m.feature_1_description()}</p>
    </div>
    <CodeBox
      class="order-2 w-full"
      commands={[
        { command: 'git push origin main', result: '🪄' },
        { command: 'curl -I https://deine-plattform.ch/up', result: 'HTTP/2 200' },
      ]}
    />

    <div class="order-3 space-y-6 font-medium text-white">
      <h2 class="text-3xl uppercase" use:appear={{ delay: 50 }}>{m.feature_2_title()}</h2>
      <p use:appear={{ delay: 150 }}>{m.feature_2_description()}</p>
    </div>
    <CodeBox
      class="order-4 w-full"
      commands={[{ command: 'curl -s https://ipinfo.io/178.209.32.0 | jq .country', result: '"CH"' }]}
    />

    <div class="order-5 space-y-6 font-medium text-white">
      <h2 class="text-3xl uppercase" use:appear={{ delay: 50 }}>{m.feature_3_title()}</h2>
      <p use:appear={{ delay: 150 }}>{m.feature_3_description()}</p>
    </div>
    <CodeBox
      class="order-6 w-full"
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
