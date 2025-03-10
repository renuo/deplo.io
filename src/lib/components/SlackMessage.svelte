<script lang="ts">
  import { appear } from '$lib';
  import type { Snippet } from 'svelte';

  interface FeatureProps {
    baseDelay: number;
    avatar: string;
    name: string;
    date: string;
    children: Snippet;
  }

  let { baseDelay, name, avatar, date, children }: FeatureProps = $props();
</script>

<section class="flex flex-col rounded-lg bg-white p-4 font-slack text-black lg:flex-row" use:appear={{delay: baseDelay}}>
  <div class="pr-3">
    <img src={avatar} alt={name} class="h-12 w-12 rounded-xl" />
  </div>
  <div class="flex-1 font-normal">
    <div>
      <span class="mr-1 whitespace-pre font-black">
        {name}
      </span>
      <span class="text-gray-600">{date}</span>
    </div>
    <p class="mt-0 pt-0" use:appear={{ delay: baseDelay + 200 }}>
      {@render children()}
    </p>
  </div>
</section>
