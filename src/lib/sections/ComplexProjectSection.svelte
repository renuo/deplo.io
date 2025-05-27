<script lang="ts">
  import { appear } from '$lib';
  import MountainAnimation from '$lib/components/MountainAnimation.svelte';

  const labels = ['Deploio', 'Managed Server', 'Root-Server', 'Kubernetes Cluster'];
</script>

<section id="register" class="bg-mountain text-center text-deploio">
  <MountainAnimation {labels} />
</section>
