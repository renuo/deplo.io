document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const menu = document.querySelector('[data-mobile-menu]');
  const menuButton = document.querySelector('[data-menu-toggle]');

  menuButton?.addEventListener('click', () => {
    const open = menu?.classList.toggle('hidden') === false;
    body.style.overflow = open ? 'hidden' : '';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.querySelector('[data-open-icon]')?.classList.toggle('hidden', open);
    menuButton.querySelector('[data-close-icon]')?.classList.toggle('hidden', !open);
  });

  document.querySelectorAll('[data-menu-link]').forEach((link) => {
    link.addEventListener('click', () => {
      menu?.classList.add('hidden');
      body.style.overflow = '';
    });
  });

  const languageMenu = document.querySelector('[data-language-menu]');
  const languageButton = document.querySelector('[data-language-toggle]');
  languageButton?.addEventListener('click', (event) => {
    event.stopPropagation();
    const open = languageMenu?.classList.toggle('hidden') === false;
    languageButton.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', () => languageMenu?.classList.add('hidden'));

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

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => entry.target.classList.toggle('appear-to', entry.isIntersecting));
  }, { rootMargin: '20px' });
  document.querySelectorAll('[data-appear]').forEach((element) => {
    element.classList.add('appear-from');
    element.style.transitionDelay = `${element.dataset.delay || 0}ms`;
    observer.observe(element);
  });

  document.querySelectorAll('[data-marquee]').forEach((marquee) => {
    const track = marquee.querySelector('[data-marquee-track]');
    if (track && track.scrollWidth > marquee.clientWidth) track.classList.add('animate-marquee');
  });
});
