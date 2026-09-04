<script lang="ts">
  import TeamSection from '$lib/sections/TeamSection.svelte';
  import * as m from '$lib/paraglide/messages';
</script>

<svelte:head>
  <title>{m.meta_title_team()}</title>
  <meta name="description" content={m.meta_description_team()} />
</svelte:head>

<main>
  <TeamSection />
</main>
