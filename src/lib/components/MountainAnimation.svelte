<script lang="ts">
  import { appear } from '$lib';
  import MountainSvg from './MountainSvg.svelte';

  export let labels: string[] = [];
</script>

<div class="relative mountain-container bg-background">
  <MountainSvg />


  {#if labels.length > 0}
    <div class="absolute top-0 left-0 w-full h-full pointer-events-none">
      {#each labels as label, index}
        <div 
          class="absolute text-deploio text-h3 label-{index + 1}"
          use:appear={{ delay: 200 + index * 100 }}
        >
          {label}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .mountain-container {
    position: relative;
    width: 100%;
  }
  


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