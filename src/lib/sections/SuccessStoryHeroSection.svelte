<script lang="ts">
  import Background from '$lib/components/Background.svelte';
  import * as m from '$lib/paraglide/messages';
  import { appear } from '$lib';

  import Link from '$lib/components/Link.svelte';

  interface SuccessStoryHeroSectionProps {
    title: string;
    description: string;
    clientName: string;
    clientWebsite: string;
    backgroundImage: string;
  }

  let { title, description, clientName, clientWebsite, backgroundImage }: SuccessStoryHeroSectionProps = $props();
</script>

<Background
  image={backgroundImage}
  class="h-[800px] max-sm:h-[700px]"
  background-class="max-sm:max-h-[450px]"
  gradient-class="bg-gradient-to-t from-deploio"
  wrapper-class="h-full"
>
  <section class="container relative flex h-full flex-col justify-end pb-16 text-deploio">
    <div class="relative flex h-full w-full flex-col justify-end text-white">
      <div class="mb-8">
        <h1 class="text-h1 mb-4 max-w-[450px] uppercase md:max-w-[800px]" use:appear={{ delay: 0 }}>
          {title}
        </h1>
        <p class="mb-10 max-w-[800px] text-[20px]" use:appear={{ delay: 100 }}>{description}</p>

        <div class="mb-3 flex flex-wrap gap-2 md:gap-6" use:appear={{ delay: 200 }}>
          <div>
            <span>CLIENT</span>
            <p class="opacity-80">{clientName}</p>
          </div>

          <div>
            <span>WEBSITE</span>
            <p class="opacity-80">
              <Link href="https://{clientWebsite}">{clientWebsite}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</Background>
