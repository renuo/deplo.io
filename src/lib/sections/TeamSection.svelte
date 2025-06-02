<script lang="ts">
  import Background from '$lib/components/Background.svelte';
  import deploioVideo from '$lib/assets/backgrounds/deploio_video.mp4';
  import * as m from '$lib/paraglide/messages';
  import { appear } from '$lib';
  import MemberCard from '$lib/components/MemberCard.svelte';
  import cyrillTroxler from '$lib/assets/team/cyrill_troxler.webp';
  import danielWilhelm from '$lib/assets/team/daniel_wilhelm.webp';
  import davorGajic from '$lib/assets/team/davor_gajic.webp';
  import etienneKyburz from '$lib/assets/team/etienne_kyburz.webp';
  import josuaSchmid from '$lib/assets/team/josua_schmid.webp';
  import kevinFerranti from '$lib/assets/team/kevin_ferranti.webp';
  import nikkyJolley from '$lib/assets/team/nikky_jolley.webp';
  import oliverAnthony from '$lib/assets/team/oliver_anthony.webp';
  import oliverNietlisbach from '$lib/assets/team/oliver_nietlisbach.webp';
  import pawelKuc from '$lib/assets/team/pawel_kuc.webp';
  import raphaelKnecht from '$lib/assets/team/raphael_knecht.webp';
  import raphaelNestler from '$lib/assets/team/raphael_nestler.webp';
  import samuelSteiner from '$lib/assets/team/samuel_steiner.webp';
  import timGrethler from '$lib/assets/team/tim_grethler.webp';
  import thomasHug from '$lib/assets/team/thomas_hug.webp';
  import vanessaAlbrecht from '$lib/assets/team/vanessa_albrecht.webp';
  import yessinBenBrahim from '$lib/assets/team/yessin_ben_brahim.webp';
  import sebastianNickel from '$lib/assets/team/sebastian_nickel.webp';

  const Team = [
    { name: 'Thomas Hug', role: 'Co-Founder', image: thomasHug },
    { name: 'Samuel Steiner', role: 'Co-Founder', image: samuelSteiner },
    { name: 'Tim Grethler', role: 'Head of Engineering', image: timGrethler },
    { name: 'Nikky Jolley', role: 'Customer Success', image: nikkyJolley },
    { name: 'Josua Schmid', role: 'Strategie', image: josuaSchmid },
    { name: 'Cyrill Troxler', role: 'Platform Engineer', image: cyrillTroxler },
    { name: 'Sebastian Nickel', role: 'Platform Engineer', image: sebastianNickel },
    { name: 'Davor Gajic', role: 'Platform Engineer', image: davorGajic },
    { name: 'Pawel Kuc', role: 'Platform Engineer', image: pawelKuc },
    { name: 'Daniel Wilhelm', role: 'Senior Engineer Managed Services', image: danielWilhelm },
    { name: 'Raphael Nestler', role: 'Senior Software Engineer', image: raphaelNestler },
    { name: 'Kevin Ferranti', role: 'Software Engineer', image: kevinFerranti },
    { name: 'Oliver Nietlisbach', role: 'Software Engineer', image: oliverNietlisbach },
    { name: 'Etienne Kyburz', role: 'Software Engineer', image: etienneKyburz },
    { name: 'Raphael Knecht', role: 'Marketing', image: raphaelKnecht },
    { name: 'Oliver Anthony', role: 'Dokumentation', image: oliverAnthony },
    { name: 'Yessin Ben Brahim', role: 'Marketing', image: yessinBenBrahim },
    { name: 'Vanessa Albrecht', role: 'Design', image: vanessaAlbrecht },
  ];
</script>

<Background
  video={deploioVideo}
  class="h-[600px]"
  gradient-class="bg-gradient-to-t from-background via-80% to-transparent"
  wrapper-class="h-full"
>
  <section class="container flex h-full flex-col justify-end space-y-6 pb-16 text-deploio">
    <h1 class="max-w-[500px] text-5xl text-[46px] font-medium uppercase leading-[50px]" use:appear={{ delay: 0 }}>
      {m.team_title()}
    </h1>
    <p class="max-w-[500px] text-lg" use:appear={{ delay: 100 }}>
      {m.team_description()}
    </p>
  </section>
</Background>

<div class="bg-background">
  <div class="container space-y-16 !pb-32 !pt-0">
    <section class="space-y-6">
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
        {#each Team as member}
          <MemberCard {...member} />
        {/each}
      </div>
    </section>
  </div>
</div>
