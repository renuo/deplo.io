<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { twMerge } from 'tailwind-merge';

  interface ButtonProps extends HTMLButtonAttributes {
    href?: string;
    variant: 'primary' | 'secondary' | 'outline';
    children: Snippet;
  }

  let { href, variant, children, class: className, ...rest }: ButtonProps = $props();

  const variants = {
    primary: 'bg-white border-2 border-white text-deploio',
    secondary: 'bg-deploio border-2 border-deploio text-white',
    outline: 'bg-transparent border-2 border-white text-white',
  };

  const mergedClasses = $derived(
    twMerge(
      variants[variant],
      'text-center truncate p-1.5 px-4 text-[15px] font-medium uppercase transition-opacity hover:opacity-70 max-md:text-sm',
      className,
    ),
  );
</script>

{#if href}
  <a {href} class={mergedClasses}>
    {@render children()}
  </a>
{:else}
  <button {...rest} class={mergedClasses}>
    {@render children()}
  </button>
{/if}
