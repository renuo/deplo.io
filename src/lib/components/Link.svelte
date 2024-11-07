<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAnchorAttributes } from 'svelte/elements';
  import { twMerge } from 'tailwind-merge';

  interface LinkProps extends HTMLAnchorAttributes {
    children: Snippet;
  }

  let { children, class: className, ...rest }: LinkProps = $props();
</script>

<a {...rest} class={twMerge('group relative inline-block truncate text-white', className)}>
  {@render children()}
  <span class="absolute bottom-0 left-0 h-0.5 w-0 bg-white text-[15px] transition-all group-hover:w-full">&nbsp;</span>
</a>
