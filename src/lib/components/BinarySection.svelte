<script lang="ts">
  import { onMount } from 'svelte';
  import './BinarySection.css';


  const LINE_LENGTH = 80;
  const LINE_COUNT = 4;
  const SPECIAL_START = 37;
  const SPECIAL_END = 41;
  const ANIMATION_INTERVAL = 15; // ms
  const AUTO_HOVER_CYCLE_COUNT = 333; // ~5 seconds at 15ms intervals
  const AUTO_HOVER_DURATION = 3000; // ms
  const SPECIAL_COUNT = 3;
  const HOVER_INDEX_MONTH = 0;
  const HOVER_INDEX_RISK = 1;
  const HOVER_INDEX_CONTROL = 2;
  const POPUP_THRESHOLD = 2;

  const LINE_STYLES = [
    { fontSize: '18px', opacity: 0.8, fadeEdge: 8 },
    { fontSize: '16px', opacity: 0.6, fadeEdge: 12 },
    { fontSize: '14px', opacity: 0.4, fadeEdge: 16 },
    { fontSize: '12px', opacity: 0.2, fadeEdge: 20 }
  ];

  const POPUPS = ['1 month testing free', '0 risk', '100% control'];

  let binaryLines: string[][] = [];
  let hoveredIndex: number | null = null;
  let intervals: NodeJS.Timeout[] = [];

  function randomBit(): string {
    return Math.random() > 0.5 ? '1' : '0';
  }

  function createBinaryLine(): string[] {
    return Array.from({ length: LINE_LENGTH }, randomBit);
  }

  function isSpecialPosition(digitIndex: number): boolean {
    return digitIndex >= SPECIAL_START && digitIndex <= SPECIAL_END;
  }

  function getSpecialIndex(digitIndex: number): number {
    return digitIndex - SPECIAL_START;
  }

  function calculateOpacity(digitIndex: number, style: typeof LINE_STYLES[0]): number {
    const distanceFromEdge = Math.min(digitIndex, LINE_LENGTH - digitIndex - 1);
    if (distanceFromEdge >= style.fadeEdge) return style.opacity;
    if (distanceFromEdge <= 0) return 0;
    return style.opacity * (distanceFromEdge / style.fadeEdge);
  }

  function getDisplayValue(digitIndex: number, originalDigit: string): string {
    if (!isSpecialPosition(digitIndex)) return originalDigit;
    
    const specialIndex = getSpecialIndex(digitIndex);
    
    if (hoveredIndex === HOVER_INDEX_MONTH && specialIndex === 0) return '1';
    if (hoveredIndex === HOVER_INDEX_RISK && specialIndex === 1) return '0';
    if (hoveredIndex === HOVER_INDEX_CONTROL && specialIndex === 2) return '1';
    if (hoveredIndex === HOVER_INDEX_CONTROL && specialIndex === 3) return '0';
    if (hoveredIndex === HOVER_INDEX_CONTROL && specialIndex === 4) return '0';
    
    return originalDigit;
  }

  function handleMouseEnter(specialIndex: number): void {
    hoveredIndex = specialIndex >= POPUP_THRESHOLD ? HOVER_INDEX_CONTROL : specialIndex;
  }

  function handleMouseLeave(): void {
    hoveredIndex = null;
  }

  onMount(() => {
    binaryLines = Array.from({ length: LINE_COUNT }, createBinaryLine);
    
          let autoHoverCounter = 0;
      const interval = setInterval(() => {
        for (let lineIndex = 0; lineIndex < LINE_COUNT; lineIndex++) {
          const randomIndex = Math.floor(Math.random() * LINE_LENGTH);
          binaryLines[lineIndex][randomIndex] = randomBit();
        }
        binaryLines = [...binaryLines];
        
        autoHoverCounter++;
        if (autoHoverCounter >= AUTO_HOVER_CYCLE_COUNT) {
          if (hoveredIndex === null) {
            hoveredIndex = Math.floor(Math.random() * SPECIAL_COUNT);
            setTimeout(() => {
              if (hoveredIndex !== null) hoveredIndex = null;
            }, AUTO_HOVER_DURATION);
          }
          autoHoverCounter = 0;
        }
      }, ANIMATION_INTERVAL);
    
    intervals.push(interval);
    
    return () => {
      intervals.forEach(clearInterval);
    };
  });
</script>

<section class="relative bg-mountain py-16 overflow-hidden">
  <div class="container relative z-10">
    <div class="absolute inset-0 font-mono select-none">
      {#each binaryLines as line, lineIndex}
        {@const style = LINE_STYLES[lineIndex]}
        <div class="flex justify-center mb-4" style="letter-spacing: 0.5em;">
          {#each line as digit, digitIndex}
            {#if lineIndex === 0 && isSpecialPosition(digitIndex)}
              {@const specialIndex = getSpecialIndex(digitIndex)}
              {@const isHovered = hoveredIndex === specialIndex || (specialIndex >= POPUP_THRESHOLD && hoveredIndex === HOVER_INDEX_CONTROL)}
              {@const showPopup = (hoveredIndex === specialIndex && specialIndex < POPUP_THRESHOLD) || (hoveredIndex === HOVER_INDEX_CONTROL && specialIndex === POPUP_THRESHOLD)}
              
              <span 
                class="font-bold transition-all duration-500 cursor-pointer text-deploio relative"
                class:hover-shadow={isHovered}
                style="font-size: {style.fontSize};"
                on:mouseenter={() => handleMouseEnter(specialIndex)}
                on:mouseleave={handleMouseLeave}
                role="button"
                tabindex="0"
              >
                {getDisplayValue(digitIndex, digit)}
                
                {#if showPopup && specialIndex < POPUPS.length}
                  <div class="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-mountain text-deploio px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg z-30">
                    {POPUPS[specialIndex]}
                    <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-mountain"></div>
                  </div>
                {/if}
              </span>
            {:else}
              <span 
                class="transition-all duration-1000 text-deploio"
                style="font-size: {style.fontSize}; opacity: {calculateOpacity(digitIndex, style)};"
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
