<script lang="ts">
  import HeroSection from '$lib/sections/HeroSection.svelte';
  import CustomersSection from '$lib/sections/CustomersSection.svelte';
  import FeaturesSection from '$lib/sections/FeaturesSection.svelte';
  import NotesSection from '$lib/sections/NotesSection.svelte';
  import ComparisonSection from '$lib/sections/ComparisonSection.svelte';
  import ComplexProjectSection from '$lib/sections/ComplexProjectSection.svelte';
  import GoogleTag from '$lib/components/GoogleTag.svelte';
  import * as m from '$lib/paraglide/messages';
  import { languageTag } from '$lib/paraglide/runtime.js';
  import deploioLogoFull from '$lib/assets/deploio_logo_full.webp';
  import { page } from '$app/state';

  const logoUrl = `${page.url.origin}${deploioLogoFull}`;
  const currentLanguage = $derived(languageTag());
  const baseUrl = `https://deplo.io/${currentLanguage}`;
  const organizationId = `${baseUrl}/#organization`;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: 'Deploio',
        legalName: 'Nine Internet Solutions AG',
        url: baseUrl,
        logo: {
          '@type': 'ImageObject',
          url: logoUrl,
          width: 790,
          height: 760,
        },
        description: m.structured_data_organization_description(),
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Badenerstrasse 47',
          addressLocality: m.structured_data_address_locality(),
          postalCode: '8004',
          addressCountry: 'CH',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+41-44-637-40-40',
          email: 'info@nine.ch',
          contactType: 'customer service',
          availableLanguage: ['German', 'English'],
        },
        sameAs: [
          'https://www.facebook.com/deploioch/',
          'https://www.instagram.com/deploio/',
          'https://www.linkedin.com/company/deploio',
          'https://www.reddit.com/user/deploio',
          'https://twitter.com/deplo_io',
          'https://github.com/ninech/deploio-examples',
        ],
        parentOrganization: {
          '@type': 'Organization',
          name: 'Nine Internet Solutions AG',
          url: 'https://nine.ch',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: m.meta_title_home(),
        description: m.structured_data_website_description(),
        publisher: { '@id': organizationId },
        inLanguage: `${m.navigation_language()}`,
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://docs.deplo.io/search?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${baseUrl}/#software`,
        name: 'Deploio',
        applicationCategory: 'DeveloperApplication',
        applicationSubCategory: 'Platform as a Service (PaaS)',
        operatingSystem: 'Web',
        url: baseUrl,
        description: m.structured_data_software_description(),
        featureList: [
          'Git-based deployment',
          'Managed Databases',
          'Key-Value Store',
          'Swiss Object Storage',
          'Automatic TLS/SSL',
          'Automatic backups',
          'Node.js, Python, Django, Go, PHP, Ruby, Docker',
        ],
        offers: {
          '@type': 'Offer',
          url: `${baseUrl}/pricing`,
          priceCurrency: 'CHF',
          availability: 'https://schema.org/InStock',
          seller: { '@id': organizationId },
        },
        publisher: { '@id': organizationId },
        downloadUrl: `https://cockpit.nine.ch/signup?origin=deploio`,
      },
    ],
  };
</script>

<svelte:head>
  <title>{m.meta_title_home()}</title>
  <meta name="description" content={m.meta_description_home()} />
  <GoogleTag />
  {@html `<script type="application/ld+json">${JSON.stringify(schema)}</script>`}
</svelte:head>

<main class="relative z-0">
  <HeroSection />
  <CustomersSection />
  <FeaturesSection />
  <NotesSection />
  <ComparisonSection />
  <ComplexProjectSection />
</main>
