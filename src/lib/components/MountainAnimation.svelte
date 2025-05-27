<script lang="ts">
  import { appear } from '$lib';
  import MountainSvg from './MountainSvg.svelte';
  import * as m from '$lib/paraglide/messages';

  export let labels: string[] = [];
</script>

<div class="bg-background">
  <div class="container relative z-10 space-y-8 text-left">
    <h2 class="text-h2 max-w-[800px]" use:appear={{ delay: 0 }}>{m.complex_projects()}</h2>
    <p class="max-w-[620px] text-[20px]" use:appear={{ delay: 100 }}>{m.complex_projects_description()}</p>

    <div class="flex justify-start">
      <a href="/dashboard" class="btn btn-primary"> Deploio-Dashboard </a>
    </div>
  </div>

  <div class="relative mt-20 w-full md:-mt-16 lg:-mt-48">
    <MountainSvg />

    {#if labels.length > 0}
      <div class="pointer-events-none absolute left-0 top-0 h-full w-full">
        {#each labels as label, index}
          <div class="text-h3 absolute text-deploio label-{index + 1}" use:appear={{ delay: 200 + index * 100 }}>
            {label}
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .label-1 {
    top: 60%;
    left: 14%;
    transform: translateX(-50%);
  }

  .label-2 {
    top: 40%;
    left: 34%;
    transform: translateX(-50%);
  }

  .label-3 {
    top: 30%;
    left: 52%;
    transform: translateX(-50%);
  }

  .label-4 {
    top: -10%;
    left: 83%;
    transform: translateX(-50%);
  }
</style>
