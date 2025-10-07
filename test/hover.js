import { appState } from './main-state.js';

export function initHoverAnimations(container = document) {
  if (!window.matchMedia("(min-width: 992px)").matches) return;

  container.querySelectorAll(".case-link, .button").forEach(el => {
    const title = el.querySelector(".linktitle");
    if (!title) return;

    el.addEventListener("mouseenter", () => {
      if (!appState.hasMoved) return;
      if (appState.isTransitioning) return;
      gsap.to(title, { x: 20, duration: 0.5, ease: "back.out(2)", overwrite: "auto" });
    });

    el.addEventListener("mouseleave", () => {
      if (!appState.hasMoved) return;
      gsap.to(title, { x: 0, duration: 0.3, ease: "bounce.out", overwrite: "auto" });
    });
  });
};

export function initCaseHover(container = document) {
  const items = container.querySelectorAll(".case-item");

  items.forEach(item => {
    const hoverContainer = item.querySelector(".case-hover-image-container");
    if (!hoverContainer) return;

    // initial state
    gsap.set(hoverContainer, { 
      opacity: 0, 
      scale: 0, 
      display: "none", 
      x: 0, 
      y: 0, 
      xPercent: -50, 
      yPercent: -50, 
      transformOrigin: "50% 50%", 
      rotation: 0 
    });

    item.addEventListener("mouseenter", () => {
      if (!appState.hasMoved) return;
      if (appState.isTransitioning) return;

      gsap.killTweensOf(hoverContainer);
      appState.currentHover = hoverContainer;
      gsap.set(hoverContainer, { display: "flex" });
      gsap.to(hoverContainer, { 
        scale: 1, 
        opacity: 1, 
        duration: 0.2, 
        ease: "back.out(1.7)" 
      });
    });

    item.addEventListener("mouseleave", () => {
      if (!appState.hasMoved) return;

      gsap.killTweensOf(hoverContainer);
      gsap.to(hoverContainer, { 
        scale: 0.9, 
        opacity: 0, 
        duration: 0.1, 
        ease: "power1.in", 
        onComplete: () => gsap.set(hoverContainer, { display: "none" }) 
      });
      gsap.to(hoverContainer, { rotation: 0, duration: 0.3, ease: "power1.out" });
      appState.currentHover = null;
    });
  });
}
