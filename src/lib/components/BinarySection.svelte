<script lang="ts">
  import { onMount } from 'svelte';
  import { i18n } from '$lib/i18n';
  import { page } from '$app/state';
  import PushIcon from '$lib/assets/icons/1free_push.svg';
  import RiskIcon_DE from '$lib/assets/icons/0risk_de.svg';
  import RiskIcon_EN from '$lib/assets/icons/0risk_en.svg';
  import ControlIcon_DE from '$lib/assets/icons/100control_de.svg';
  import ControlIcon_EN from '$lib/assets/icons/100control_en.svg';

  const language = i18n.getLanguageFromUrl(page.url);

  let ICONS: [string, string, string];
  onMount(async () => {
    if (language == 'de') {
      ICONS = [PushIcon, RiskIcon_DE, ControlIcon_DE];
    } else {
      ICONS = [PushIcon, RiskIcon_EN, ControlIcon_EN];
    }
  });

  const LINE_COUNT = 4;
  const AUTO_HOVER_DURATION = 5000;
  const AUTO_HOVER_DISPLAY_TIME = 3000;
  const AUTO_HOVER_RESTART_DELAY = 2000;
  const ANIMATION_INTERVAL = 10;

  const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
  };

  const LINE_LENGTHS = {
    mobile: 30,
    tablet: 40,
    desktop: 60,
    large: 90,
  };

  let lineLength = LINE_LENGTHS.desktop;
  let specialStart = 0;
  let specialEnd = 0;
  let binaryLines: string[][] = [];
  let hoveredIndex: number | null = null;
  let interval: NodeJS.Timeout;
  let autoHoverTimeout: NodeJS.Timeout;
  let currentHoverIndex = 0;

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
      Array.from({ length: lineLength }, () => (Math.random() > 0.5 ? '1' : '0')),
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
      hoveredIndex = currentHoverIndex;
      currentHoverIndex = (currentHoverIndex + 1) % 3;
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

<section class="relative overflow-x-hidden bg-mountain pb-28 pt-28 md:pb-12">
  <div class="container relative z-10">
    <div class="absolute inset-0 select-none font-mono">
      {#each binaryLines as line, lineIndex}
        <div class="mb-2 flex justify-center" style="letter-spacing: 0.5em;">
          {#if lineIndex === 0}
            <span class="binary-line-fade first-line-fade-start text-lg">
              {getDisplayLine(line, lineIndex).slice(0, specialStart)}
            </span>

            {#each getDisplayLine(line, lineIndex).slice(specialStart, specialEnd + 1) as digit, index}
              <span
                class="relative cursor-pointer text-lg font-bold"
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

<style>
  .hover-shadow {
    position: relative;
  }

  .hover-shadow::before {
    content: '';
    position: absolute;
    left: -19%;
    top: 5%;
    width: 1.18rem;
    height: 1.4rem;
    background-color: theme('colors.deploio');
    opacity: 0.2;
  }

  .binary-line-fade {
    background: linear-gradient(
      90deg,
      transparent 0%,
      transparent var(--fade-start),
      theme('colors.deploio' / 0.3) var(--fade-in),
      theme('colors.deploio' / 0.3) var(--fade-out),
      transparent var(--fade-end),
      transparent 100%
    );
    background-clip: text;
    color: transparent;
  }

  .first-line-fade-start {
    --fade-start: 10%;
    --fade-in: 50%;
    --fade-out: 100%;
    --fade-end: 100%;
  }

  .first-line-fade-end {
    --fade-start: 0%;
    --fade-in: 0%;
    --fade-out: 50%;
    --fade-end: 90%;
  }

  .binary-line-1 {
    --fade-start: 10%;
    --fade-end: 90%;
    font-size: 17px;
  }

  .binary-line-2 {
    --fade-start: 15%;
    --fade-end: 85%;
    font-size: 16px;
  }

  .binary-line-3 {
    --fade-start: 20%;
    --fade-end: 80%;
    font-size: 15px;
  }

  .binary-line-1,
  .binary-line-2,
  .binary-line-3 {
    --fade-in: 50%;
    --fade-out: 50%;
  }

  .icon-0,
  .icon-1,
  .icon-2 {
    position: absolute;
    pointer-events: none;
    width: 200px;
    height: 100px;
  }

  .icon-0 {
    left: -85px;
    top: -72px;
  }

  .icon-1 {
    left: 80%;
    top: -80px;
  }

  .icon-2 {
    left: 90%;
    top: -85px;
  }
</style>
