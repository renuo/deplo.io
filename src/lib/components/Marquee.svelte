<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { twMerge } from 'tailwind-merge';

  interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
    children: Snippet;
  }

  let { children, class: className, ...rest }: MarqueeProps = $props();
</script>

<div class={twMerge('overflow-x-hidden', className)} {...rest}>
  <div class="flex w-max animate-[marquee_30s_linear_infinite]">
    <div class="flex flex-shrink-0 items-center gap-20 pr-20">
      {@render children()}
    </div>
    <div class="flex flex-shrink-0 items-center gap-20 pr-20" aria-hidden="true">
      {@render children()}
    </div>
  </div>
</div>
