<script lang="ts">
  import node from '$lib/assets/language_node.png';
  import django from '$lib/assets/language_django.png';
  import go from '$lib/assets/language_go.png';
  import php from '$lib/assets/language_php.png';
  import python from '$lib/assets/language_python.png';
  import ruby from '$lib/assets/language_ruby.png';

  const PIXELS_PER_SECOND = 0.01;

  let scrolling = $state(false);
  let scrollable: HTMLDivElement | null = $state(null);
  let animationFrame = 0;
  let lastTime = 0;
  let direction = 1;
  let scrollLeft = 0;

  function animate(time: number) {
    if (!lastTime) lastTime = time;
    const deltaTime = time - lastTime;
    lastTime = time;

    const distance = PIXELS_PER_SECOND * deltaTime;
    const hasReachedEnd = scrollable!.scrollLeft + distance >= scrollable!.scrollWidth - scrollable!.clientWidth;
    const hasReachedStart = scrollable!.scrollLeft - distance <= 0;

    if (!scrolling) {
      scrollLeft += distance * direction;
      scrollable!.scrollLeft = scrollLeft;
    }

    if (direction === 1 && hasReachedEnd) {
      direction = -1;
    }

    if (direction === -1 && hasReachedStart) {
      direction = 1;
    }

    animationFrame = requestAnimationFrame(animate);
  }

  function onscroll() {
    scrolling = true;
    scrollLeft = scrollable!.scrollLeft;
  }

  function onscrollend() {
    scrolling = false;
  }

  $effect(() => {
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  });
</script>

<div bind:this={scrollable} class="container no-scrollbar h-32 overflow-x-scroll" {onscroll} {onscrollend}>
  <div class="pointer-events-none flex w-max select-none items-center gap-[10vw] lg:justify-between lg:gap-32">
    <img src={node} alt="Node.js" />
    <img src={django} alt="Django" />
    <img src={go} alt="Go" />
    <img src={php} alt="PHP" />
    <img src={python} alt="Python" />
    <img src={ruby} alt="Ruby" />
  </div>
</div>

<style>
  /* Hide scrollbar for Chrome, Safari and Opera */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .no-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
</style>
