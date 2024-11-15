<script lang="ts">
  import * as m from '$lib/paraglide/messages.js';
  import CodeBox from '$lib/components/CodeBox.svelte';
  import { appear } from '$lib';

  interface FeatureProps {
    title: string;
    description: string;
    commands: { command: string; result: string }[];
  }

  let { title, description, commands }: FeatureProps = $props();
</script>

<section class="flex flex-col gap-8 lg:flex-row lg:gap-32">
  <div class="flex-1 space-y-4 font-medium text-white">
    <h2 class="text-3xl uppercase" use:appear={{ delay: 0 }}>{title}</h2>
    <p use:appear={{ delay: 100 }}>{description}</p>
  </div>
  <CodeBox class="w-full max-w-[600px] self-end lg:flex-1 lg:self-stretch" {commands} />
</section>
