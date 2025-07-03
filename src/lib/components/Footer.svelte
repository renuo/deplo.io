<script lang="ts">
  import * as m from '$lib/paraglide/messages';
  import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
  import Button from '$lib/components/Button.svelte';
  import Background from '$lib/components/Background.svelte';
  import FooterNavigation from '$lib/components/FooterNavigation.svelte';
  import FooterSocials from '$lib/components/FooterSocials.svelte';
  import mountainTwo from '$lib/assets/backgrounds/mountain_2.webp';
  import FooterCertificates from '$lib/components/FooterCertificates.svelte';

  export let isTeamPage: boolean = false;

  $: bgClass = isTeamPage ? 'bg-background' : 'bg-mountain';
</script>

<Background
  image={mountainTwo}
  class="-mt-px {bgClass} pt-16 max-h-[950px] md:max-h-none"
  gradient-class="bg-gradient-to-t from-deploio to-transparent"
>
  <footer class="pt-[500px] text-white md:pt-[40vw]">
    <FooterCertificates />

    <div class="container flex justify-between md:hidden">
      <Button variant="primary">{m.navigation_start()}</Button>
      <LanguageSwitcher />
    </div>

    <FooterNavigation />
    <FooterSocials />
  </footer>
</Background>
