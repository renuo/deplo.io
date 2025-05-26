<script lang="ts">
  export let name: string;
  export let role: string;
  export let image: string;
</script>

<div
  class="flex h-[305px] w-[281.75px] flex-col items-stretch border-t-2 border-deploio bg-background shadow-md transition-transform duration-200 ease-in-out hover:-translate-y-2 hover:shadow-xl"
>
  <div class="flex h-[93px] w-full flex-col items-start justify-start ps-6 pt-5">
    <div class="text-h5 text-deploio">{name}</div>
    <div class="text-p mt-1 text-deploio">{role}</div>
  </div>
  <div class="relative flex w-full flex-1 items-end justify-center overflow-hidden">
    <img src={image} alt={name} class=" z-10 h-[200px] object-cover" />
    <img src="/src/lib/assets/backgrounds/mountain_vector.svg" alt="mountain vector" class="absolute z-0 w-full" />
  </div>
</div>
