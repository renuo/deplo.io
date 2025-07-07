<script lang="ts">
  import { appear } from '$lib';
  import MountainSvg from './MountainSvg.svelte';
  import callMadeIcon from '$lib/assets/icons/call_made.svg';
  import * as m from '$lib/paraglide/messages';

  export let labels: string[] = [];
</script>

<div class="bg-background">
  <div class="container relative !py-0 lg:py-4 lg:absolute lg:left-1/2 lg:-translate-x-1/2 text-left">
    <h2 class="text-h2 max-w-[800px]" use:appear={{ delay: 0 }}>{m.complex_projects()}</h2>
    <p class="max-w-[620px] pt-8 pb-2" use:appear={{ delay: 100 }}>{m.complex_projects_description()}</p>
    <div class="flex justify-start">
      <a href={m.nine_url()} target="_blank" class="btn btn-primary text-p flex items-center font-medium">
        {m.nine()}
        <img src={callMadeIcon} class="ml-2 h-5 w-5" alt="External link" />
      </a>
    </div>
  </div>

  <div class="relative w-full overflow-hidden pt-20">
    <MountainSvg />

    {#if labels.length > 0}
      <div class="pointer-events-none">
        {#each labels as label, index}
          <div
            class="text-p absolute text-deploio lg:text-2xl label-{index + 1}"
            use:appear={{ delay: 200 + index * 100 }}
          >
            {label}
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .label-1 {
    top: 70%;
    left: 14%;
    transform: translateX(-50%);
  }

  .label-2 {
    top: 50%;
    left: 35%;
    transform: translateX(-50%);
  }

  .label-3 {
    top: 40%;
    left: 52%;
    transform: translateX(-50%);
  }

  .label-4 {
    top: 5%;
    left: 83%;
    transform: translateX(-50%);
  }
</style>
