<script lang="ts">
  import * as m from '$lib/paraglide/messages';
  import Link from '$lib/components/Link.svelte';
  import Button from '$lib/components/Button.svelte';
  import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';

  import deploioLogo from '$lib/assets/deploio_logo.svg';
  import deploioName from '$lib/assets/deploio_name.svg';
</script>

<header class="container absolute left-0 right-0 top-0 z-10 flex items-start justify-between">
  <div
    class="flex select-none flex-row items-center justify-center gap-2 md:h-48 md:w-48 md:flex-col md:rounded-full md:bg-deploio"
  >
    <img class="h-7 md:h-16" src={deploioLogo} alt="deploio logo" />
    <img class="h-6 md:h-7" src={deploioName} alt="deploio" />
  </div>

  <nav class="flex items-center gap-8 max-md:gap-4 max-md:self-stretch">
    <LanguageSwitcher class="max-md:hidden" />

    <Link href="/pricing">{m.navigation_pricing()}</Link>
    <Link href="/login">{m.navigation_login()}</Link>
    <Button variant="primary" class="max-md:hidden">{m.navigation_start()}</Button>
  </nav>
</header>
