<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import SupportedFrameworks from '$lib/components/SupportedFrameworks.svelte';
</script>

<main>
  <section title="hero" class="container">
    <Button variant="primary">Hello World!</Button>
    <Button variant="secondary">Hello World!</Button>
    <Button variant="outline">Hello World!</Button>
  </section>

  <section title="features">
    <SupportedFrameworks />
  </section>

  <section title="notes" class="container">mountain</section>
  <section title="comparison" class="container">table</section>
  <section title="register" class="container">register</section>
</main>
