gsap.registerPlugin(SplitText, ScrollTrigger);

function initScrollReveal() {
  const allRevealEls = gsap.utils.toArray("[data-reveal-content]");
  const lastRevealEl = allRevealEls[allRevealEls.length - 1];

  allRevealEls.forEach(el => {
    const type = el.getAttribute("data-reveal-content");
    let split;

    if (type === "header") {
      split = new SplitText(el, { type: "words, chars" });
      gsap.from(split.chars, {
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        y: "25%",
        rotation: 3,
        opacity: 0,
        duration: 0.5,
        ease: "power1.out",
        stagger: { each: 0.02 }
      });
    }

    if (type === "paragraph") {
      split = new SplitText(el, { type: "lines" });
      gsap.from(split.lines, {
        scrollTrigger: {
          trigger: el,
          start: el === lastRevealEl ? "top 90%" : "top 70%",
          toggleActions: "play none none none"
        },
        y: "25%",
        opacity: 0,
        duration: 1,
        ease: "power1.out",
        stagger: { each: 0.05 }
      });
    }

    if (type === "list") {
      const items = el.querySelectorAll("li");
      gsap.from(items, {
        scrollTrigger: {
          trigger: el,
          start: el === lastRevealEl ? "top 90%" : "top 80%",
          toggleActions: "play none none none"
        },
        y: "25%",
        opacity: 0,
        duration: 0.5,
        ease: "power1.out",
        stagger: { each: 0.1 }
      });
    }

    if (type === "image") {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: el === lastRevealEl ? "top 90%" : "top 70%",
          toggleActions: "play none none none"
        },
        y: "10%",
        opacity: 0,
        duration: 1,
        ease: "power1.out"
      });

      const portraitImg = el.querySelector(".portrait-pic");
      if (portraitImg) {
        gsap.from(portraitImg, {
          y: "-10%",
          ease: "none",
          scrollTrigger: {
            trigger: portraitImg,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }
    }
  });
}

// Initialisatie bij pageload
window.addEventListener("load", () => {
  initScrollReveal();
});
