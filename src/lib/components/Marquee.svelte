<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { twMerge } from 'tailwind-merge';

  interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
    children: Snippet;
    gap?: number;
    speed?: number;
  }

  let { children, gap = 20, speed = 100, class: className, ...rest }: MarqueeProps = $props();

  let containerWidth = $state(0);
  let contentWidth = $state(0);
  let shouldScroll = $derived(contentWidth > containerWidth);
  let duration = $derived(speed > 0 ? contentWidth / speed : 0);
  let gapStyle = $derived(gap * 0.25 + 'rem');
</script>

{#snippet marqueeContent({ class: className, ...rest })}
  <div class={twMerge(`flex items-center gap-[var(--gap)]`, className)} {...rest}>
    {@render children()}
  </div>
{/snippet}

<div class={twMerge('overflow-x-hidden', className)} {...rest} bind:clientWidth={containerWidth} style:--gap={gapStyle}>
  <div class="invisible absolute -z-50 w-max pr-[var(--gap)]" aria-hidden="true" bind:clientWidth={contentWidth}>
    {@render marqueeContent()}
  </div>

  {#if shouldScroll}
    <div class="flex w-max" style:animation="marquee {duration}s linear infinite">
      {@render marqueeContent({ class: `flex-shrink-0 pr-[var(--gap)]` })}
      {@render marqueeContent({ class: `flex-shrink-0 pr-[var(--gap)]`, 'aria-hidden': true })}
    </div>
  {:else}
    {@render marqueeContent({ class: 'w-full justify-between' })}
  {/if}
</div>
