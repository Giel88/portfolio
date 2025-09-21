import { initHoverAnimations, initCaseHover } from './hover.js';
import { initScrollText, killScrollText } from './scroll.js';
import { appState } from './main-state.js';
import { scrollReveal, killScrollReveal } from './scroll-reveal.js';

// --- Webflow reset ---
function resetWebflow(data) {
  const parser = new DOMParser();
  const dom = parser.parseFromString(data.next.html, "text/html");
  const webflowPageId = dom.querySelector("html").getAttribute("data-wf-page");
  document.querySelector("html").setAttribute("data-wf-page", webflowPageId);
  window.Webflow && window.Webflow.destroy();
  window.Webflow && window.Webflow.ready();
  window.Webflow && window.Webflow.require("ix2").init();
}

// --- Video helpers ---
function playVideoWhenReady(video) {
  return new Promise((resolve) => {
    if (!video) return resolve();

    video.pause();
    video.currentTime = 0;
    video.muted = true;

    if (video.readyState >= 4) {
      video.play().catch(() => {});
      return resolve();
    }

    const onCanPlay = () => {
      video.removeEventListener('canplaythrough', onCanPlay);
      video.play().catch(() => {});
      resolve();
    };
    video.addEventListener('canplaythrough', onCanPlay);
  });
}

export function autoplayVideos(container) {
  const videos = container.querySelectorAll('video[autoplay]');
  return Promise.all(Array.from(videos).map(playVideoWhenReady));
}

// --- Barba init ---
barba.init({
  transitions: [
    {
      name: 'default',
      once(data) {
        const overlay = document.querySelector('.page-overlay');   
        gsap.to(overlay, { opacity: 0 });    
      },

      async leave(data) {
        window.isTransitioning = true;
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

      afterEnter: async (data) => {
        initHoverAnimations(data.next.container);
        initCaseHover(data.next.container);
        window.isTransitioning = false;

        // Kill oude triggers
        ScrollTrigger.getAll()
          .filter(trigger => trigger.trigger && data.current.container.contains(trigger.trigger))
          .forEach(trigger => trigger.kill());

        killScrollText();
        killScrollReveal();

        requestAnimationFrame(async () => {
          // Init ScrollTrigger animaties
          scrollReveal(data.next.container);

          // Init autoplayVideos (wacht tot ze klaar zijn)
          await autoplayVideos(data.next.container);

          // Init horizontal loop
          const scrollContainer = data.next.container.querySelector(".scroll-container");
          if (scrollContainer) {
            setTimeout(() => initScrollText(scrollContainer), 50);
          }

          // Refresh ScrollTrigger na kleine delay voor responsive zekerheid
          setTimeout(() => ScrollTrigger.refresh(), 100);
        });
      }
    }
  ]
});
