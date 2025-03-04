<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Carousel from '$lib/components/Carousel.svelte';
  import Note from '$lib/components/Note.svelte';
  import * as m from '$lib/paraglide/messages';
  import { appear } from '$lib';

  import deploioSticker from '$lib/assets/deploio_sticker.webp';
  import chevronIcon from '$lib/assets/icons/chevron.svg'
  import mountainVector from '$lib/assets/backgrounds/mountain_vector.svg';
  import successStoryBackground from '$lib/assets/backgrounds/success_story_background.png'
  import josuaAvatar from '$lib/assets/josua.png'
  import mountainOne from '$lib/assets/backgrounds/mountain_1.webp';
  import swissMadeSoftware from '$lib/assets/swiss_made_software_and_hosting.webp';
  import Link from '$lib/components/Link.svelte';
</script>

<img src={mountainVector} alt="mountain vector background" class="pointer-events-none -my-px w-full bg-deploio" />

<section class="bg-mountain">
  <div class="group container relative z-10 mx-auto text-deploio md:max-w-xl md:pl-40 md:pr-4 lg:max-w-3xl">
    <h2 class="text-h2 mb-5 mt-8 md:mt-0" use:appear={{ delay: 50 }}>{"Wir machen Code, Deploio den Rest"}</h2>
    <p class="mb-8 text-[20px]" use:appear={{ delay: 100 }}>
    Renuo ist ein Software-Ingenieursbüro. Wir sind im Software-Geschäft, nicht im Infrastruktur-Geschäft. Ich möchte kein Kubernetes selbst betreiben und auch keine Bare-Metal-Server (wie separiere ich die Mandaten? wer macht eigentlich Kernel-Updates?). Wir entwickeln guten Code, das muss reichen: «git push», CI/CD und der Kunde kann testen. Die Infrastruktur dazu macht Deploio, in der Schweiz, und sie machen das gut. Ich musste noch nie die Türe am Stauffacher-Platz eintreten.
   </p>
    <div class="flex" use:appear={{ delay: 150 }}>
    </div>
  </div>

  <div style="box-shadow: 0px 30px 40px 0px #141D501A;">


  <span> Cloud ja, aber gerne in der Schweiz von einer Schweizer Firma mit fähigen Ingenieuren, nicht nur Amazon-Reseller. </span>
  <div class="flex">
  <div>
    <div class="border-t-1 border-deploio">
    <img src={josuaAvatar} alt="Josua" class="bg-white rounded-full w-[44px] h-[44px]">
  </div>
  </div>
  <p>
  Josua Schmid
  </p>
  <p>
  CTO Renuo AG

  </p>
  </div>

  </div>
</section>
