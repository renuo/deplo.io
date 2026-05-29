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
  <button
    class="absolute bottom-full right-10 bg-white p-1"
    aria-controls="marquee"
    aria-expanded={isOpen}
    on:click={toggleMenu}
  >
    {#if isOpen}
      <img class="size-8" src={closeIcon} alt="Close news banner" />
    {:else}
      <img class="size-8" src={chevronIcon} alt="Open news banner" />
    {/if}
  </button>
  <div class="w-screen overflow-hidden">
    {#if isOpen}
      <div
        id="marquee"
        class=" flex w-max animate-[marquee_14s_linear_infinite] bg-white hover:[animation-play-state:paused]"
      >
        <!-- eslint-disable-next-line -->
        {#each Array(4) as _, i}
          <div class="mx-[7.5rem] flex h-16 items-center font-mono text-2xl" aria-hidden={i > 0 ? 'true' : null}>
            <span class="me-14 font-medium text-[#3D3D3A]">
              <span class="text-[#D97757]">*</span> APP MIT <span class="text-[#D97757]">CLAUDE CODE</span> GEBAUT?
            </span>
            <span class="me-6">Installiere das Deploio Plugin und deploye sie direkt aus dem Terminal.</span>
            <a
              href="https://github.com/ninech/deploio-skills"
              target="_blank"
              class="btn btn-primary flex items-center text-[#476DCC]"
              >Zum Plugin
              <img src={callMadeIcon} class="ml-1 size-8" alt="External link" />
            </a>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
