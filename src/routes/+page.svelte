<script lang="ts">
  import HeroSection from '$lib/components/HeroSection.svelte';
  import SupportedFrameworks from '$lib/components/SupportedFrameworks.svelte';
</script>

<main>
  <HeroSection />

  <section title="features">
    <SupportedFrameworks />
  </section>

  <section title="notes" class="container">mountain</section>
  <section title="comparison" class="container">table</section>
  <section title="register" class="container">register</section>
</main>
