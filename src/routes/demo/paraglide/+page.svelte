<script lang="ts">
  import { switchToLanguage } from '$lib/i18n';
  import * as m from '$lib/paraglide/messages';
</script>

<h1>{m.hello_world({ name: 'SvelteKit User' })}</h1>
<div>
  <button onclick={() => switchToLanguage('en')}>en</button>
  <button onclick={() => switchToLanguage('de')}>de</button>
</div>
