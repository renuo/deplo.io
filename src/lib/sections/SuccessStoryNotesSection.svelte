<script lang="ts">
  import { appear } from '$lib';
  import * as m from '$lib/paraglide/messages';
  import mountainVector from '$lib/assets/backgrounds/mountain_vector_dark.svg';
  import josuaAvatar from '$lib/assets/josua.webp';
</script>

<img src={mountainVector} alt="mountain vector background" class="pointer-events-none -my-px w-full bg-deploio" />

<section class="bg-background">
  <div class="container flex gap-9 flex-col xl:flex-row">
    <div class="relative z-10 text-deploio xl:max-w-xl md:pr-4">
      <h2 class="text-h2 mb-5 mt-8 md:mt-0" use:appear={{ delay: 50 }}>{m.success_story_note_title()}</h2>
      <p class="text-[20px] font-normal" use:appear={{ delay: 100 }}>
        {m.success_story_note_text()}
      </p>
      <div class="flex" use:appear={{ delay: 150 }}></div>
    </div>

    <div
      class="relative mt-0 xl:mt-48 h-max self-end border-t-2 border-deploio bg-white p-4 pb-10 font-medium text-deploio"
      style="box-shadow: 0px 30px 40px 0px #141D501A;"
      use:appear={{ delay: 300 }}
    >
      <span class="text-2xl">
        {m.success_story_note_quote()}
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
