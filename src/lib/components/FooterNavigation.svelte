<script lang="ts">
  import Link from '$lib/components/Link.svelte';
  import * as m from '$lib/paraglide/messages';
  import nineLogo from '$lib/assets/logos/nine_logo.png';
  import renuoLogo from '$lib/assets/logos/renuo_logo.png';

  interface NavigationColumn {
    title: string;
    links: { href?: string; text: string }[];
  }

  const columns: NavigationColumn[] = [
    {
      title: m.footer_support(),
      links: [
        {
          href: 'https://status.nine.ch/',
          text: m.footer_status(),
        },
        {
          href: 'https://docs.nine.ch/docs/category/deploio-paas/',
          text: m.footer_documentation(),
        },
        {
          href: 'https://join.slack.com/t/deploiocommunity/shared_invite/zt-20tb3k93m-O4NEUs0RjZYGQNQoih8zkA',
          text: m.footer_slack(),
        },
        {
          href: 'https://github.com/ninech/deploio-examples',
          text: m.footer_github(),
        },
        {
          href: '/pricing',
          text: m.footer_pricing(),
        },
      ],
    },
    {
      title: m.footer_contact(),
      links: [
        { text: m.footer_address() },
        { href: `mailto:${m.footer_email()}`, text: m.footer_email() },
        { href: `tel:${m.footer_phone().replace(/\s/g, '')}`, text: m.footer_phone() },
      ],
    },
  ];
</script>

<div class="container flex flex-col gap-20 !py-8 md:flex-row">
  {#each columns as { title, links }}
    <nav class="flex flex-col gap-4">
      <h3 class="text-base font-semibold uppercase">{title}</h3>

      {#each links as link}
        {#if link.href}
          <Link class="max-w-fit" href={link.href} target="_blank">{link.text}</Link>
        {:else}
          <p class="max-w-fit whitespace-pre">{link.text}</p>
        {/if}
      {/each}
    </nav>
  {/each}

  <nav class="flex flex-col gap-4 text-sm md:ml-auto">
    <h3 class="text-base font-medium uppercase">{m.footer_service()}</h3>
    <div class="flex flex-wrap gap-8 lg:gap-16">
      <a href="https://www.nine.ch" target="_blank">
        <img class="h-10 lg:h-14" src={nineLogo} alt="nine logo" />
      </a>
      <a href="https://www.renuo.ch" target="_blank">
        <img class="h-10 lg:h-14" src={renuoLogo} alt="renuo logo" />
      </a>
    </div>
  </nav>
</div>
