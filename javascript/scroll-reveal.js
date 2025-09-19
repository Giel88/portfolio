gsap.registerPlugin(SplitText, ScrollTrigger);

let splitInstances = [];

export function scrollReveal(container = document) {
  console.log("SCROLL-REVEAL: initializing");

  // Headers
  gsap.utils.toArray('[data-reveal-content="header"]', container).forEach(el => {
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
  });

  // Paragraphs
  gsap.utils.toArray('[data-reveal-content="paragraph"]', container).forEach(el => {
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
  });

  // Lists
  gsap.utils.toArray('[data-reveal-content="list"]', container).forEach(el => {
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
  });

  // Images
  gsap.utils.toArray('[data-reveal-content="image"]', container).forEach(el => {
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
  });
}

export function killScrollReveal() {
  console.log("SCROLL-REVEAL: killing all");
  splitInstances.forEach(s => s.revert());
  splitInstances = [];
  ScrollTrigger.getAll().forEach(st => st.kill());
}
