<script lang="ts">
  import Background from '$lib/components/Background.svelte';
  import Button from '$lib/components/Button.svelte';
  import mountainBackground from '$lib/assets/backgrounds/mountain_1.webp';

  const videoSrc = '/videos/rails-world-2026-ceo.mp4';
</script>

<svelte:head>
  <title>Rails World 2026 – Deploio</title>
  <meta name="description" content="Thanks for scratching your card at Rails World 2026." />
  <meta name="robots" content="noindex" />
</svelte:head>

<Background
  image={mountainBackground}
  class="h-[100svh]"
  gradient-class="bg-gradient-to-t from-deploio to-hero/40"
  wrapper-class="h-full"
>
  <div class="container relative flex h-full flex-col items-center pb-12 text-center text-white sm:pb-16">
    <div class="mx-auto w-full max-w-3xl space-y-3 pt-10">
      <h1 class="text-2xl font-medium leading-tight sm:text-3xl md:text-4xl">Sorry... you did not win this time.</h1>
      <p class="text-base text-white/90 sm:text-lg">But here is a video of our CEO.</p>
    </div>

    <div class="flex min-h-0 w-full flex-1 items-center justify-center py-8">
      <video
        src={videoSrc}
        controls
        playsinline
        autoplay
        class="h-full max-h-[55vh] max-w-full rounded-lg object-contain"
      >
        <track kind="captions" />
      </video>
    </div>

    <div>
      <Button variant="primary" href='/en'>To Deploio</Button>
    </div>
  </div>
</Background>
