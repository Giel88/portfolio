gsap.registerPlugin(ScrollTrigger);

// Pak alle .name-container blokken
const items = gsap.utils.toArray(".scroll-container .name-container");

// Initieer de loop
const tl = horizontalLoop(items, {
  repeat: -1,
  speed: 2
});

// Optioneel: richting omkeren bij scroll
let direction = 1;
let t;

ScrollTrigger.create({
  trigger: ".scroll-container",
  start: "top bottom", // begin animeren wanneer hij in beeld komt
  end: "bottom top",
  onUpdate: (self) => {
    if (self.direction !== direction) {
      direction = self.direction;
      t && t.kill();
      t = gsap.to(tl, {
        duration: 0.3,
        timeScale: self.direction
      });
    }
  }
});
