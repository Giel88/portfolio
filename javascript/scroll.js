import { appState } from './main-state.js';
gsap.registerPlugin(ScrollTrigger);

let tl;
let scrollTriggerInstance;
let scrollTimeout;

export function horizontalLoop(items, config = {}) {
  items = gsap.utils.toArray(items);
  tl = gsap.timeline({
    repeat: config.repeat ?? -1,
    paused: config.paused ?? false,
    defaults: { ease: "none" },
  });

  const length = items.length;
  const widths = [];
  const xPercents = [];
  const times = [];
  const snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1);
  const pixelsPerSecond = (config.speed || 1) * 100;

  gsap.set(items, {
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
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

    tl.to(item, {
      xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
      duration: distanceToLoop / pixelsPerSecond
    }, 0)
      .fromTo(item, {
        xPercent: snap(((curX - distanceToLoop + totalWidth) / widths[i]) * 100)
      }, {
        xPercent: xPercents[i],
        duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
        immediateRender: false
      }, distanceToLoop / pixelsPerSecond);

    times[i] = distanceToStart / pixelsPerSecond;
  }

  return tl;
}

export function initScrollText(container) {
  if (!container) return;
  const items = gsap.utils.toArray(container.querySelectorAll(".name-container"));
  if (!items.length) return;

  const speed = container.offsetWidth / 6000;
  tl = horizontalLoop(items, { repeat: -1, speed });

  if (scrollTriggerInstance) scrollTriggerInstance.kill();

  scrollTriggerInstance = ScrollTrigger.create({
    trigger: container,
    start: "top bottom",
    end: "bottom top",
    onUpdate: (self) => {
      const scrollDir = self.direction;
      const velocity = Math.abs(self.getVelocity());
      let speedFactor = 1 + velocity / 200;
      speedFactor = Math.min(speedFactor, 4);

      gsap.to(tl, { timeScale: scrollDir * speedFactor, duration: 0.1, ease: "power1.out", overwrite: true });

      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        gsap.to(tl, { timeScale: scrollDir, duration: 1, ease: "power1.out", overwrite: true });
      }, 100);
    }
  });
}

export function killScrollText() {
  if (tl) {
    tl.kill();
    tl = null;
  }
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill();
    scrollTriggerInstance = null;
  }
  if (scrollTimeout) clearTimeout(scrollTimeout);
}
