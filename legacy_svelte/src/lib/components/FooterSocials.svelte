<script>
  import Link from '$lib/components/Link.svelte';
  import * as m from '$lib/paraglide/messages';
  import swissMadeSoftwareAndHosting from '$lib/assets/swiss_made_software_and_hosting.webp';
  import facebookIcon from '$lib/assets/icons/facebook.svg';
  import instagramIcon from '$lib/assets/icons/instagram.svg';
  import linkedinIcon from '$lib/assets/icons/linkedin.svg';
  import redditIcon from '$lib/assets/icons/reddit.svg';
  import xIcon from '$lib/assets/icons/x.svg';

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

<nav class="container !mt-14 flex flex-wrap items-center gap-4 !pb-8">
  <a class="flex-grow basis-full md:basis-auto" href="https://www.swissmadesoftware.org/home.html">
    <img class="h-12" src={swissMadeSoftwareAndHosting} width="240" height="48" alt="swiss made software + hosting" />
  </a>

  {#each socials as social}
    <a href={social.href} target="_blank" class="p-2.5">
      <img class="size-5" src={social.icon} alt={social.alt} />
    </a>
  {/each}
</nav>

<div class="container !my-0 !py-0">
  <hr class="border-t" />
</div>

<nav class="container flex flex-wrap gap-8 !pt-8 text-sm">
  <p class="flex-grow">{m.footer_copyright({ year: new Date().getFullYear() })}</p>
  <Link href="https://docs.nine.ch/de/docs/legal-documents/general-terms-and-conditions">{m.footer_terms()}</Link>
  <Link href="https://www.nine.ch/de/privacy-policy">{m.footer_privacy()}</Link>
</nav>
