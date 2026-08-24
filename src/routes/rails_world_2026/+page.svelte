<script lang="ts">
  import Background from '$lib/components/Background.svelte';
  import Button from '$lib/components/Button.svelte';
  import mountainBackground from '$lib/assets/backgrounds/mountain_1.webp';

  // Fill in the real embed URL once the video is ready; leave null for the placeholder slot.
  const videoEmbedUrl: string | null = null;
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
  <div class="container relative flex h-full flex-col justify-center pb-12 text-center text-white sm:pb-16">
    <div class="mx-auto w-full max-w-3xl space-y-6">
      <div class="space-y-3">
        <h1 class="text-2xl font-medium leading-tight sm:text-3xl md:text-4xl">Sorry... you did not win this time.</h1>
        <p class="text-base text-white/90 sm:text-lg">But here is a video of our CEO.</p>
      </div>

      <div class="relative aspect-video w-full overflow-hidden rounded-lg bg-black/40">
        {#if videoEmbedUrl}
          <iframe
            src={videoEmbedUrl}
            title="Deploio CEO video"
            class="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        {:else}
          <div
            class="absolute inset-0 flex items-center justify-center border-2 border-dashed border-white/30 text-sm text-white/60"
          >
            Video coming soon
          </div>
        {/if}
      </div>

      <div>
        <Button variant="primary" href="/">To Deploio</Button>
      </div>
    </div>
  </div>
</Background>
