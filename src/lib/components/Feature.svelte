<script lang="ts">
  import CodeBox from '$lib/components/CodeBox.svelte';
  import { appear } from '$lib';

  interface FeatureProps {
    title: string;
    description: string;
    commands: { command: string; result: string }[];
  }

  let { title, description, commands }: FeatureProps = $props();
</script>

<section class="flex flex-col gap-8 lg:flex-row lg:gap-24">
  <div class="flex-1 space-y-4 text-white">
    <h3 class="text-h3" use:appear={{ delay: 0 }}>{title}</h3>
    <p use:appear={{ delay: 100 }}>{description}</p>
  </div>
  <CodeBox class="w-full max-w-[600px] self-end lg:flex-1 lg:self-stretch" {commands} />
</section>
