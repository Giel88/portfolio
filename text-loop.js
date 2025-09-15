function initScrollText(containerSelector = ".scroll-container") {
  const container = document.querySelector(containerSelector);
  if (!container) return; // check of container bestaat
  const items = gsap.utils.toArray(container.querySelectorAll(".name-container"));
  if (!items.length) return;

  const containerWidth = container.offsetWidth;
  const speed = containerWidth / 6000;

  const tl = horizontalLoop(items, {
    repeat: -1,
    speed: speed
  });

  // ScrollTrigger
  let lastScrollTime;
  let scrollTimeout;

  ScrollTrigger.create({
    trigger: container,
    start: "top bottom",
    end: "bottom top",
    onUpdate: (self) => {
      let scrollDir = self.direction;
      let velocity = Math.abs(self.getVelocity());
      let speedFactor = 1 + velocity / 200;
      let maxSpeed = 4;
      speedFactor = Math.min(speedFactor, maxSpeed);

      gsap.to(tl, {
        timeScale: scrollDir * speedFactor,
        duration: 0.1,
        ease: "power1.out",
        overwrite: true
      });

      lastScrollTime = performance.now();

      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        gsap.to(tl, {
          timeScale: scrollDir,
          duration: 1,
          ease: "power1.out",
          overwrite: true
        });
      }, 100);
    }
  });
}
