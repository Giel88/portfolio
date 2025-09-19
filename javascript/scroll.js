// scroll.js (robust + debug)
import { appState } from './main-state.js';
gsap.registerPlugin(ScrollTrigger);

let tl = null;
let scrollTriggerInstance = null;
let scrollTimeout = null;

const MAX_INIT_ATTEMPTS = 8; // aantal retries als we geen geldige maten zien

function safeGetWidth(el) {
  return (
    parseFloat(gsap.getProperty(el, "width", "px")) ||
    el.offsetWidth ||
    el.getBoundingClientRect().width ||
    0
  );
}

export function horizontalLoop(items, config = {}) {
  console.log("horizontalLoop: building timeline", items.length);
  items = gsap.utils.toArray(items);

  if (tl) {
    try { tl.kill(); } catch (e) {}
    tl = null;
  }

  tl = gsap.timeline({
    repeat: config.repeat,
    paused: config.paused,
    defaults: { ease: "none" }
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
        let w = (widths[i] = safeGetWidth(el));
        xPercents[i] = snap(
          (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
            gsap.getProperty(el, "xPercent")
        );
        return xPercents[i];
      }
    });
    gsap.set(items, { x: 0 });
  } catch (e) {
    console.error("horizontalLoop: error during initial gsap.set()", e);
  }

  const firstOffset = items[0] ? items[0].offsetLeft : 0;
  const last = items[length - 1];
  const totalWidth =
    (last ? last.offsetLeft : 0) +
    ((xPercents[length - 1] || 0) / 100) * (widths[length - 1] || 0) -
    firstOffset +
    (last ? last.offsetWidth * gsap.getProperty(last, "scaleX") : 0) +
    (parseFloat(config.paddingRight) || 0);

  for (let i = 0; i < length; i++) {
    const item = items[i];
    const curX = (xPercents[i] / 100) * (widths[i] || 0);
    const distanceToStart = item.offsetLeft + curX - firstOffset;
    const distanceToLoop = distanceToStart + (widths[i] || 0) * gsap.getProperty(item, "scaleX");

    if (!widths[i] || !isFinite(distanceToLoop) || distanceToLoop <= 0) {
      console.warn("horizontalLoop: skipping item due to invalid width/distance", item, widths[i], distanceToLoop);
      continue;
    }

    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond
      },
      0
    )
      .fromTo(
        item,
        {
          xPercent: snap(((curX - distanceToLoop + totalWidth) / widths[i]) * 100)
        },
        {
          xPercent: xPercents[i],
          duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false
        },
        distanceToLoop / pixelsPerSecond
      )
      .add("label" + i, distanceToStart / pixelsPerSecond);

    times[i] = distanceToStart / pixelsPerSecond;
  }

  function toIndex(index, vars = {}) {
    if (!times.length) return;
    if (Math.abs(index - 0) > length / 2) index += index > 0 ? -length : length;
    const newIndex = gsap.utils.wrap(0, times.length, index);
    let time = times[newIndex];
    if ((time > tl.time()) !== (index > 0)) {
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
      time += tl.duration() * (index > 0 ? 1 : -1);
    }
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }

  tl.next = (vars) => toIndex(1, vars);
  tl.previous = (vars) => toIndex(-1, vars);
  tl.current = () => 0;
  tl.toIndex = (index, vars) => toIndex(index, vars);
  tl.times = times;

  try { tl.play(); } catch (e) {}

  return tl;
}

export function initScrollText(container) {
  if (!container) return;
  console.log("initScrollText: starting for", container);
  const items = gsap.utils.toArray(container.querySelectorAll(".name-container"));
  console.log("initScrollText: number of items", items.length);
  if (!items.length) return;

  let attempts = 0;

  function attemptInit() {
    attempts++;
    const haveSizes = items.every(el => safeGetWidth(el) > 0);

    if (!haveSizes && attempts <= MAX_INIT_ATTEMPTS) {
      const delay = Math.min(200, 25 * attempts);
      console.log(`initScrollText: measurements not ready, retry ${attempts}/${MAX_INIT_ATTEMPTS} (delay ${delay}ms)`);
      requestAnimationFrame(() => setTimeout(attemptInit, delay));
      return;
    }

    if (!haveSizes) {
      console.warn("initScrollText: aborting init — couldn't measure items (width=0).");
      return;
    }

    try {
      const speed = Math.max(0.02, container.offsetWidth / 6000);
      tl = horizontalLoop(items, { repeat: -1, speed });
      console.log("initScrollText: timeline created", tl);
    } catch (e) {
      console.error("initScrollText: horizontalLoop creation failed", e);
      return;
    }

    try {
      if (scrollTriggerInstance) {
        try { scrollTriggerInstance.kill(); } catch (e) {}
        scrollTriggerInstance = null;
      }

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const scrollDir = self.direction || 1;
          const velocity = Math.abs(self.getVelocity()) || 0;
          let speedFactor = 1 + velocity / 200;
          speedFactor = Math.min(speedFactor, 4);
          try {
            gsap.to(tl, { timeScale: scrollDir * speedFactor, duration: 0.1, ease: "power1.out", overwrite: true });
          } catch (e) {
            console.error("initScrollText: failed to set timeScale on tl", e);
          }

          if (scrollTimeout) clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            try { gsap.to(tl, { timeScale: scrollDir, duration: 1, ease: "power1.out", overwrite: true }); } catch (e) {}
          }, 100);
        }
      });

      console.log("initScrollText: ScrollTrigger created", scrollTriggerInstance);
    } catch (e) {
      console.error("initScrollText: ScrollTrigger.create failed", e);
    }
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      attemptInit();
    }).catch(() => {
      attemptInit();
    });
  } else {
    attemptInit();
  }
}

export function killScrollText() {
  console.log("killScrollText: cleaning up");
  try {
    if (tl) {
      tl.kill();
      tl = null;
    }
  } catch(e) {
    console.warn("killScrollText: tl.kill() error", e);
  }
  try {
    if (scrollTriggerInstance) {
      scrollTriggerInstance.kill();
      scrollTriggerInstance = null;
    }
  } catch(e) {
    console.warn("killScrollText: scrollTrigger.kill() error", e);
  }
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
    scrollTimeout = null;
  }
}
