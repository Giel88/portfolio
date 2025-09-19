import { appState } from './main-state.js';
gsap.registerPlugin(ScrollTrigger);

let tl;
let scrollTriggerInstance;
let scrollTimeout;

export function horizontalLoop(items, config = {}) {
  console.log("HORIZONTAL LOOP: start", items, config);
  items = gsap.utils.toArray(items);
  tl = gsap.timeline({
    repeat: config.repeat,
    paused: config.paused,
    defaults: { ease: "none" },
    onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
  });

  const length = items.length;
  const widths = [];
  const xPercents = [];
  const times = [];
  const snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1);
  const pixelsPerSecond = (config.speed || 1) * 100;

  try {
    gsap.set(items, {
      xPercent: (i, el) => {
        let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
        xPercents[i] = snap((parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 + gsap.getProperty(el, "xPercent"));
        return xPercents[i];
      }
    });
    gsap.set(items, { x: 0 });
  } catch(e) {
    console.error("HORIZONTAL LOOP: gsap.set error", e);
  }

  // rest van de timeline setup ...
  // (zelfde als origineel, eventueel try/catch toevoegen bij critical ops)
  return tl;
}

export function initScrollText(container) {
  if (!container) return;
  console.log("SCROLL: initScrollText", container);

  const items = gsap.utils.toArray(container.querySelectorAll(".name-container"));
  console.log("SCROLL: found items", items.length);
  if (!items.length) return;

  try {
    const speed = container.offsetWidth / 6000;
    tl = horizontalLoop(items, { repeat: -1, speed });
  } catch(e) {
    console.error("SCROLL: horizontalLoop error", e);
  }

  if (scrollTriggerInstance) scrollTriggerInstance.kill();

  try {
    scrollTriggerInstance = ScrollTrigger.create({
      trigger: container,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        console.log("SCROLL: ScrollTrigger onUpdate", self.direction, self.getVelocity());
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
  } catch(e) {
    console.error("SCROLL: ScrollTrigger.create error", e);
  }
}

export function killScrollText() {
  console.log("SCROLL: killScrollText");
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
