<script lang="ts">
  import { onMount } from 'svelte';
  import { appear } from '$lib';

  let binaryLines: string[][] = [];
  let intervals: NodeJS.Timeout[] = [];

  // Generate random binary string
  function generateBinaryLine(length: number): string[] {
    return Array.from({ length }, () => Math.random() > 0.5 ? '1' : '0');
  }

  // Initialize binary lines
  function initializeBinary() {
    const lineLength = 80; // Adjust based on screen width
    binaryLines = [
      generateBinaryLine(lineLength),
      generateBinaryLine(lineLength),
      generateBinaryLine(lineLength),
      generateBinaryLine(lineLength)
    ];
  }

  // Animate binary switching
  function startAnimation() {
    intervals = binaryLines.map((line, lineIndex) => {
      return setInterval(() => {
        // Skip the special numbers in the first line (positions 37-41)
        if (lineIndex === 0) {
          // Only animate positions that are not the special numbers
          const randomIndex = Math.floor(Math.random() * line.length);
          if (randomIndex < 37 || randomIndex > 41) {
            binaryLines[lineIndex][randomIndex] = Math.random() > 0.5 ? '1' : '0';
          }
        } else {
          // Animate all positions in other lines
          const randomIndex = Math.floor(Math.random() * line.length);
          binaryLines[lineIndex][randomIndex] = Math.random() > 0.5 ? '1' : '0';
        }
        binaryLines = [...binaryLines]; // Trigger reactivity
      }, 100 + Math.random() * 200); // Random interval between 100-300ms
    });
  }

  onMount(() => {
    initializeBinary();
    startAnimation();

    return () => {
      intervals.forEach(interval => clearInterval(interval));
    };
  });

  // Special numbers data
  const specialNumbers = [
    { value: '1', hoverValue: '1', popup: '1 month testing free' },
    { value: '0', hoverValue: '0', popup: '0 risk' },
    { value: '1', hoverValue: '1', popup: '100% control' }, // Will show "100" when hovering due to special logic
    { value: '0', hoverValue: '0', popup: '100% control' }, // Part of "100"
    { value: '0', hoverValue: '0', popup: '100% control' }  // Part of "100"
  ];

  let hoveredIndex: number | null = null;
</script>

<section class="relative bg-white py-16 overflow-hidden">
  <div class="container relative z-10">
    <div class="absolute inset-0 font-mono text-sm text-deploio/20 select-none">
      {#each binaryLines as line, lineIndex}
                <div class="flex justify-center mb-4" style="letter-spacing: 0.5em;">
          {#each line as digit, digitIndex}
            {#if lineIndex === 0 && digitIndex >= 37 && digitIndex <= 41}
              {@const specialIndex = digitIndex - 37}
              {#if specialIndex < specialNumbers.length}
                <div class="relative inline-block">
                  <button
                    class="font-bold transition-all duration-300 hover:text-yellow-400 hover:scale-110 cursor-pointer text-deploio"
                    on:mouseenter={() => hoveredIndex = specialIndex >= 2 ? 2 : specialIndex}
                    on:mouseleave={() => hoveredIndex = null}
                  >
                    {#if specialIndex >= 2}
                      {#if hoveredIndex === 2}
                        {specialIndex === 2 ? '1' : '0'}
                      {:else}
                        {specialNumbers[specialIndex].value}
                      {/if}
                    {:else}
                      {hoveredIndex === specialIndex ? specialNumbers[specialIndex].hoverValue : specialNumbers[specialIndex].value}
                    {/if}
                  </button>
                  
                  {#if (hoveredIndex === specialIndex && specialIndex < 2) || (hoveredIndex === 2 && specialIndex === 2)}
                    <div 
                      class="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white text-deploio px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg z-30"
                      style="transition: opacity 0.3s ease;"
                    >
                      {specialNumbers[specialIndex].popup}
                      <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                    </div>
                  {/if}
                </div>
              {:else}
                <span 
                  class="transition-opacity duration-300 text-deploio"
                >
                  {digit}
                </span>
              {/if}
            {:else}
               <span 
                 class="transition-opacity duration-300"
                 class:opacity-0={digitIndex < 5 || digitIndex > line.length - 6}
                 class:opacity-20={(digitIndex >= 5 && digitIndex <= 10) || (digitIndex >= line.length - 10 && digitIndex <= line.length - 6)}
                 class:opacity-40={(digitIndex >= 11 && digitIndex <= 15) || (digitIndex >= line.length - 15 && digitIndex <= line.length - 11)}
                 class:opacity-60={(digitIndex >= 16 && digitIndex <= 20) || (digitIndex >= line.length - 20 && digitIndex <= line.length - 16)}
                 class:opacity-80={(digitIndex >= 21 && digitIndex <= 25) || (digitIndex >= line.length - 25 && digitIndex <= line.length - 21)}
                 class:opacity-100={digitIndex >= 26 && digitIndex <= line.length - 26}
              >
                {digit}
              </span>
            {/if}
          {/each}
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .transition-opacity {
    transition-property: opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
  }
</style> 