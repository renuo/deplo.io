<script lang="ts">
  import { appear } from '$lib';
  import mountainVector from '$lib/assets/backgrounds/mountain_vector_dark.svg';
  import josuaAvatar from '$lib/assets/josua.png';
</script>

<img src={mountainVector} alt="mountain vector background" class="pointer-events-none -my-px w-full bg-deploio" />

<section class="bg-background">
  <div class="container flex gap-9">
    <div class="relative z-10 text-deploio md:max-w-xl md:pr-4">
      <h2 class="text-h2 mb-5 mt-8 md:mt-0" use:appear={{ delay: 50 }}>{'Wir machen Code, Deploio den Rest'}</h2>
      <p class="mb-8 text-[20px] font-normal" use:appear={{ delay: 100 }}>
        <!-- TODO: Add translations -->
        Renuo ist ein Software-Ingenieursbüro. Wir sind im Software-Geschäft, nicht im Infrastruktur-Geschäft. Ich möchte
        kein Kubernetes selbst betreiben und auch keine Bare-Metal-Server (wie separiere ich die Mandaten? wer macht eigentlich
        Kernel-Updates?). Wir entwickeln guten Code, das muss reichen: «git push», CI/CD und der Kunde kann testen. Die Infrastruktur
        dazu macht Deploio, in der Schweiz, und sie machen das gut. Ich musste noch nie die Türe am Stauffacher-Platz eintreten.
      </p>
      <div class="flex" use:appear={{ delay: 150 }}></div>
    </div>

    <div
      class="relative mt-48 h-max self-end border-t-2 border-deploio bg-white p-4 pb-10 font-medium text-deploio"
      style="box-shadow: 0px 30px 40px 0px #141D501A;"
      use:appear={{ delay: 300 }}
    >
      <span class="text-2xl">
        <!-- TODO: Add translations -->
        Cloud ja, aber gerne in der Schweiz von einer Schweizer Firma mit fähigen Ingenieuren, nicht nur
        Amazon-Reseller.
      </span>
      <div class="mt-6 flex items-center font-normal">
        <div class="border-t-1 mr-4 flex-shrink-0 border-deploio">
          <img src={josuaAvatar} alt="Josua" class="m-2 h-full w-11 rounded-full bg-gray-200 object-cover" />
        </div>
        <div class="text-base">
          <p use:appear={{ delay: 350 }}>Josua Schmid</p>
          <p use:appear={{ delay: 400 }} class="opacity-70">CTO Renuo AG</p>
        </div>
      </div>
    </div>
  </div>
</section>
