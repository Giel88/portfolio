// ================================
// Imports
// ================================
import { appState, initMouseTracking, initTicker } from './main-state.js';
import { initCursor } from './cursor.js';
import { initHoverAnimations, initCaseHover } from './hover.js';
import { initScrollText } from './scroll.js';
import { scrollReveal } from './scroll-reveal.js';
import { initBarba } from './barba.js';

// ================================
// Init basis state
// ================================
initMouseTracking();
initTicker();
initCursor();
initHoverAnimations(document);
initCaseHover(document);

// ================================
// Init scroll text en scrollReveal op eerste page load
// ================================
document.addEventListener("DOMContentLoaded", () => {
  // Scroll text
  const initialScrollContainer = document.querySelector(".scroll-container");
  if (initialScrollContainer) {
    initScrollText(initialScrollContainer);
  }

  // ScrollReveal (headers, paragraphs, lists, images)
  scrollReveal(document);

  // Refresh ScrollTrigger zodat alles meteen werkt
  if (window.ScrollTrigger) {
    ScrollTrigger.refresh();
  }
});

// ================================
// Init Barba (zorgt voor page transitions en her-init van hover, scroll etc.)
// ================================
initBarba();
