import { appState, initMouseTracking, initTicker } from './main-state.js';
import { initCursor } from './cursor.js';
import { initHoverAnimations, initCaseHover } from './hover.js';
import { initScrollText, killScrollText } from './scroll.js';
import { scrollReveal, killScrollReveal } from './scroll-reveal.js';
import { initBarba } from './barba.js';
import { startPreloader } from './preloader.js';

// ================================
// Init basis state
// ================================
initMouseTracking();
initTicker();
initCursor();
initHoverAnimations(document);
initCaseHover(document);

// ================================
// Functie om alles na preloader te starten
// ================================
export function initPageAnimations(container = document) {
  const scrollContainer = container.querySelector(".scroll-container");
  if (scrollContainer) initScrollText(scrollContainer);

  scrollReveal(container);
  if (window.ScrollTrigger) ScrollTrigger.refresh();
}

// ================================
// Init Barba met cleanup hooks
// ================================
initBarba({
  once: (data) => startPreloader(data.next.container),
  afterEnter: (data) => {
    initHoverAnimations(data.next.container);
    initCaseHover(data.next.container);
    appState.isTransitioning = false;
  },
  beforeLeave: () => {
    killScrollText();
    killScrollReveal();
  }
});

// ================================
// Eerste load trigger
// ================================
document.addEventListener("DOMContentLoaded", () => {
  startPreloader(document);
});
