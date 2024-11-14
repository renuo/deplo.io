<script lang="ts">
  import { twMerge } from 'tailwind-merge';

  interface ComparisonTableProps {
    titles: string[];
    images: string[];
    alts: string[];
    matrix: boolean[][];
  }

  let { titles, images, alts, matrix }: ComparisonTableProps = $props();
</script>

{#snippet check(highlighted: boolean)}
  <svg
    width="26"
    height="26"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    class="inline-block fill-deploio"
    class:bg-deploio={highlighted}
    class:rounded-full={highlighted}
    class:!fill-white={highlighted}
  >
    <path
      d="M13.8333 21.4719L8.73901 16.3772L10.211 14.8939L13.8333 18.5162L22.789 9.56055L24.2723 11.0439L13.8333 21.4719Z"
    />
  </svg>
{/snippet}

{#snippet cross()}
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="inline-block fill-deploio/25"
  >
    <path
      d="M11.4092 22.5718L9.91089 21.0938L15.0072 15.9995L9.91089 10.9271L11.4092 9.44946L16.4999 14.5255L21.5682 9.44946L23.0666 10.9271L17.9702 15.9995L23.0666 21.0938L21.5682 22.5718L16.4999 17.4958L11.4092 22.5718Z"
    />
  </svg>
{/snippet}

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
      <td class={twMerge('pb-3 pt-10 text-center lg:pb-0 lg:pt-0', j === 0 && 'bg-deploio/5')}>
        {#if cell}
          {@render check(j === 0)}
        {:else}
          {@render cross()}
        {/if}
      </td>
    {/each}
  </tr>
{/snippet}

<div class="max-w-full overflow-x-auto whitespace-nowrap">
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
