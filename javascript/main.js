import { appState, initMouseTracking, initTicker } from './main-state.js';
import { initCursor } from './cursor.js';
import { initHoverAnimations, initCaseHover } from './hover.js';
import { initScrollText, killScrollText } from './scroll.js';
import { scrollReveal, killScrollReveal } from './scroll-reveal.js';
import { initBarba } from './barba.js';

console.log("MAIN: script start");

// ================================
// Init basis state
// ================================
initMouseTracking();
initTicker();
initCursor();
initHoverAnimations(document);
initCaseHover(document);

console.log("MAIN: base init done");

// ================================
// Init scroll animaties op eerste page load
// ================================
document.addEventListener("DOMContentLoaded", () => {
  console.log("MAIN: DOMContentLoaded");

  const initialScrollContainer = document.querySelector(".scroll-container");
  if (initialScrollContainer) {
    console.log("MAIN: found initial scroll container");
    try {
      initScrollText(initialScrollContainer);
    } catch (e) {
      console.error("MAIN: initScrollText error", e);
    }
  }

  try {
    scrollReveal(document);
  } catch (e) {
    console.error("MAIN: scrollReveal error", e);
  }

  if (window.ScrollTrigger) {
    console.log("MAIN: refreshing ScrollTrigger");
    ScrollTrigger.refresh();
  }
});

// ================================
// Init Barba met cleanup hooks
// ================================
initBarba({
  beforeLeave() {
    console.log("MAIN: beforeLeave cleanup");
    try {
      killScrollText();
    } catch(e) {
      console.error("MAIN: killScrollText error", e);
    }
    try {
      killScrollReveal();
    } catch(e) {
      console.error("MAIN: killScrollReveal error", e);
    }
  }
});
