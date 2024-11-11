<script lang="ts">
  import type { Snippet } from 'svelte';
  import { twMerge } from 'tailwind-merge';

  interface BackgroundProps {
    'background-class'?: string;
    'wrapper-class'?: string;
    'gradient-class'?: string;
    class?: string;
    image?: string;
    video?: string;
    children: Snippet;
  }

  let {
    'background-class': backgroundClass,
    'wrapper-class': wrapperClass,
    'gradient-class': gradientClass,
    class: className,
    image,
    video,
    children,
  }: BackgroundProps = $props();
</script>

<div class={twMerge('relative', className)}>
  <div class={twMerge("absolute w-full h-full", backgroundClass)}>
    {#if image}
      <img
        aria-hidden="true"
        class='absolute h-full min-w-full object-cover object-top'
        src={image}
        alt=""
      />
    {:else if video}
      <video
        aria-hidden="true"
        class='absolute h-full min-w-full object-cover object-top'
        autoplay
        muted
        loop
      >
        <source src={video} type="video/mp4" />
      </video>
    {/if}

    <div class={twMerge("relative w-full h-full", gradientClass)}>&nbsp;</div>
  </div>

  <div class={twMerge('relative', wrapperClass)}>
    {@render children()}
  </div>
</div>
