<script lang="ts">
  import * as m from '$lib/paraglide/messages';
  import Link from '$lib/components/Link.svelte';
  import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';

  import mountainTwo from '$lib/assets/backgrounds/mountain_2.jpg';
  import renuoLogo from '$lib/assets/logos/renuo_logo.png';
  import nineLogo from '$lib/assets/logos/nine_logo.png';
  import facebookIcon from '$lib/assets/icons/facebook.svg';
  import instagramIcon from '$lib/assets/icons/instagram.svg';
  import linkedinIcon from '$lib/assets/icons/linkedin.svg';
  import redditIcon from '$lib/assets/icons/reddit.svg';
  import xIcon from '$lib/assets/icons/x.svg';

  import swissMadeSoftwareAndHosting from '$lib/assets/swiss_made_software_and_hosting.png';
  import iso9001Icon from '$lib/assets/icons/iso_9001:2015_certification.png';
  import iso27001Icon from '$lib/assets/icons/iso_27001:2013_certification.png';
  import co2NeutralIcon from '$lib/assets/icons/co2_neutral_certification.png';
  import Button from '$lib/components/Button.svelte';

  interface NavigationColumn {
    title: string;
    links: { href: string; text: string }[];
  }

  const supportColumn: NavigationColumn = {
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
  };

  const contactColumn: NavigationColumn = {
    title: m.footer_contact(),
    links: [
      { href: 'https://g.co/kgs/ArwtnDv', text: m.footer_address() },
      { href: `mailto:${m.footer_email()}`, text: m.footer_email() },
      { href: `tel:${m.footer_phone().replace(/\s/g, '')}`, text: m.footer_phone() },
    ],
  };

  const socials = [
    {
      icon: facebookIcon,
      href: 'https://www.facebook.com/deploioch/',
      alt: 'Deploio Facebook account',
    },
    {
      icon: instagramIcon,
      href: 'https://www.instagram.com/deploio/',
      alt: 'Deploio Instagram account',
    },
    {
      icon: linkedinIcon,
      href: 'https://linkedin.com/company/deploio',
      alt: 'Deploio LinkedIn account',
    },
    {
      icon: redditIcon,
      href: 'https://www.reddit.com/user/deploio',
      alt: 'Deploio Reddit account',
    },
    {
      icon: xIcon,
      href: 'https://www.twitter.com/deplo_io',
      alt: 'Deploio Twitter account',
    },
  ];
</script>

{#snippet navigationColumn({ title, links }: NavigationColumn)}
  <nav class="flex flex-col gap-4 md:text-sm">
    <h3 class="text-base font-medium uppercase">{title}</h3>

    {#each links as link}
      <Link class="max-w-fit whitespace-pre" href={link.href}>{link.text}</Link>
    {/each}
  </nav>
{/snippet}

<footer
  class="space-y-20 text-white"
  style:background="linear-gradient(transparent, #141D50), url({mountainTwo}) center top / cover no-repeat"
>
  <div class="container">
    <div class="flex w-fit flex-wrap justify-center gap-8">
      <img class="h-20" src={iso9001Icon} alt="ISO 9001:2015 certification" />
      <img class="h-20" src={iso27001Icon} alt="ISO 27001:2013 certification" />
      <img class="h-20" src={co2NeutralIcon} alt="CO2 neutral certification" />
    </div>
  </div>

  <div class="container flex justify-between md:hidden">
    <Button variant="primary">{m.navigation_start()}</Button>
    <LanguageSwitcher />
  </div>

  <div class="container flex flex-col gap-20 md:flex-row">
    {@render navigationColumn(supportColumn)}
    {@render navigationColumn(contactColumn)}

    <nav class="flex flex-col gap-4 text-sm md:ml-auto">
      <h3 class="text-base font-medium uppercase">{m.footer_service()}</h3>
      <div class="flex flex-wrap gap-8">
        <a href="https://www.nine.ch">
          <img class="h-12" src={nineLogo} alt="nine logo" />
        </a>
        <a href="https://www.renuo.ch">
          <img class="h-12" src={renuoLogo} alt="renuo logo" />
        </a>
      </div>
    </nav>
  </div>

  <nav class="container flex flex-wrap items-center gap-8">
    <a class="flex-grow basis-full md:basis-auto" href="https://www.swissmadesoftware.org/home.html">
      <img class="h-12" src={swissMadeSoftwareAndHosting} alt="swiss made software + hosting" />
    </a>

    {#each socials as social}
      <a href={social.href}>
        <img class="size-5" src={social.icon} alt={social.alt} />
      </a>
    {/each}
  </nav>

  <nav
    class="container !mt-8 flex flex-wrap gap-8 border-t-2 border-white py-4 text-sm font-medium opacity-20 transition-opacity hover:opacity-100"
  >
    <p class="flex-grow">{m.footer_copyright({ year: new Date().getFullYear() })}</p>
    <Link href="https://docs.nine.ch/de/docs/legal-documents/general-terms-and-conditions">{m.footer_terms()}</Link>
    <Link href="https://www.nine.ch/de/privacy-policy">{m.footer_privacy()}</Link>
  </nav>
</footer>
