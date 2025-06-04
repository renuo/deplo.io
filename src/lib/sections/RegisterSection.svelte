<script lang="ts">
  import * as m from '$lib/paraglide/messages';
  import Button from '$lib/components/Button.svelte';
  import mountainVector from '$lib/assets/backgrounds/mountain_vector.svg';
  import { appear } from '$lib';
</script>

<section id="register" class="bg-mountain text-center text-deploio">
  <img
    class="pointer-events-none -mb-px w-full -scale-x-100 select-none bg-background pt-8"
    src={mountainVector}
    alt="mountain vector background"
  />

  <div class="container relative z-10 space-y-8 !pt-16 md:!pt-0">
    <h2 class="text-h2 mx-auto max-w-[800px]" use:appear={{ delay: 0 }}>{m.register_title()}</h2>
    <p class="mx-auto max-w-[620px] text-[20px]" use:appear={{ delay: 100 }}>{m.register_description()}</p>
    <div class="mt-2">
      <Button
      class="h-10 w-full sm:ml-3 sm:w-auto mt-2"
      type="submit"
      href="https://cockpit.nine.ch/{m.navigation_language()}/signup?origin=deploio"
      target="_blank"
      variant="secondary"
      >
        {m.register_button()}
      </Button>
    </div>
  </div>
</section>
