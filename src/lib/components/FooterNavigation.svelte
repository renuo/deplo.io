<script lang="ts">
  import Link from '$lib/components/Link.svelte';

  interface FooterNavigationProps {
    title: string;
    links: {
      href: string;
      text: string;
    }[];
  }

  let { title, links }: FooterNavigationProps = $props();
</script>

<nav class="flex flex-col">
  <h3 class="uppercase">{title}</h3>
  {#each links as link}
    <Link href={link.href}>{link.text}</Link>
  {/each}
</nav>
