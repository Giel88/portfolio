gsap.registerPlugin(SplitText, ScrollTrigger);

let splitInstances = [];

export function scrollReveal(container = document) {
  console.log("SCROLL-REVEAL: start", container);

  // Headers
  gsap.utils.toArray('[data-reveal-content="header"]', container).forEach(el => {
    console.log("SCROLL-REVEAL: header", el);
    try {
      if (!el || !el.textContent.trim()) return;
      const split = new SplitText(el, { type: "words, chars" });
      splitInstances.push(split);

      gsap.from(split.chars, {
        y: "25%",
        rotation: 5,
        opacity: 0,
        stagger: { each: 0.01, total: 0.5, ease: "power1.in" },
        delay: 0.5,
        duration: 1,
        ease: "back.out(2)"
      });
    } catch(e) {
      console.error("SCROLL-REVEAL: header animation error", e, el);
    }
  });

  // Paragraphs
  gsap.utils.toArray('[data-reveal-content="paragraph"]', container).forEach(el => {
    console.log("SCROLL-REVEAL: paragraph", el);
    try {
      if (!el || !el.textContent.trim()) return;
      const split = new SplitText(el, { type: "lines" });
      splitInstances.push(split);

      gsap.from(split.lines, {
        y: "25%",
        opacity: 0,
        stagger: { each: 0.05, total: 0.5, ease: "power1.in" },
        duration: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "top 70%",
          toggleActions: "none play none none"
        }
      });
    } catch(e) {
      console.error("SCROLL-REVEAL: paragraph animation error", e, el);
    }
  });

  // Lists
  gsap.utils.toArray('[data-reveal-content="list"]', container).forEach(el => {
    console.log("SCROLL-REVEAL: list", el);
    try {
      if (!el) return;
      gsap.from(el, {
        y: "25%",
        opacity: 0,
        duration: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom bottom",
          toggleActions: "play none none none",
          once: true
        }
      });
    } catch(e) {
      console.error("SCROLL-REVEAL: list animation error", e, el);
    }
  });

  // Images
  gsap.utils.toArray('[data-reveal-content="image"]', container).forEach(el => {
    console.log("SCROLL-REVEAL: image", el);
    try {
      if (!el) return;
      gsap.from(el, {
        y: "10%",
        opacity: 0,
        duration: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "top 70%",
          toggleActions: "none play none none"
        }
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
    } catch(e) {
      console.error("SCROLL-REVEAL: image animation error", e, el);
    }
  });
}

export function killScrollReveal() {
  console.log("SCROLL-REVEAL: killScrollReveal");
  splitInstances.forEach(s => s.revert());
  splitInstances = [];
  ScrollTrigger.getAll().forEach(st => st.kill());
}
