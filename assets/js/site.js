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
});
