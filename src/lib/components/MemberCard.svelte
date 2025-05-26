<script lang="ts">
  export let name: string;
  export let role: string;
  export let image: string;
</script>

<div class="shadow-md flex flex-col items-stretch w-[281.75px] h-[305px] border-t-2 border-deploio transition-transform duration-200 ease-in-out hover:-translate-y-2 hover:shadow-xl bg-background">
  <div class="w-full h-[93px] flex flex-col justify-start items-start ps-6 pt-5">
    <div class="text-h5 text-deploio">{name}</div>
    <div class="text-p text-deploio mt-1">{role}</div>
  </div>
  <div class="flex-1 w-full flex items-end justify-center overflow-hidden relative">
    <img src={image} alt={name} class=" h-[200px] object-cover z-10" />
    <img src="/src/lib/assets/backgrounds/mountain_vector.svg" alt="mountain vector" class="absolute w-full z-0" />
  </div>
</div> 