<script lang="ts">
  import { page } from '$app/stores';
  import mountainVector from '$lib/assets/backgrounds/mountain_vector.svg';
</script>

<div class="bg-background">
  <img class="w-full pt-[320px]" src={mountainVector} alt="mountain vector background" />
</div>

<main class="-mt-[5vw] bg-mountain py-32 text-deploio">
  <div class="relative z-10 flex w-screen flex-col items-center justify-center">
    <h1 class="text-9xl font-semibold">{$page.status}</h1>
    <p class="text-4xl uppercase">{$page.error?.message}</p>
  </div>
</main>
