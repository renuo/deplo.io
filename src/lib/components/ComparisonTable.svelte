<script lang="ts">
  import { twMerge } from 'tailwind-merge';
  import checkDeploio from '$lib/assets/icons/check_deploio.svg';
  import crossDeploio from '$lib/assets/icons/cross_deploio.svg';
  import checkCompetitors from '$lib/assets/icons/check_competitors.svg';
  import crossCompetitors from '$lib/assets/icons/cross_competitors.svg';

  interface ComparisonTableProps {
    class?: string;
    titles: string[];
    images: string[];
    alts: string[];
    matrix: boolean[][];
  }

  let { titles, images, alts, matrix, class: className }: ComparisonTableProps = $props();
</script>

{#snippet logo(src: string, alt: string, highlighted: boolean)}
  <th class={twMerge('min-w-36 max-w-36 py-8', highlighted && 'rounded-t-2xl bg-deploio/5')}>
    <img {src} {alt} class="mx-auto h-8 w-24 object-contain" />
  </th>
{/snippet}

{#snippet row(title: string, cells: boolean[])}
  <tr class="border-t-[1px] border-deploio/10">
    <th class="sticky left-0 max-w-0 text-nowrap pb-12 text-left font-semibold text-deploio lg:max-w-none lg:p-4">
      <div class="pl-4 pt-1 lg:p-0">{title}</div>
    </th>
    {#each cells as cell, j}
      {@const isDeploio = j === 0}
      <td class={twMerge('pb-3 pt-10 text-center lg:pb-0 lg:pt-0', isDeploio && 'bg-deploio/5')}>
        {#if cell}
          <img class="inline-block" src={isDeploio ? checkDeploio : checkCompetitors} alt="yes" />
        {:else}
          <img class="inline-block" src={isDeploio ? crossDeploio : crossCompetitors} alt="no" />
        {/if}
      </td>
    {/each}
  </tr>
{/snippet}

<div class={twMerge('max-w-full overflow-x-auto whitespace-nowrap', className)}>
  <table class="w-full">
    <thead>
      <tr>
        <th></th>
        {#each images as image, i}
          {@render logo(image, alts[i], i === 0)}
        {/each}
      </tr>
    </thead>
    <tbody class="max-w-full">
      {#each titles as title, i}
        {@render row(title, matrix[i])}
      {/each}
      <tr class="border-t-[1px] border-deploio/10">
        <th></th>
        <!-- eslint-disable @typescript-eslint/no-unused-vars -->
        {#each titles as _, i}
          <td class={twMerge('h-8', i === 0 && 'rounded-b-2xl bg-deploio/5')}></td>
        {/each}
      </tr>
    </tbody>
  </table>
</div>
