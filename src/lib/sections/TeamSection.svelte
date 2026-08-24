<script lang="ts">
  import Background from '$lib/components/Background.svelte';
  import deploioVideo from '$lib/assets/backgrounds/deploio_video.mp4';
  import * as m from '$lib/paraglide/messages';
  import { appear } from '$lib';
  import MemberCard from '$lib/components/MemberCard.svelte';
  import { page } from '$app/state';
  import { i18n } from '$lib/i18n';
  import { onMount } from 'svelte';
  import { team } from '$lib/data/team';
  import { team_en } from '$lib/data/team';

  const language = i18n.getLanguageFromUrl(page.url);

  let members: Array = [];
  onMount(async () => {
    if (language == 'de') {
      members = team;
    } else {
      members = team_en;
    }
  });
</script>

<Background
  video={deploioVideo}
  class="h-[600px]"
  gradient-class="bg-gradient-to-t from-background via-80% to-transparent"
  wrapper-class="h-full"
>
  <section class="team-container flex h-full flex-col justify-end space-y-6 pb-16 text-deploio">
    <h1 class="max-w-[600px] text-5xl text-[46px] font-medium uppercase leading-[50px]" use:appear={{ delay: 0 }}>
      {m.team_title()}
    </h1>
    <p class="max-w-[600px] text-lg" use:appear={{ delay: 100 }}>
      {m.team_description()}
    </p>
  </section>
</Background>

<div class="bg-background">
  <div class="team-container my-0 !py-2 !pb-32 !pt-16 md:!pt-40">
    <section>
      <div class="grid grid-cols-1 justify-items-center gap-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {#each members as member}
          <MemberCard {...member} />
        {/each}
      </div>
    </section>
  </div>
</div>
