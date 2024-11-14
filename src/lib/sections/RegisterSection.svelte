<script lang="ts">
  import type { SubmitFunction } from '@sveltejs/kit';
  import * as m from '$lib/paraglide/messages';
  import Button from '$lib/components/Button.svelte';
  import mountainVector from '$lib/assets/backgrounds/mountain_vector.svg';
  import { enhance } from '$app/forms';
  import { fly } from 'svelte/transition';
  import { appear } from '$lib';

  let state: 'idle' | 'submitting' | 'success' = $state('idle');

  const submit: SubmitFunction = () => {
    state = 'submitting';
    // TODO: gtag('event', 'conversion', {'send_to': 'AW-11323234654/N7bxCIDA2u8YEN6yq5cq'})

    return async ({ update }) => {
      await update();
      state = 'success';
    };
  };
</script>

<img class="-mb-px w-full -scale-x-100 bg-background" src={mountainVector} alt="mountain vector background" />

<section id="register" class="bg-mountain text-center text-deploio">
  <div class="container relative space-y-8">
    <h2 class="mx-auto max-w-[800px] text-3xl uppercase" use:appear={{ delay: 0 }}>{m.register_title()}</h2>
    <p class="mx-auto max-w-[600px]" use:appear={{ delay: 100 }}>{m.register_description()}</p>

    <form
      class="relative h-20 space-y-2"
      method="POST"
      action="https://script.google.com/macros/s/AKfycbwT1lwiqSW1clYKkuHFrjcXYyjpZD-mreglv8ZvKqP7e-HrTPE3YPPno6zEOtuKAysKbw/exec"
      use:enhance={submit}
      use:appear={{ delay: 200 }}
    >
      <input
        class="h-10 w-full border-2 border-background text-[15px] transition-colors focus:border-deploio focus:ring-0 max-md:text-sm sm:w-72"
        class:opacity-50={state === 'submitting'}
        name="email"
        type="email"
        placeholder={m.register_placeholder()}
        required
        disabled={state === 'submitting'}
      />
      <Button
        type="submit"
        variant={state === 'idle' ? 'secondary' : 'primary'}
        class="h-10 w-full sm:w-auto"
        disabled={state === 'submitting'}
      >
        {m.register_button()}
      </Button>

      {#if state === 'success'}
        <div class="absolute bottom-0 left-0 right-0 top-0 !m-0 bg-mountain text-deploio" transition:fly={{ y: 16 }}>
          <h3 class="text-xl font-medium uppercase">{m.register_thanks()}</h3>
          <p class="mx-auto max-w-sm">{m.register_message()}</p>
        </div>
      {/if}
    </form>
  </div>
</section>
