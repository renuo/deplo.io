<script lang="ts">
  import { onMount } from 'svelte';
  import './BinarySection.css';
  import MonthIcon from '$lib/assets/icons/1month.svg';
  import RiskIcon from '$lib/assets/icons/0risk.svg';
  import ControlIcon from '$lib/assets/icons/100control.svg';

  const LINE_COUNT = 4;
  const ICONS = [MonthIcon, RiskIcon, ControlIcon];
  const AUTO_HOVER_DURATION = 5000;
  const AUTO_HOVER_DISPLAY_TIME = 3000;
  const AUTO_HOVER_RESTART_DELAY = 2000;
  const ANIMATION_INTERVAL = 10;
  
  const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024
  };

  const LINE_LENGTHS = {
    mobile: 30,
    tablet: 40,
    desktop: 60,
    large: 90
  };

  let lineLength = LINE_LENGTHS.desktop;
  let specialStart = 0;
  let specialEnd = 0;
  let binaryLines: string[][] = [];
  let hoveredIndex: number | null = null;
  let interval: NodeJS.Timeout;
  let autoHoverTimeout: NodeJS.Timeout;

  $: {
    specialStart = Math.floor(lineLength / 2) - 3;
    specialEnd = specialStart + 4;
  }

  function getLineLength(width: number): number {
    if (width < BREAKPOINTS.sm) return LINE_LENGTHS.mobile;
    if (width < BREAKPOINTS.md) return LINE_LENGTHS.tablet;
    if (width < BREAKPOINTS.lg) return LINE_LENGTHS.desktop;
    return LINE_LENGTHS.large;
  }

  function updateResponsiveValues(): void {
    if (typeof window !== 'undefined') {
      lineLength = getLineLength(window.innerWidth);
    }
  }

  function createBinaryLines(): string[][] {
    return Array.from({ length: LINE_COUNT }, () => 
      Array.from({ length: lineLength }, () => Math.random() > 0.5 ? '1' : '0')
    );
  }

  function updateRandomBit(): void {
    for (let lineIndex = 0; lineIndex < LINE_COUNT; lineIndex++) {
      const randomIndex = Math.floor(Math.random() * lineLength);
      binaryLines[lineIndex][randomIndex] = Math.random() > 0.5 ? '1' : '0';
    }
    binaryLines = [...binaryLines];
  }

  function applyHoverEffect(line: string[]): string {
    if (hoveredIndex === null) return line.join('');
    
    const modifiedLine = [...line];
    const hoverValues = ['1', '0', '100'];
    const value = hoverValues[hoveredIndex];
    
    if (value === '100') {
      modifiedLine[specialStart + 2] = '1';
      modifiedLine[specialStart + 3] = '0';
      modifiedLine[specialStart + 4] = '0';
    } else {
      modifiedLine[specialStart + hoveredIndex] = value;
    }
    
    return modifiedLine.join('');
  }

  function getDisplayLine(line: string[], lineIndex: number): string {
    return lineIndex === 0 ? applyHoverEffect(line) : line.join('');
  }

  function startAutoHover(): void {
    if (hoveredIndex === null) {
      hoveredIndex = Math.floor(Math.random() * 3);
      autoHoverTimeout = setTimeout(() => {
        hoveredIndex = null;
        setTimeout(startAutoHover, AUTO_HOVER_RESTART_DELAY);
      }, AUTO_HOVER_DISPLAY_TIME);
    }
  }

  function handleMouseEnter(index: number): void {
    clearTimeout(autoHoverTimeout);
    hoveredIndex = index >= 2 ? 2 : index;
  }

  function handleMouseLeave(): void {
    hoveredIndex = null;
    setTimeout(startAutoHover, AUTO_HOVER_DURATION);
  }

  function handleResize(): void {
    updateResponsiveValues();
    binaryLines = createBinaryLines();
  }

  function isHoveredDigit(index: number): boolean {
    return hoveredIndex === index || (index >= 2 && hoveredIndex === 2);
  }

  onMount(() => {
    updateResponsiveValues();
    binaryLines = createBinaryLines();
    
    window.addEventListener('resize', handleResize);
    interval = setInterval(updateRandomBit, ANIMATION_INTERVAL);
    setTimeout(startAutoHover, AUTO_HOVER_DURATION);
    
    return () => {
      clearInterval(interval);
      clearTimeout(autoHoverTimeout);
      window.removeEventListener('resize', handleResize);
    };
  });
</script>

<section class="relative bg-mountain pt-28 pb-28 md:pb-12 overflow-x-hidden">
  <div class="container relative z-10">
    <div class="absolute inset-0 font-mono select-none">
      {#each binaryLines as line, lineIndex}
        <div class="flex justify-center mb-2" style="letter-spacing: 0.5em;">
          {#if lineIndex === 0}
            <span class="binary-line-fade first-line-fade-start text-lg">
              {getDisplayLine(line, lineIndex).slice(0, specialStart)}
            </span>
            
            {#each getDisplayLine(line, lineIndex).slice(specialStart, specialEnd + 1) as digit, index}
              <span 
                class="font-bold relative cursor-pointer text-lg"
                class:hover-shadow={isHoveredDigit(index)}
                on:mouseenter={() => handleMouseEnter(index)}
                on:mouseleave={handleMouseLeave}
                role="button"
                tabindex="0"
              >
                {digit}
                
                {#if hoveredIndex !== null && index === 0}
                  <div class="icon-{hoveredIndex}">
                    <img src={ICONS[hoveredIndex]} alt="Feature icon" />
                  </div>
                {/if}
              </span>
            {/each}
            
            <span class="binary-line-fade first-line-fade-end text-lg">
              {getDisplayLine(line, lineIndex).slice(specialEnd + 1)}
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

