export let intersectionObserver: IntersectionObserver | null = null;

export function appear(element: HTMLElement, options?: { delay?: number }) {
  intersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          element.classList.add('appear-to');
        } else {
          element.classList.remove('appear-to');
        }
      });
    },
    {
      rootMargin: '20px',
    },
  );

  intersectionObserver.observe(element);
  element.style.transitionDelay = `${options?.delay ?? 0}ms`;
  element.classList.add('appear-from');

  return {
    destroy() {
      intersectionObserver?.unobserve(element);
      element.style.transitionDelay = '';
      element.classList.remove('appear-from', 'appear-to');
    },
  };
}
