<script lang="ts">
  import * as m from '$lib/paraglide/messages';
  import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
  import Button from '$lib/components/Button.svelte';
  import Background from '$lib/components/Background.svelte';
  import FooterNavigation from '$lib/components/FooterNavigation.svelte';
  import FooterSocials from '$lib/components/FooterSocials.svelte';
  import mountainTwo from '$lib/assets/backgrounds/mountain_2.png';
  import FooterCertificates from '$lib/components/FooterCertificates.svelte';
</script>

<Background
  image={mountainTwo}
  class="bg-mountain pt-16 -mt-px"
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
