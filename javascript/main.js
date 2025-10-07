import { appState, initMouseTracking, initTicker } from './main-state.js';
import { initCursor } from './cursor.js';
import { initHoverAnimations, initCaseHover } from './hover.js';
import { initScrollText, killScrollText } from './scroll.js';
import { scrollReveal, killScrollReveal } from './scroll-reveal.js';
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
// Init scroll animaties op eerste page load
// ================================
document.addEventListener("DOMContentLoaded", () => {
  const initialScrollContainer = document.querySelector(".scroll-container");
  if (initialScrollContainer) initScrollText(initialScrollContainer);

  //scrollReveal(document);
  //if (window.ScrollTrigger) ScrollTrigger.refresh();
});

// ================================
// Init Barba met cleanup hooks
// ================================
initBarba({
  beforeLeave() {
    console.log("MAIN: beforeLeave hook fired");
    killScrollText();
    killScrollReveal();
  }
});
