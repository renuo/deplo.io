<script lang="ts">
  import { appear } from '$lib';
  import MountainSvg from './MountainSvg.svelte';
  import callMadeIcon from '$lib/assets/icons/call_made.svg';
  import * as m from '$lib/paraglide/messages';

  export let labels: string[] = [];
</script>

<div class="bg-background">
  <div class="container relative !py-0 text-left lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:py-4 z-10">
    <h2 class="text-h2 max-w-[800px]" use:appear={{ delay: 0 }}>{m.complex_projects()}</h2>
    <p class="max-w-[620px] pb-2 pt-8" use:appear={{ delay: 100 }}>{m.complex_projects_description()}</p>
    <div class="flex justify-start">
      <a href={m.nine_url()} target="_blank" class="btn btn-primary text-p flex items-center font-medium">
        {m.nine()}
        <img src={callMadeIcon} class="ml-2 h-5 w-5" alt="External link" />
      </a>
    </div>
  </div>

  <div class="relative w-full overflow-hidden pt-20">
    <MountainSvg />

    {#if labels.length > 0}
      <div class="pointer-events-none">
        {#each labels as label, index}
          <div
            class="text-p absolute text-deploio lg:text-2xl label-{index + 1}"
            use:appear={{ delay: 200 + index * 100 }}
          >
            {label}
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .label-1 {
    top: 75%;
    left: 7%;

    @media (min-width: 580px) {
      top: 74%;
      left: 10%;
    }

    @media (min-width: 768px) {
      top: 73%;
      left: 11%;
    }

    @media (min-width: 1024px) {
      top: 70%;
      left: 11%;
    }

    @media (min-width: 1400px) {
      top: 71%;
      left: 12%;
    }
  }

  .label-2 {
    top: 60%;
    left: 15%;

    @media (min-width: 580px) {
      top: 57%;
      left: 25%;
    }

    @media (min-width: 768px) {
      top: 54%;
      left: 28%;
    }

    @media (min-width: 1024px) {
      top: 51%;
      left: 28%;
    }

    @media (min-width: 1400px) {
      top: 51%;
      left: 29%;
    }
  }

  .label-3 {
    top: 53%;
    left: 40%;

    @media (min-width: 580px) {
      top: 49%;
      left: 45%;
    }

    @media (min-width: 768px) {
      top: 46%;
      left: 47%;
    }

    @media (min-width: 1024px) {
      top: 42%;
      left: 47%;
    }

    @media (min-width: 1400px) {
      top: 41%;
      left: 48%;
    }
  }

  .label-4 {
    top: 19%;
    left: 65%;

    @media (min-width: 580px) {
      top: 18%;
      left: 73%;
    }

    @media (min-width: 768px) {
      top: 11%;
      left: 75%;
    }

    @media (min-width: 1024px) {
      top: 6%;
      left: 74%;
    }

    @media (min-width: 1400px) {
      top: 5%;
      left: 76%;
    }
  }
</style>
