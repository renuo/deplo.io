<script lang="ts">
  import { appear } from '$lib';
  import MountainSvg from './MountainSvg.svelte';
  import callMadeIcon from '$lib/assets/icons/call_made.svg';
  import * as m from '$lib/paraglide/messages';

  export let labels: string[] = [];
</script>

<div class="bg-background">
  <div class="container relative z-10 !py-0 text-left lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:py-4">
    <h2 class="text-h2 max-w-[800px]" use:appear={{ delay: 0 }}>{m.complex_projects()}</h2>
    <p class="max-w-[620px] pb-2 pt-8" use:appear={{ delay: 100 }}>{m.complex_projects_description()}</p>
    <div class="flex justify-start">
      <a href={m.nine_url()} target="_blank" class="btn btn-primary text-p flex items-center font-medium">
        {m.nine()}
        <img src={callMadeIcon} class="ml-2 h-5 w-5" alt="External link" />
      </a>
    </div>
  </div>

  <div class="relative w-full overflow-hidden">
    <MountainSvg {labels} />
  </div>
</div>
