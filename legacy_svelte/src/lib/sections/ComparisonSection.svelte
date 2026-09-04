<script lang="ts">
  import ComparisonTable from '$lib/components/ComparisonTable.svelte';
  import * as m from '$lib/paraglide/messages';
  import { appear } from '$lib';

  import deploioLogo from '$lib/assets/logos/deploio_logo.svg';
  import herokuLogo from '$lib/assets/logos/heroku_logo.svg';
  import divioLogo from '$lib/assets/logos/divio_logo.svg';
  import renderLogo from '$lib/assets/logos/render_logo.svg';
</script>

<section class="bg-background py-16">
  <div class="container space-y-8 !pb-4 text-deploio">
    <h2 class="text-h2" use:appear={{ delay: 0 }}>{m.comparison_title()}</h2>
    <p class="max-w-xl" use:appear={{ delay: 100 }}>{m.comparison_description()}</p>
  </div>

  <div class="container max-sm:!px-0" use:appear={{ delay: 200 }}>
    <ComparisonTable
      class="max-sm:px-6"
      images={[deploioLogo, herokuLogo, divioLogo, renderLogo]}
      alts={['deploio logo', 'heroku logo', 'divio logo', 'render logo']}
      titles={[
        m.comparison_table_location(),
        m.comparison_table_ownership(),
        m.comparison_table_infrastructure(),
        m.comparison_table_automation(),
        m.comparison_table_object_storage(),
        m.comparison_table_enterprise(),
      ]}
      matrix={[
        [true, false, true, false],
        [true, false, false, true],
        [true, true, false, false],
        [true, true, true, true],
        [true, false, true, true],
        [false, true, true, false],
      ]}
    />
  </div>
</section>
