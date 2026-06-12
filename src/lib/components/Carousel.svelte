<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { twMerge } from 'tailwind-merge';

  interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
    speed?: number;
    children: Snippet;
  }

  let { speed = 0.1, children, class: className, ...rest }: CarouselProps = $props();

  let scrolling = $state(false);
  let scrollable: HTMLDivElement | null = $state(null);
  let animationFrame = 0;
  let lastTime = 0;
  let direction = 1;
  let scrollLeft = 0;

  function animate(time: number) {
    if (!lastTime) lastTime = time;
    const deltaTime = time - lastTime;
    lastTime = time;

    const distance = speed * deltaTime;
    const hasReachedEnd = scrollable!.scrollLeft + distance >= scrollable!.scrollWidth - scrollable!.clientWidth;
    const hasReachedStart = scrollable!.scrollLeft - distance <= 0;

    if (!scrolling) {
      scrollLeft += distance * direction;
      scrollable!.scrollLeft = scrollLeft;
    }

    if ((direction === 1 && hasReachedEnd) || (direction === -1 && hasReachedStart)) {
      direction = -direction;
    }

    animationFrame = requestAnimationFrame(animate);
  }

  function onscroll() {
    scrolling = true;
    scrollLeft = scrollable?.scrollLeft ?? 0;
  }

  function onscrollend() {
    scrolling = false;
  }

  $effect(() => {
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  });
</script>

<div
  {...rest}
  bind:this={scrollable}
  class={twMerge('no-scrollbar overflow-x-scroll', className)}
  {onscroll}
  {onscrollend}
>
  {@render children()}
</div>
