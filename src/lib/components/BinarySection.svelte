<script lang="ts">
  import { onMount } from 'svelte';
  import { appear } from '$lib';

  let binaryLines: string[][] = [];
  let intervals: NodeJS.Timeout[] = [];
  let transitioningPositions: Set<string> = new Set();
  let transitionTimeouts: Map<string, NodeJS.Timeout> = new Map();

  function generateBinaryLine(length: number): string[] {
    return Array.from({ length }, () => Math.random() > 0.5 ? '1' : '0');
  }

  function initializeBinary() {
    const lineLength = 80;
    binaryLines = [
      generateBinaryLine(lineLength),
      generateBinaryLine(lineLength),
      generateBinaryLine(lineLength),
      generateBinaryLine(lineLength)
    ];
  }

      function startAnimation() {
      intervals = binaryLines.map((line, lineIndex) => {
        return setInterval(() => {
          if (lineIndex === 0) {
            const randomIndex = Math.floor(Math.random() * line.length);
            const positionKey = `${lineIndex}-${randomIndex}`;
            
            if ((randomIndex < 37 || randomIndex > 41) && !transitioningPositions.has(positionKey)) {
              transitioningPositions.add(positionKey);
              
              binaryLines[lineIndex][randomIndex] = Math.random() > 0.5 ? '1' : '0';
              binaryLines = [...binaryLines];
              
              const timeoutId = setTimeout(() => {
                transitioningPositions.delete(positionKey);
                transitionTimeouts.delete(positionKey);
              }, 1000);
              transitionTimeouts.set(positionKey, timeoutId);
            }
          } else {
            const randomIndex = Math.floor(Math.random() * line.length);
            const positionKey = `${lineIndex}-${randomIndex}`;
            
            if (!transitioningPositions.has(positionKey)) {
              transitioningPositions.add(positionKey);
              
              binaryLines[lineIndex][randomIndex] = Math.random() > 0.5 ? '1' : '0';
              binaryLines = [...binaryLines];
              
              const timeoutId = setTimeout(() => {
                transitioningPositions.delete(positionKey);
                transitionTimeouts.delete(positionKey);
              }, 1000);
              transitionTimeouts.set(positionKey, timeoutId);
            }
          }
              }, 10 + Math.random() * 5);
      });
    }

  onMount(() => {
    initializeBinary();
    startAnimation();

    return () => {
      intervals.forEach(interval => clearInterval(interval));
      transitionTimeouts.forEach(timeout => clearTimeout(timeout));
      transitionTimeouts.clear();
      transitioningPositions.clear();
    };
  });

  const specialNumbers = [
    { value: '1', hoverValue: '1', popup: '1 month testing free' },
    { value: '0', hoverValue: '0', popup: '0 risk' },
    { value: '1', hoverValue: '1', popup: '100% control' },
    { value: '0', hoverValue: '0', popup: '100% control' },
    { value: '0', hoverValue: '0', popup: '100% control' }
  ];

  let hoveredIndex: number | null = null;

  function getLineConfig(lineIndex: number) {
    const configs = [
      { fontSize: '18px', baseOpacity: 0.8, fadeEdge: 8, color: 'rgb(20, 29, 80)' },
      { fontSize: '16px', baseOpacity: 0.6, fadeEdge: 12, color: 'rgb(20, 29, 80)' },
      { fontSize: '14px', baseOpacity: 0.4, fadeEdge: 16, color: 'rgb(20, 29, 80)' },
      { fontSize: '12px', baseOpacity: 0.2, fadeEdge: 20, color: 'rgb(20, 29, 80)' }
    ];
    return configs[lineIndex] || configs[3];
  }

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
        <div class="flex justify-center mb-4" style="letter-spacing: 0.5em; text-align: center;">
          {#each line as digit, digitIndex}
            {#if lineIndex === 0 && digitIndex >= 37 && digitIndex <= 41}
              {@const specialIndex = digitIndex - 37}
              {#if specialIndex < specialNumbers.length}
                <span 
                  class="font-bold transition-all duration-500 cursor-pointer text-deploio relative inline-block"
                  class:hover-shadow={hoveredIndex === specialIndex || (specialIndex >= 2 && hoveredIndex === 2)}
                  style="font-size: {lineConfig.fontSize}; text-align: center;"
                  on:mouseenter={() => hoveredIndex = specialIndex >= 2 ? 2 : specialIndex}
                  on:mouseleave={() => hoveredIndex = null}
                  role="button"
                  tabindex="0"
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
                </span>
                  
                  {#if (hoveredIndex === specialIndex && specialIndex < 2) || (hoveredIndex === 2 && specialIndex === 2)}
                    <div 
                      class="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-mountain text-deploio px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg z-30"
                      style="transition: opacity 0.3s ease;"
                    >
                      {specialNumbers[specialIndex].popup}
                      <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent"></div>
                    </div>
                  {/if}
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
                 class="transition-all duration-1000"
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

  .hover-shadow {
    position: relative;
    z-index: 10;
  }

  .hover-shadow::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 30%;
    transform: translate(-50%, -50%);
    width: 1.05em;
    height: 1.4em;
    background-color: rgba(20, 29, 80, 0.5);
    z-index: -1;
    overflow: hidden;
  }
</style> 