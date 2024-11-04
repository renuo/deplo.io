<script lang="ts">
  import ComparisonTable from '$lib/components/ComparisonTable.svelte';
  import * as m from '$lib/paraglide/messages';
  import deploioLogo from '$lib/assets/logos/deploio_logo.png';
  import herokuLogo from '$lib/assets/logos/heroku_logo.png';
  import divioLogo from '$lib/assets/logos/divio_logo.png';
  import renderLogo from '$lib/assets/logos/render_logo.png';
</script>

<section class="bg-background py-16">
  <div class="container space-y-8 !pb-4 text-deploio">
    <h2 class="text-3xl font-medium uppercase">{m.comparison_title()}</h2>
    <p class="max-w-xl">{m.comparison_description()}</p>
  </div>

  <div class="container">
    <ComparisonTable
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
        [true, false, true, false],
        [true, false, false, true],
        [false, true, false, false],
      ]}
    />
  </div>
</section>
