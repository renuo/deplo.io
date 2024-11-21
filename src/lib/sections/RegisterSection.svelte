<script lang="ts">
  import type { SubmitFunction } from '@sveltejs/kit';
  import * as m from '$lib/paraglide/messages';
  import Button from '$lib/components/Button.svelte';
  import mountainVector from '$lib/assets/backgrounds/mountain_vector.svg';
  import { enhance } from '$app/forms';
  import { fly } from 'svelte/transition';
  import { appear } from '$lib';

  const KEY_ID = '6LcrS4AqAAAAAMI4yWYJtgxIrLT6y5avlCWAOIle';

  let state: 'idle' | 'submitting' | 'success' = $state('idle');

  const submit: SubmitFunction = async ({ formData }) => {
    state = 'submitting';

    await new Promise((resolve) => window.grecaptcha.ready(() => resolve(undefined)));

    const token = await window.grecaptcha.execute(KEY_ID, { action: 'submit' });

    formData.set('token', token);

    return async ({ update }) => {
      await update();
      state = 'success';
      window.gtag('event', 'conversion', { send_to: 'AW-11323234654/N7bxCIDA2u8YEN6yq5cq' });
    };
  };
</script>

<svelte:head>
  <script src="https://www.google.com/recaptcha/api.js?render={KEY_ID}"></script>
</svelte:head>

<section id="register" class="bg-mountain text-center text-deploio">
  <img
    class="pointer-events-none -mb-px w-full -scale-x-100 select-none bg-background pt-8"
    src={mountainVector}
    alt="mountain vector background"
  />

  <div class="container relative z-10 space-y-8 !pt-16 md:!pt-0">
    <h2 class="mx-auto max-w-[800px] text-h2" use:appear={{ delay: 0 }}>{m.register_title()}</h2>
    <p class="mx-auto max-w-[620px] text-[20px]" use:appear={{ delay: 100 }}>{m.register_description()}</p>

    <form
      class="relative space-y-2 md:h-32"
      method="POST"
      action="/api/register"
      use:enhance={submit}
      use:appear={{ delay: 200 }}
    >
      {#if state === 'success'}
        <div class="absolute bottom-0 left-0 right-0 top-0 !m-0 text-deploio" transition:fly={{ y: 16 }}>
          <h3 class="text-xl font-medium uppercase">{m.register_thanks()}</h3>
          <p class="mx-auto max-w-sm">{m.register_message()}</p>
        </div>
      {:else}
        <input
          class="h-10 w-full border-2 bg-transparent border-background text-[15px] transition-colors focus:border-deploio focus:ring-0 max-md:text-sm sm:w-72"
          class:opacity-50={state === 'submitting'}
          name="email"
          type="email"
          placeholder={m.register_placeholder()}
          required
          disabled={state === 'submitting'}
        />
        <Button
          class="ml-3 h-10 w-full sm:w-auto"
          type="submit"
          variant={state === 'idle' ? 'secondary' : 'primary'}
          disabled={state === 'submitting'}
        >
          {m.register_button()}
        </Button>

        <p class="mx-auto max-w-[500px] text-sm" use:appear={{ delay: 100 }}>{m.register_promo()}</p>
      {/if}
    </form>
  </div>
</section>
