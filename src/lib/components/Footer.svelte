<script lang="ts">
  import * as m from '$lib/paraglide/messages';
  import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
  import Button from '$lib/components/Button.svelte';
  import Background from '$lib/components/Background.svelte';
  import FooterNavigation from '$lib/components/FooterNavigation.svelte';
  import FooterSocials from '$lib/components/FooterSocials.svelte';
  import mountainTwo from '$lib/assets/backgrounds/mountain_2.jpg';
  import FooterCertificates from '$lib/components/FooterCertificates.svelte';
</script>

<Background image={mountainTwo} class="md:-mt-32" gradient-class="bg-gradient-to-t from-deploio via-transparent from-10% via-80% to-mountain">
  <footer class="pt-[500px] md:pt-[40vw] text-white">
    <FooterCertificates />

    <div class="container flex justify-between md:hidden">
      <Button variant="primary">{m.navigation_start()}</Button>
      <LanguageSwitcher />
    </div>

    <FooterNavigation />
    <FooterSocials />
  </footer>
</Background>
