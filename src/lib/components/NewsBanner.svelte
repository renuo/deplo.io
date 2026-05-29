<script lang="ts">
  import closeIcon from '$lib/assets/icons/close_lg.svg';
  import chevronIcon from '$lib/assets/icons/chevron_lg.svg';
  import callMadeIcon from '$lib/assets/icons/call_made_lg.svg';

  let isOpen = true;

  function toggleMenu() {
    isOpen = !isOpen;
  }
</script>

<div class="fixed bottom-0 left-0 z-20">
  <button class="z-50 p-3" aria-label={isOpen ? 'Close menu' : 'Open menu'} on:click={toggleMenu}>
    {#if isOpen}
      <img src={closeIcon} alt="Close news banner" />
    {:else}
      <img src={chevronIcon} alt="Open news banner" />
    {/if}
  </button>
  <div
    hidden={!isOpen}
    class="flex w-full animate-[marquee_14s_linear_infinite] overflow-auto bg-white hover:[animation-play-state:paused]"
  >
    {#each Array(2) as _}
      <div class="mx-[7.5rem] flex h-16 w-max items-center font-mono text-2xl">
        <span class="me-14 font-medium text-[#3D3D3A]">
          <span class="text-[#D97757]">*</span> APP MIT <span class="text-[#D97757]">CLAUDE CODE</span> GEBAUT?
        </span>
        <span class="me-6">Installiere das Deploio Plugin und deploye sie direkt aus dem Terminal.</span>
        <a
          href="https://github.com/ninech/deploio-skills"
          target="_blank"
          class="btn btn-primary flex items-center text-[#476DCC]"
          >Zum Plugin
          <img src={callMadeIcon} class="size-8 ml-1" alt="External link" />
        </a>
      </div>
    {/each}
  </div>
</div>
