<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAnchorAttributes } from 'svelte/elements';
  import { twMerge } from 'tailwind-merge';
  import { page } from '$app/stores';

  interface LinkProps extends HTMLAnchorAttributes {
    children: Snippet;
  }

  let { children, class: className, href, ...rest }: LinkProps = $props();

  const isCurrentPage = $derived.by(() => {
    const remote = new URL(href!, $page.url.origin);
    return remote.origin === $page.url.origin && remote.pathname === $page.url.pathname;
  });
</script>

<a {...rest} {href} class={twMerge('group relative inline-block truncate text-white', className)}>
  {@render children()}
  <span
    class="absolute bottom-0 left-0 h-0.5 w-0 bg-white text-[15px] transition-all group-hover:w-full"
    class:w-full={isCurrentPage}
  >
    &nbsp;
  </span>
</a>
