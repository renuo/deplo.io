<script lang="ts">
  import { switchToLanguage } from '$lib/i18n';
  import * as m from '$lib/paraglide/messages';
</script>

<header class="container">
  <button onclick={() => switchToLanguage('en')}>{m.navigation_en()}</button>
  <button onclick={() => switchToLanguage('de')}>{m.navigation_de()}</button>

  <a href="/pricing">{m.navigation_pricing()}</a>
  <a href="/login">{m.navigation_login()}</a>
  <a href="/start">{m.navigation_start()}</a>
</header>
