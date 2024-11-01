<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { twMerge } from 'tailwind-merge';

  interface ButtonProps extends HTMLButtonAttributes {
    variant: 'primary' | 'secondary' | 'outline';
    children: Snippet;
  }

  let { variant, children, class: className, ...rest }: ButtonProps = $props();

  const variants = {
    primary: 'bg-white text-deploio',
    secondary: 'bg-deploio text-white',
    outline: 'bg-transparent border-2 border-white text-white',
  };
</script>

<button
  {...rest}
  class={twMerge(
    variants[variant],
    'truncate p-1.5 px-4 uppercase transition-opacity hover:opacity-70 max-md:text-sm',
    className,
  )}
>
  {@render children()}
</button>
