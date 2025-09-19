import { initHoverAnimations, initCaseHover } from './hover.js';
import { initScrollText } from './scroll.js';
import { appState } from './main-state.js';
import { scrollReveal } from './scroll-reveal.js';

export function initBarba() {
  function resetWebflow(data) {
    const parser = new DOMParser();
    const dom = parser.parseFromString(data.next.html, "text/html");
    const webflowPageId = dom.querySelector("html").getAttribute("data-wf-page");
    document.querySelector("html").setAttribute("data-wf-page", webflowPageId);
    window.Webflow && window.Webflow.destroy();
    window.Webflow && window.Webflow.ready();
    window.Webflow && window.Webflow.require("ix2").init();
  }

  function autoplayVideos(container) {
    const videos = container.querySelectorAll('video[autoplay]');
    videos.forEach(video => {
      video.pause();
      video.currentTime = 0;
      video.muted = true;
      video.play().catch(() => {});
    });
  }

  barba.init({
    transitions: [{
      name: 'default',
      once(data) {
        const overlay = document.querySelector('.page-overlay');
        gsap.to(overlay, { opacity: 0 });
      },
      async leave(data) {
        appState.isTransitioning = true;
        if (window.resetToDot) window.resetToDot();
        await gsap.to(data.current.container, { autoAlpha: 0, duration: 1 });
      },
      enter(data) {
        const next = data.next.container;
        next.classList.add("fixed");
        gsap.set(next, { autoAlpha: 0 });
        gsap.to(next, {
          autoAlpha: 1,
          duration: 1,
          onComplete: () => {
            window.scrollTo(0, 0);
            next.classList.remove("fixed");
            resetWebflow(data);
            if (window.resetToDot) window.resetToDot();
          }
        });
      },
      afterEnter(data) {
        initHoverAnimations(data.next.container);
        initCaseHover(data.next.container);
        appState.isTransitioning = false;

        ScrollTrigger.getAll()
          .filter(trigger => trigger.trigger && data.current.container.contains(trigger.trigger))
          .forEach(trigger => trigger.kill());

        requestAnimationFrame(() => {
          autoplayVideos(data.next.container);
          const scrollContainer = data.next.container.querySelector(".scroll-container");
          if (scrollContainer) setTimeout(() => initScrollText(scrollContainer), 50);
          ScrollTrigger.refresh();
        });

        requestAnimationFrame(() => {
          scrollReveal(data.next.container);
        });
      }
    }]
  });
}
