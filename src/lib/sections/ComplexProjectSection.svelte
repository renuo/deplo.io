<script lang="ts">
  import { appear } from '$lib';
  import MountainAnimation from '$lib/components/MountainAnimation.svelte';
  import * as m from '$lib/paraglide/messages';
  import Button from '$lib/components/Button.svelte';
  import BinarySection from '$lib/components/BinarySection.svelte';

  const labels = ['Deploio', 'Managed Server', 'Root-Server', 'Kubernetes Cluster'];
</script>

<section id="register" class="bg-mountain text-center text-deploio">
  <div class="overflow-x-hidden">
    <MountainAnimation {labels} />
  </div>

  <div class="container bg-mountain !pb-0">
    <div class="flex flex-col items-center justify-center">
      <h2 class="text-h2">{m.complex_projects_ready()}</h2>
    </div>
  </div>
  <BinarySection />
</section>
