//  scroll.js (veilig, mobile-aware)
import { appState } from './main-state.js';
gsap.registerPlugin(ScrollTrigger);

let tl = null;
let scrollTriggerInstance = null;
let scrollTimeout = null;
let lastUpdateAt = 0;

// helper: throttle in ms
function shouldThrottle(ms = 50) {
  const now = performance.now();
  if (now - lastUpdateAt < ms) return true;
  lastUpdateAt = now;
  return false;
}

export function horizontalLoop(items, config = {}) {
  items = gsap.utils.toArray(items);
  if (!items.length) return null;

  const timeline = gsap.timeline({
    repeat: config.repeat ?? -1,
    paused: config.paused ?? false,
    defaults: { ease: "none" }
  });

  const length = items.length;
  const widths = [];
  const xPercents = [];
  const snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1);
  const pixelsPerSecond = (config.speed || 1) * 100;

  gsap.set(items, {
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")) || 1);
      xPercents[i] = snap((parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 + gsap.getProperty(el, "xPercent"));
      return xPercents[i];
    }
  });
  gsap.set(items, { x: 0 });

  const totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    items[0].offsetLeft +
    items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], "scaleX") +
    (parseFloat(config.paddingRight) || 0);

  for (let i = 0; i < length; i++) {
    const item = items[i];
    const curX = (xPercents[i] / 100) * widths[i];
    const distanceToStart = item.offsetLeft + curX - items[0].offsetLeft;
    const distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");

    timeline.to(item, {
      xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
      duration: distanceToLoop / pixelsPerSecond
    }, 0).fromTo(item, {
      xPercent: snap(((curX - distanceToLoop + totalWidth) / widths[i]) * 100)
    }, {
      xPercent: xPercents[i],
      duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
      immediateRender: false
    }, distanceToLoop / pixelsPerSecond);
  }

  return timeline;
}

export function initScrollText(container) {
  // safety: skip on narrow viewports (mobile)
  if (!container) return;
  //if (window.innerWidth < 992) {
  //  console.log("SCROLL-TEXT: skip on mobile");
  //  return;
  //}

  const items = gsap.utils.toArray(container.querySelectorAll(".name-container"));
  if (!items.length) return;

  // if already running, kill first
  if (tl) {
    killScrollText();
  }

  const speed = Math.max(0.2, container.offsetWidth / 6000);
  tl = horizontalLoop(items, { repeat: -1, speed });

  // create a ScrollTrigger that adjusts timeScale, but throttle updates
  scrollTriggerInstance = ScrollTrigger.create({
    trigger: container,
    start: "top bottom",
    end: "bottom top",
    onUpdate: (self) => {
      // throttle to lighten mobile load
      if (shouldThrottle(60)) return;

      const scrollDir = self.direction || 1;
      const velocity = Math.abs(self.getVelocity ? self.getVelocity() : 0);
      let speedFactor = 1 + velocity / 200;
      speedFactor = Math.min(speedFactor, 3);

      // ensure we have a timeline
      if (tl) {
        gsap.to(tl, { timeScale: scrollDir * speedFactor, duration: 0.12, ease: "power1.out", overwrite: true });
      }

      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (tl) gsap.to(tl, { timeScale: scrollDir, duration: 0.6, ease: "power1.out", overwrite: true });
      }, 120);
    }
  });

  console.log("SCROLL-TEXT: initialized", { container, itemsCount: items.length });
}

export function killScrollText() {
  console.log("SCROLL-TEXT: killScrollText");
  if (tl) {
    try { tl.kill(); } catch (e) { console.warn("SCROLL-TEXT: tl.kill() failed", e); }
    tl = null;
  }
  if (scrollTriggerInstance) {
    try { scrollTriggerInstance.kill(); } catch (e) { console.warn("SCROLL-TEXT: st.kill() failed", e); }
    scrollTriggerInstance = null;
  }
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
    scrollTimeout = null;
  }
  lastUpdateAt = 0;
}
