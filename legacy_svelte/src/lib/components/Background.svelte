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
  <div class={twMerge('pointer-events-none absolute h-full w-full select-none', backgroundClass)}>
    {#if image}
      <img
        aria-hidden="true"
        loading="lazy"
        class="absolute h-full min-w-full object-cover object-top"
        src={image}
        alt=""
      />
    {:else if video}
      <video
        aria-hidden="true"
        class="pointer-events-none absolute h-full min-w-full object-cover object-top"
        autoplay
        muted
        loop
        playsinline
      >
        <source src={video} type="video/mp4" />
      </video>
    {/if}

    <div class={twMerge('relative h-full w-full', gradientClass)}>&nbsp;</div>
  </div>

  <div class={twMerge('relative', wrapperClass)}>
    {@render children()}
  </div>
</div>
