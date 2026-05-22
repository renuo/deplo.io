<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { twMerge } from 'tailwind-merge';
  import { appear } from '$lib';

  interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
    speed?: number;
    children: Snippet;
  }

  let { speed = 0.1, children, class: className, ...rest }: CarouselProps = $props();

  let scrolling = $state(false);
  let scrollable: HTMLDivElement | null = $state(null);
  let animationFrame = 0;
  let lastTime = 0;
  let scrollLeft = 0;

  let containerWidth = $state(0);
  let contentWidth = $state(0);
  let shouldAnimate = $derived(contentWidth > containerWidth);

  function animate(time: number) {
    if (!lastTime) lastTime = time;
    const deltaTime = time - lastTime;
    lastTime = time;

    if (!scrolling && scrollable && shouldAnimate) {
      const distance = speed * deltaTime;
      scrollLeft += distance;

      if (scrollLeft >= contentWidth) {
        scrollLeft -= contentWidth;
      } else if (scrollLeft < 0) {
        scrollLeft += contentWidth;
      }

      scrollable.scrollLeft = scrollLeft;
    }

    animationFrame = requestAnimationFrame(animate);
  }

  function onscroll() {
    if (!scrollable || !shouldAnimate) return;
    scrolling = true;

    if (scrollable.scrollLeft >= contentWidth) {
      scrollable.scrollLeft -= contentWidth;
    } else if (scrollable.scrollLeft <= 0 && speed < 0) {
      scrollable.scrollLeft += contentWidth;
    }

    scrollLeft = scrollable.scrollLeft;
  }

  function onscrollend() {
    scrolling = false;
  }

  $effect(() => {
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  });

  $effect(() => {
    if (!shouldAnimate && scrollable) {
      scrollable.scrollLeft = 0;
      scrollLeft = 0;
    }
  });
</script>

<div
  {...rest}
  bind:this={scrollable}
  bind:clientWidth={containerWidth}
  class={twMerge('no-scrollbar flex overflow-x-scroll', className)}
  {onscroll}
  {onscrollend}
  use:appear={{ delay: 0 }}
>
  <div bind:clientWidth={contentWidth} class="min-w-full flex-shrink-0">
    {@render children()}
  </div>
  {#if shouldAnimate}
    <div class="min-w-full flex-shrink-0" aria-hidden="true">
      {@render children()}
    </div>
  {/if}
</div>
