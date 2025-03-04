<script lang="ts">
  import CodeBox from '$lib/components/CodeBox.svelte';
  import { appear } from '$lib';
    import type { Snippet } from 'svelte';

  interface FeatureProps {
    avatar: string;
    name: string;
    company?: string;
    date: string;
    children: Snippet;
  }

  let { name, avatar, company, date, children}: FeatureProps = $props();
</script>

<section class="flex flex-col lg:flex-row bg-white text-black p-4 rounded-lg">
  <div class="pr-3">
    <img src="{avatar}" class="w-[36px] h-[36px] rounded-xl">
  </div>
  <div class="flex-1 space-y-4 font-normal">
    <div>
      <span class="font-black font-slack">
        {name}
      </span>
       <span class="text-slate-700">{date}</span>
    </div>
    <h3 class="text-h3" use:appear={{ delay: 0 }}></h3>
    <p use:appear={{ delay: 100 }}>
      {@render children()}
    </p>
  </div>
</section>
