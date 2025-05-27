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

  // Line configuration for cone effect
  function getLineConfig(lineIndex: number) {
    const configs = [
      { fontSize: '18px', baseOpacity: 0.8, fadeEdge: 8, color: 'rgb(20, 29, 80)' }, // Line 1: bigger, less opaque, small edge fade
      { fontSize: '16px', baseOpacity: 0.6, fadeEdge: 12, color: 'rgb(20, 29, 80)' }, // Line 2: medium, more edge fade
      { fontSize: '14px', baseOpacity: 0.4, fadeEdge: 16, color: 'rgb(20, 29, 80)' }, // Line 3: same size, more opaque, more edge fade
      { fontSize: '12px', baseOpacity: 0.2, fadeEdge: 20, color: 'rgb(20, 29, 80)' }  // Line 4: smaller, half edges, very opaque
    ];
    return configs[lineIndex] || configs[3];
  }

  // Calculate opacity based on position and line config
  function getOpacity(digitIndex: number, lineLength: number, config: any) {
    const { baseOpacity, fadeEdge } = config;
    const fromStart = digitIndex;
    const fromEnd = lineLength - digitIndex - 1;
    const distanceFromEdge = Math.min(fromStart, fromEnd);
    
    if (distanceFromEdge >= fadeEdge) {
      return baseOpacity;
    } else if (distanceFromEdge <= 0) {
      return 0;
    } else {
      // Gradual fade from edge
      const fadeRatio = distanceFromEdge / fadeEdge;
      return baseOpacity * fadeRatio;
    }
  }
</script>

<section class="relative bg-mountain py-16 overflow-hidden">
  <div class="container relative z-10">
        <div class="absolute inset-0 font-mono select-none">
      {#each binaryLines as line, lineIndex}
        {@const lineConfig = getLineConfig(lineIndex)}
        <div class="flex justify-center mb-4" style="letter-spacing: 0.5em;">
          {#each line as digit, digitIndex}
            {#if lineIndex === 0 && digitIndex >= 37 && digitIndex <= 41}
              {@const specialIndex = digitIndex - 37}
              {#if specialIndex < specialNumbers.length}
                <div class="relative inline-block">
                  <button
                    class="font-bold transition-all duration-300 hover:text-yellow-400 hover:scale-110 cursor-pointer text-deploio"
                    style="font-size: {lineConfig.fontSize};"
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
                      class="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-mountain text-deploio px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg z-30"
                      style="transition: opacity 0.3s ease;"
                    >
                      {specialNumbers[specialIndex].popup}
                      <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent"></div>
                    </div>
                  {/if}
                </div>
              {:else}
                <span 
                  class="transition-opacity duration-300 text-deploio"
                  style="font-size: {lineConfig.fontSize};"
                >
                  {digit}
                </span>
              {/if}
            {:else}
               <span 
                 class="transition-opacity duration-300"
                 style="font-size: {lineConfig.fontSize}; opacity: {getOpacity(digitIndex, line.length, lineConfig)}; color: {lineConfig.color};"
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