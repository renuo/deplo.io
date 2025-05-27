<script lang="ts">
  import { appear } from '$lib';
  import MountainAnimation from '$lib/components/MountainAnimation.svelte';

  const labels = ['Deploio', 'Managed Server', 'Root-Server', 'Kubernetes Cluster'];
</script>

<section id="register" class="bg-mountain text-center text-deploio">
  <MountainAnimation {labels} />
  
  <div class="container relative z-10 space-y-8 !pt-16 md:!pt-0">
    <h2 class="text-h2 mx-auto max-w-[800px]" use:appear={{ delay: 0 }}>
      KOMPLIZIERTERE PROJEKTE?
    </h2>
    <p class="mx-auto max-w-[620px] text-[20px]" use:appear={{ delay: 100 }}>
      Deploio ist nur der Anfang. Wenn dir Deploio in einem Projekt zu limitiert ist und du dennoch alle deine Projekte an einem Ort haben möchtest: Über das Deploio-Dashboard kannst Du auch Managed Server, Root Server oder Kubernetes Cluster bestellen.
    </p>
    <!-- <a 
      href="#" 
      class="inline-flex items-center gap-2 text-deploio font-medium hover:underline"
      use:appear={{ delay: 200 }}
    >
      ZU NINE →
    </a> -->
  </div>
</section>
  