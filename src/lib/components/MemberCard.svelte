<script lang="ts">
  export let name: string;
  export let role: string;
  export let image: string;

  import img1 from '$lib/assets/backgrounds/team_mountain_vector_1.svg';
  import img2 from '$lib/assets/backgrounds/team_mountain_vector_2.svg';
  import img3 from '$lib/assets/backgrounds/team_mountain_vector_3.svg';

  const images = [img1, img2, img3];
  const imageSrc = images[Math.floor(Math.random() * images.length)];
</script>

<div
  class="flex h-[305px] w-[281.75px] flex-col items-stretch border-t-2 border-deploio bg-background shadow-md duration-300 hover:-translate-y-2 hover:shadow-xl"
>
  <div class="flex h-[93px] w-full flex-col items-start justify-start ps-6 pt-5">
    <div class="text-h5 text-deploio">{name}</div>
    <div class="text-p mt-3 text-deploio">{role}</div>
  </div>
  <div class="relative flex w-full flex-1 items-end justify-center overflow-hidden">
    <img src={image} alt={name} class="z-10 h-[200px] object-cover" />
    <img src={imageSrc} alt="mountain vector" class="absolute z-0 w-full" />
  </div>
</div>
