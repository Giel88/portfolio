import { initHoverAnimations, initCaseHover } from './hover.js';
import { startPreloader } from "./preloader.js";
import { initScrollText, killScrollText } from './scroll.js';
import { appState } from './main-state.js';
import { scrollReveal, killScrollReveal } from './scroll-reveal.js';

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

  function hardResetVideos(container) {
    const videos = container.querySelectorAll('video[autoplay]');
    videos.forEach(video => {
      const clone = video.cloneNode(true);
      clone.muted = true;
      clone.autoplay = true;
      clone.playsInline = true;
      video.parentNode.replaceChild(clone, video);
      clone.play().catch(() => {});
    });
  }

  function autoplayVideos(container) {
    const videos = container.querySelectorAll('video[autoplay]');
    videos.forEach(video => {
      video.pause();
      video.currentTime = 0;
      video.muted = true;
      video.load();
      video.play().catch(() => {});
    });
  }

  function killVideos(container) {
    const videos = container.querySelectorAll('video');
    videos.forEach(video => {
      video.pause();
      video.currentTime = 0;
      video.removeAttribute('src');
      video.load();
    });
  }

  barba.init({
    transitions: [
      {
        name: 'default',

        // Preloader + scrollReveal op eerste load
        once(data) {
          startPreloader(); // start preloader en scrollReveal
        },

        beforeLeave(data) {
          appState.isTransitioning = true;
          killScrollText();
          killScrollReveal();
          killVideos(data.current.container);
          ScrollTrigger.getAll().forEach(st => st.kill());
          gsap.globalTimeline.clear();
        },

        async leave(data) {
          const triggerLink = data.trigger;
          const bgColor = triggerLink?.dataset?.caseColor || getComputedStyle(document.body).getPropertyValue('--bg');
          if (window.resetToDot) window.resetToDot();

          gsap.to(document.body, { backgroundColor: bgColor, duration: 1, ease: "power1.inOut" });
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
            }
          });
        },

        afterEnter(data) {
          initHoverAnimations(data.next.container);
          initCaseHover(data.next.container);
          appState.isTransitioning = false;

          requestAnimationFrame(() => {
            hardResetVideos(data.next.container);

            const scrollContainer = data.next.container.querySelector(".scroll-container");
            if (scrollContainer) setTimeout(() => initScrollText(scrollContainer), 50);

            // scrollReveal wordt al via de preloader gestart, alleen refresh
            if (window.ScrollTrigger) ScrollTrigger.refresh();
          });
        }
      }
    ]
  });
}
