document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const menu = document.querySelector('[data-mobile-menu]');
  const menuButton = document.querySelector('[data-menu-toggle]');
  const mobileLogo = document.querySelector('[data-mobile-logo]');

  const setMenuOpen = (open) => {
    menu?.classList.toggle('hidden', !open);
    mobileLogo?.classList.toggle('hidden', open);
    body.classList.toggle('overflow-hidden', open);
    menuButton?.classList.toggle('fixed', open);
    menuButton?.classList.toggle('right-4', open);
    menuButton?.classList.toggle('top-3', open);
    menuButton?.classList.toggle('relative', !open);
    menuButton?.setAttribute('aria-expanded', String(open));
    menuButton?.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menuButton?.querySelector('[data-open-icon]')?.classList.toggle('hidden', open);
    menuButton?.querySelector('[data-close-icon]')?.classList.toggle('hidden', !open);
  };

  menuButton?.addEventListener('click', () => {
    setMenuOpen(menu?.classList.contains('hidden') === true);
  });

  document.querySelectorAll('[data-menu-link]').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  const languageMenu = document.querySelector('[data-language-menu]');
  const languageButton = document.querySelector('[data-language-toggle]');
  const languageChevron = document.querySelector('[data-language-chevron]');
  const setLanguageMenuOpen = (open) => {
    languageMenu?.classList.toggle('hidden', !open);
    languageChevron?.classList.toggle('rotate-180', open);
    languageButton?.setAttribute('aria-expanded', String(open));
  };
  languageButton?.addEventListener('click', (event) => {
    event.stopPropagation();
    setLanguageMenuOpen(languageMenu?.classList.contains('hidden') === true);
  });
  document.addEventListener('click', () => setLanguageMenuOpen(false));

  const banner = document.querySelector('[data-news-banner]');
  const bannerToggle = document.querySelector('[data-news-toggle]');
  if (banner && bannerToggle) {
    const open = localStorage.getItem('newsBannerIsOpen') !== 'false';
    banner.classList.toggle('hidden', !open);
    bannerToggle.setAttribute('aria-expanded', String(open));
    bannerToggle.addEventListener('click', () => {
      const nextOpen = banner.classList.toggle('hidden');
      const isOpen = !nextOpen;
      localStorage.setItem('newsBannerIsOpen', String(isOpen));
      bannerToggle.setAttribute('aria-expanded', String(isOpen));
      bannerToggle.querySelector('[data-banner-close]')?.classList.toggle('hidden', !isOpen);
      bannerToggle.querySelector('[data-banner-open]')?.classList.toggle('hidden', isOpen);
    });
    bannerToggle.querySelector('[data-banner-close]')?.classList.toggle('hidden', !open);
    bannerToggle.querySelector('[data-banner-open]')?.classList.toggle('hidden', open);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => entry.target.classList.toggle('appear-to', entry.isIntersecting));
    },
    { rootMargin: '20px' },
  );
  document.querySelectorAll('[data-appear]').forEach((element) => {
    element.classList.add('appear-from');
    element.style.transitionDelay = `${element.dataset.delay || 0}ms`;
    observer.observe(element);
  });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reducedMotion) {
    const characterMs = 75;
    const resultDelayMs = 200;

    document.querySelectorAll('[data-terminal]').forEach((terminal) => {
      let previousCommandsLength = 0;

      terminal.querySelectorAll('[data-terminal-entry]').forEach((entry, index) => {
        const prompt = entry.querySelector('[data-terminal-prompt]');
        const command = entry.querySelector('[data-terminal-command]');
        const result = entry.querySelector('[data-terminal-result]');
        if (!prompt || !command || !result) return;

        const commandText = command.textContent;
        const commandStartMs = previousCommandsLength * characterMs + index * resultDelayMs;
        const resultStartMs = commandStartMs + commandText.length * characterMs + resultDelayMs;

        prompt.style.setProperty('--terminal-delay', `${commandStartMs}ms`);
        command.replaceChildren(
          ...Array.from(commandText, (character, characterIndex) => {
            const span = document.createElement('span');
            span.dataset.terminalCharacter = '';
            span.style.setProperty('--terminal-delay', `${commandStartMs + characterIndex * characterMs}ms`);
            span.textContent = character === ' ' ? '\u00a0' : character;
            return span;
          }),
        );

        const lines = result.innerText.split('\n');
        result.replaceChildren(
          ...lines.map((line, lineIndex) => {
            const span = document.createElement('span');
            span.dataset.terminalResultLine = '';
            span.style.setProperty('--terminal-delay', `${resultStartMs + lineIndex * characterMs}ms`);
            span.textContent = line;
            return span;
          }),
        );

        previousCommandsLength += commandText.length;
      });

      terminal.classList.add('terminal-animated');
    });
  }

  document.querySelectorAll('[data-marquee]').forEach((marquee) => {
    const track = marquee.querySelector('[data-marquee-track]');
    const item = marquee.querySelector('[data-marquee-item]');
    if (!track || !item) return;

    const gap = Number(marquee.dataset.marqueeGap);
    const speed = Number(marquee.dataset.marqueeSpeed);
    const paddingRem = gap * 1.1;
    track.style.setProperty('--marquee-padding', `${paddingRem}rem`);

    const updateMarquee = () => {
      const rootFontSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize);
      const contentWidth = item.scrollWidth - paddingRem * rootFontSize + gap * 0.25 * rootFontSize;
      track.style.setProperty('--marquee-duration', `${contentWidth / speed}s`);
      track.classList.toggle('marquee-active', contentWidth > marquee.clientWidth);
    };

    marquee.querySelectorAll('img').forEach((image) => image.addEventListener('load', updateMarquee));
    new ResizeObserver(updateMarquee).observe(marquee);
    updateMarquee();
  });

  document.querySelectorAll('[data-binary]').forEach((binary) => {
    const lineLengths = { mobile: 30, tablet: 40, desktop: 60, large: 90 };
    const icons = [binary.dataset.iconPush, binary.dataset.iconRisk, binary.dataset.iconControl];
    let lines = [];
    let lineElements = [];
    let digitElements = [];
    let hoveredIndex = null;
    let currentHoverIndex = 0;
    let autoHoverTimer;

    const lineLengthForViewport = () => {
      if (window.innerWidth < 640) return lineLengths.mobile;
      if (window.innerWidth < 768) return lineLengths.tablet;
      if (window.innerWidth < 1024) return lineLengths.desktop;
      return lineLengths.large;
    };

    const createLine = (length) => Array.from({ length }, () => (Math.random() > 0.5 ? '1' : '0'));

    const displayedFirstLine = () => {
      const line = [...lines[0]];
      if (hoveredIndex === null) return line;

      const specialStart = Math.floor(line.length / 2) - 3;
      if (hoveredIndex === 2) {
        line[specialStart + 2] = '1';
        line[specialStart + 3] = '0';
        line[specialStart + 4] = '0';
      } else {
        line[specialStart + hoveredIndex] = hoveredIndex === 0 ? '1' : '0';
      }
      return line;
    };

    const updateIcon = () => {
      digitElements[0]?.querySelector('[data-binary-icon]')?.remove();
      if (hoveredIndex === null || !digitElements[0]) return;

      const icon = document.createElement('div');
      icon.className = 'binary-icon';
      icon.dataset.binaryIcon = '';
      icon.dataset.index = String(hoveredIndex);
      const image = document.createElement('img');
      image.src = icons[hoveredIndex];
      image.alt = 'Feature icon';
      icon.append(image);
      digitElements[0].append(icon);
    };

    const renderLines = () => {
      const firstLine = displayedFirstLine();
      const specialStart = Math.floor(firstLine.length / 2) - 3;
      const specialEnd = specialStart + 4;
      lineElements[0].start.textContent = firstLine.slice(0, specialStart).join('');
      digitElements.forEach((element, index) => {
        element.firstChild.textContent = firstLine[specialStart + index];
        element.classList.toggle('binary-digit-active', hoveredIndex === index || (index >= 2 && hoveredIndex === 2));
      });
      lineElements[0].end.textContent = firstLine.slice(specialEnd + 1).join('');
      lines.slice(1).forEach((line, index) => {
        lineElements[index + 1].textContent = line.join('');
      });
    };

    const scheduleAutoHover = (delay = 5000) => {
      window.clearTimeout(autoHoverTimer);
      if (reducedMotion) return;

      autoHoverTimer = window.setTimeout(() => {
        hoveredIndex = currentHoverIndex;
        currentHoverIndex = (currentHoverIndex + 1) % icons.length;
        renderLines();
        updateIcon();
        autoHoverTimer = window.setTimeout(() => {
          hoveredIndex = null;
          renderLines();
          updateIcon();
          scheduleAutoHover(2000);
        }, 3000);
      }, delay);
    };

    const setHoveredIndex = (index) => {
      window.clearTimeout(autoHoverTimer);
      hoveredIndex = index;
      renderLines();
      updateIcon();
    };

    const clearHoveredIndex = () => {
      hoveredIndex = null;
      renderLines();
      updateIcon();
      scheduleAutoHover();
    };

    const buildLines = () => {
      const length = lineLengthForViewport();
      lines = Array.from({ length: 4 }, () => createLine(length));
      lineElements = [];
      digitElements = [];
      binary.replaceChildren();

      lines.forEach((_line, lineIndex) => {
        const row = document.createElement('div');
        row.className = 'binary-line';

        if (lineIndex === 0) {
          const start = document.createElement('span');
          start.className = 'binary-line-fade binary-first-line-start text-lg';
          const end = document.createElement('span');
          end.className = 'binary-line-fade binary-first-line-end text-lg';
          row.append(start);

          for (let digitIndex = 0; digitIndex < 5; digitIndex += 1) {
            const digit = document.createElement('span');
            digit.className = 'binary-digit';
            digit.setAttribute('role', 'button');
            digit.tabIndex = 0;
            digit.setAttribute('aria-label', `Show feature ${Math.min(digitIndex, 2) + 1}`);
            digit.append(document.createTextNode(''));
            digit.addEventListener('mouseenter', () => setHoveredIndex(Math.min(digitIndex, 2)));
            digit.addEventListener('mouseleave', clearHoveredIndex);
            digit.addEventListener('focus', () => setHoveredIndex(Math.min(digitIndex, 2)));
            digit.addEventListener('blur', clearHoveredIndex);
            digitElements.push(digit);
            row.append(digit);
          }

          row.append(end);
          lineElements.push({ start, end });
        } else {
          const content = document.createElement('span');
          content.className = `binary-line-${lineIndex} binary-line-fade`;
          row.append(content);
          lineElements.push(content);
        }

        binary.append(row);
      });

      renderLines();
      updateIcon();
    };

    buildLines();
    scheduleAutoHover();

    const bitInterval = reducedMotion
      ? null
      : window.setInterval(() => {
          lines.forEach((line) => {
            const index = Math.floor(Math.random() * line.length);
            line[index] = Math.random() > 0.5 ? '1' : '0';
          });
          renderLines();
        }, 10);

    window.addEventListener('resize', buildLines);
    window.addEventListener(
      'pagehide',
      () => {
        if (bitInterval) window.clearInterval(bitInterval);
        window.clearTimeout(autoHoverTimer);
      },
      { once: true },
    );
  });
});
