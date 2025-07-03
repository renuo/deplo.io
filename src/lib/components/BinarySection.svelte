<script lang="ts">
  import { onMount } from 'svelte';
  import './BinarySection.css';
  import MonthIcon from '$lib/assets/icons/1month.svg';
  import RiskIcon from '$lib/assets/icons/0risk.svg';
  import ControlIcon from '$lib/assets/icons/100control.svg';

  const LINE_COUNT = 4;
  const LINE_LENGTH = 80;
  const SPECIAL_START = 37;
  const SPECIAL_END = 41;
  const ICONS = [MonthIcon, RiskIcon, ControlIcon];
  const AUTO_HOVER_DURATION = 5000;

  let binaryLines: string[][] = [];
  let hoveredIndex: number | null = null;
  let interval: NodeJS.Timeout;
  let autoHoverTimeout: NodeJS.Timeout;

  function createBinaryLines(): string[][] {
    return Array.from({ length: LINE_COUNT }, () => 
      Array.from({ length: LINE_LENGTH }, () => Math.random() > 0.5 ? '1' : '0')
    );
  }

  function getDisplayLine(line: string[], lineIndex: number): string {
    if (lineIndex !== 0 || hoveredIndex === null) {
      return line.join('');
    }
    
    const modifiedLine = [...line];
    if (hoveredIndex === 0) modifiedLine[SPECIAL_START] = '1';
    if (hoveredIndex === 1) modifiedLine[SPECIAL_START + 1] = '0';
    if (hoveredIndex === 2) {
      modifiedLine[SPECIAL_START + 2] = '1';
      modifiedLine[SPECIAL_START + 3] = '0';
      modifiedLine[SPECIAL_START + 4] = '0';
    }
    
    return modifiedLine.join('');
  }

  function startAutoHover() {
    if (hoveredIndex === null) {
      hoveredIndex = Math.floor(Math.random() * 3);
      autoHoverTimeout = setTimeout(() => {
        hoveredIndex = null;
        setTimeout(startAutoHover, 2000);
      }, 3000);
    }
  }

  onMount(() => {
    binaryLines = createBinaryLines();
    
    interval = setInterval(() => {
      for (let lineIndex = 0; lineIndex < LINE_COUNT; lineIndex++) {
        const randomIndex = Math.floor(Math.random() * LINE_LENGTH);
        binaryLines[lineIndex][randomIndex] = Math.random() > 0.5 ? '1' : '0';
      }
      binaryLines = [...binaryLines];
    }, 50);

    setTimeout(startAutoHover, AUTO_HOVER_DURATION);
    
    return () => {
      clearInterval(interval);
      clearTimeout(autoHoverTimeout);
    };
  });

  function handleMouseEnter(index: number) {
    clearTimeout(autoHoverTimeout);
    hoveredIndex = index >= 2 ? 2 : index;
  }

  function handleMouseLeave() {
    hoveredIndex = null;
    setTimeout(startAutoHover, AUTO_HOVER_DURATION);
  }
</script>

<section class="relative bg-mountain py-16">
  <div class="container relative z-10">
    <div class="absolute inset-0 font-mono select-none">
      {#each binaryLines as line, lineIndex}
        <div class="flex justify-center mb-4" style="letter-spacing: 0.5em;">
          {#if lineIndex === 0}
            <span class="binary-line-fade first-line-fade-start text-lg">
              {getDisplayLine(line, lineIndex).slice(0, SPECIAL_START)}
            </span>
            
            {#each getDisplayLine(line, lineIndex).slice(SPECIAL_START, SPECIAL_END + 1) as digit, index}
              <span 
                class="font-bold relative cursor-pointer text-lg"
                class:hover-shadow={hoveredIndex === index || (index >= 2 && hoveredIndex === 2)}
                on:mouseenter={() => handleMouseEnter(index)}
                on:mouseleave={handleMouseLeave}
                role="button"
                tabindex="0"
              >
                {digit}
                
                {#if hoveredIndex !== null && index === 0}
                  <div class="icon-overlay">
                    <img src={ICONS[hoveredIndex]} alt="Icon" />
                  </div>
                {/if}
              </span>
            {/each}
            
            <span class="binary-line-fade first-line-fade-end text-lg">
              {getDisplayLine(line, lineIndex).slice(SPECIAL_END + 1)}
            </span>
          {:else}
            <span class="binary-line-{lineIndex} binary-line-fade">
              {getDisplayLine(line, lineIndex)}
            </span>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>
