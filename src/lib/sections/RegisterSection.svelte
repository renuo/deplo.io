<script lang="ts">
  import type { SubmitFunction } from '@sveltejs/kit';
  import * as m from '$lib/paraglide/messages';
  import Button from '$lib/components/Button.svelte';
  import mountainVector from '$lib/assets/backgrounds/mountain_vector.svg';
  import { enhance } from '$app/forms';
  import { fly } from 'svelte/transition';
  import { appear } from '$lib';

  const KEY_ID = '6LeflMYpAAAAANQb_AFEGGWCNCfcvt1WW3MtRFVx';

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
  <div class="container relative space-y-8">
    <h2 class="mx-auto max-w-[800px] text-3xl uppercase" use:appear={{ delay: 0 }}>{m.register_title()}</h2>
    <p class="mx-auto max-w-[600px]" use:appear={{ delay: 100 }}>{m.register_description()}</p>

    <form
      class="relative h-20 space-y-2"
      method="POST"
      action="/api/register"
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
        class="h-10 w-full sm:w-auto"
        type="submit"
        variant={state === 'idle' ? 'secondary' : 'primary'}
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
