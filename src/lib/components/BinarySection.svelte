<script lang="ts">
  import { onMount } from 'svelte';
  import './BinarySection.css';
  import MonthIcon from '$lib/assets/icons/1month.svg';
  import RiskIcon from '$lib/assets/icons/0risk.svg';
  import ControlIcon from '$lib/assets/icons/100control.svg';

  const LINE_LENGTH = 80;
  const LINE_COUNT = 4;
  const SPECIAL_START = 37;
  const SPECIAL_END = 41;
  const ANIMATION_INTERVAL = 15;
  const AUTO_HOVER_CYCLE_INTERVAL = 5000; // 5 seconds between auto-hover switches
  const AUTO_HOVER_DURATION = 3000; // 3 seconds display duration
  const AUTO_HOVER_CYCLE_COUNT = Math.floor(AUTO_HOVER_CYCLE_INTERVAL / ANIMATION_INTERVAL);
  const SPECIAL_COUNT = 3;
  const HOVER_INDEX_MONTH = 0;
  const HOVER_INDEX_RISK = 1;
  const HOVER_INDEX_CONTROL = 2;
  const POPUP_THRESHOLD = 2;
  
  const HOVER_VALUES: Record<number, string[]> = {
    [HOVER_INDEX_MONTH]: ['1'],
    [HOVER_INDEX_RISK]: ['0'], 
    [HOVER_INDEX_CONTROL]: ['1', '0', '0']
  };

  const LINE_STYLES = [
    { fontSize: '18px', opacity: 0.8, fadeEdge: 8 },
    { fontSize: '16px', opacity: 0.6, fadeEdge: 12 },
    { fontSize: '14px', opacity: 0.4, fadeEdge: 16 },
    { fontSize: '12px', opacity: 0.2, fadeEdge: 20 }
  ];

  const ICON_MAP: Record<number, string> = {
    [HOVER_INDEX_MONTH]: MonthIcon,
    [HOVER_INDEX_RISK]: RiskIcon,
    [HOVER_INDEX_CONTROL]: ControlIcon
  };

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
    if (!isSpecialPosition(digitIndex) || hoveredIndex === null) return originalDigit;
    
    const specialIndex = getSpecialIndex(digitIndex);
    const values = HOVER_VALUES[hoveredIndex];
    
    if (!values) return originalDigit;
    
    if (values.length === 1) {
      return specialIndex === hoveredIndex ? values[0] : originalDigit;
    }
    
    if (hoveredIndex === HOVER_INDEX_CONTROL && specialIndex >= 2) {
      return values[specialIndex - 2] || originalDigit;
    }
    
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

<section class="relative bg-mountain py-16">
  <div class="container relative z-10">
    <div class="absolute inset-0 font-mono select-none">
      {#each binaryLines as line, lineIndex}
        {@const style = LINE_STYLES[lineIndex]}
        <div class="flex justify-center mb-4" style="letter-spacing: 0.5em;">
          {#each line as digit, digitIndex}
            {#if lineIndex === 0 && isSpecialPosition(digitIndex)}
              {@const specialIndex = getSpecialIndex(digitIndex)}
              {@const isHovered = hoveredIndex === specialIndex || (specialIndex >= POPUP_THRESHOLD && hoveredIndex === HOVER_INDEX_CONTROL)}
              {@const showIcon = hoveredIndex !== null && specialIndex === 0}
              {@const iconSrc = hoveredIndex !== null ? ICON_MAP[hoveredIndex] : MonthIcon}
              {@const iconClass = hoveredIndex !== null ? `icon-${hoveredIndex === HOVER_INDEX_MONTH ? 'month' : hoveredIndex === HOVER_INDEX_RISK ? 'risk' : 'control'}` : 'icon-month'}
              
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
                
                                  {#if showIcon && iconSrc}
                    <div class="absolute z-30 pointer-events-none {iconClass}">
                      <img src={iconSrc} alt="Icon" class="pointer-events-none"/>
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
