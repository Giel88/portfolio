// ================================
// Imports
// ================================
import { appState, initMouseTracking, initTicker } from './main-state.js';
import { initCursor } from './cursor.js';
import { initHoverAnimations, initCaseHover } from './hover.js';
import { initScrollText } from './scroll.js';
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
// Init scroll text op eerste page load
// ================================
const initialScrollContainer = document.querySelector(".scroll-container");
if (initialScrollContainer) {
  initScrollText(initialScrollContainer);
}

// ================================
// Init Barba (zorgt voor page transitions en her-init van hover, scroll etc.)
// ================================
initBarba();
