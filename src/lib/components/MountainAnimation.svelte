<script lang="ts">
  import { appear } from '$lib';
  import MountainSvg from './MountainSvg.svelte';
  import callMadeIcon from '$lib/assets/icons/call_made.svg';
  import * as m from '$lib/paraglide/messages';
  import './MountainAnimation.css';

  export let labels: string[] = [];
</script>

<div class="bg-background">
  <div class="container relative z-10 space-y-8 text-left">
    <h2 class="text-h2 max-w-[800px]" use:appear={{ delay: 0 }}>{m.complex_projects()}</h2>
    <p class="max-w-[620px] text-p" use:appear={{ delay: 100 }}>{m.complex_projects_description()}</p>

    <div class="flex justify-start">
      <a href={m.nine_url()} target="_blank" class="btn btn-primary flex items-center text-p font-medium">
        {m.nine()}
        <img src={callMadeIcon} class="w-5 h-5 ml-2" alt="External link" />
      </a>
    </div>
  </div>

  <div class="relative pt-20 w-full overflow-hidden">
    <MountainSvg />

    {#if labels.length > 0}
      <div class="pointer-events-none absolute left-0 top-0 h-full w-full">
        {#each labels as label, index}
          <div class="text-p lg:text-2xl absolute text-deploio label-{index + 1}" use:appear={{ delay: 200 + index * 100 }}>
            {label}
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
