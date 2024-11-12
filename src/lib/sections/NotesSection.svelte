<script lang="ts">
  import deploioSticker from '$lib/assets/deploio_sticker.png';
  import mountainVector from '$lib/assets/backgrounds/mountain_vector.svg';
  import mountainOne from '$lib/assets/backgrounds/mountain_1.jpg';
  import swissMadeSoftware from '$lib/assets/swiss_made_software.svg';
  import Button from '$lib/components/Button.svelte';
  import Carousel from '$lib/components/Carousel.svelte';
  import Note from '$lib/components/Note.svelte';
  import * as m from '$lib/paraglide/messages';
  import { goto } from '$app/navigation';
</script>

<img src={mountainVector} alt="mountain vector background" class="-my-px w-full bg-deploio" />

<section class="bg-mountain">
  <div class="group container relative z-10 mx-auto text-deploio md:max-w-xl md:pl-32 lg:max-w-3xl">
    <img
      src={deploioSticker}
      draggable="false"
      alt="hosted on deploio sticker"
      class="absolute -bottom-8 right-8 size-48 -rotate-12 opacity-5 transition-transform group-hover:rotate-12 md:bottom-auto md:right-auto md:-ml-44 md:-mt-8"
    />
    <h2 class="mb-4 mt-8 text-3xl font-medium uppercase md:mt-0">{m.feature_3_title()}</h2>
    <p class="mb-4">{m.feature_3_description()}</p>
    <Button variant="secondary" onclick={() => goto('/pricing')}>{m.feature_3_button()}</Button>
  </div>

  <Carousel class="container relative z-10">
    <div class="my-16 flex w-max gap-8 md:my-0 lg:justify-between xl:w-full">
      <Note title={m.notes_1_title()} description={m.notes_1_description()} />
      <Note title={m.notes_2_title()} description={m.notes_2_description()} />
      <Note title={m.notes_3_title()} description={m.notes_3_description()} />
      <Note title={m.notes_4_title()} description={m.notes_4_description()} />
    </div>
  </Carousel>

  <div class="relative -z-0 -mt-[30%] h-[600px] md:h-[1000px] lg:h-[1400px]">
    <img
      src={mountainOne}
      alt="mountain from the swiss alps"
      class="absolute bottom-0 top-0 h-full w-full object-cover object-top"
    />

    <div
      class="relative flex h-full w-full flex-col items-center justify-end gap-8 bg-gradient-to-t from-black/70 from-35% via-transparent via-60% to-mountain to-95% px-8 pb-[16%]"
    >
      <img src={swissMadeSoftware} alt="swiss made software badge" class="h-10" />
      <h3 class="text-center text-3xl font-medium uppercase text-white">{m.swiss_title()}</h3>
      <p class="max-w-xl text-center text-white">{m.swiss_description()}</p>
    </div>
  </div>
</section>
