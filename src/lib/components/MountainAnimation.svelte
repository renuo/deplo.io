<script lang="ts">
  import { appear } from '$lib';
  import mountainAnimation1 from '$lib/assets/animations/mountain_animation_1.svg';
  import mountainAnimation2 from '$lib/assets/animations/mountain_animation_2.svg';

  export let labels: string[] = [];
</script>

<div class="relative mountain-container bg-background">
  <img
    class="pointer-events-none -mb-px w-full select-none mountain-anim mountain-1"
    src={mountainAnimation2}
    alt="mountain animation 2"
  />
  
  <img
    class="pointer-events-none absolute top-0 left-0 w-full select-none mountain-anim mountain-2"
    src={mountainAnimation1}
    alt="mountain animation 1"
  />


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
  
  .mountain-1 {
    animation: mountain-fade-1 4s infinite ease-in;
  }
  
  .mountain-2 {
    animation: mountain-fade-2 4s infinite ease-in;
  }
  
  @keyframes mountain-fade-1 {
    0% {
      opacity: 1;
    }
    25% {
      opacity: 0.75;
    }
    50% {
      opacity: 0.5;
    }
    75% {
      opacity: 0.25;
    }
    100% {
      opacity: 0;
    }
  }
  
  @keyframes mountain-fade-2 {
    0% {
      opacity: 0;
    }
    25% {
      opacity: 0.25;
    }
    50% {
      opacity: 0.5;
    }
    75% {
      opacity: 0.75;
    }
    100% {
      opacity: 1;
    }
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