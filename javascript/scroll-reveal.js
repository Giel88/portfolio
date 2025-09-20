// scroll-reveal.js (safe + tracked)
gsap.registerPlugin(SplitText, ScrollTrigger);

let splitInstances = [];
let createdTriggers = [];

export function scrollReveal(container = document) {
  console.log("SCROLL-REVEAL: init", container);

  // Headers (page-load)
  gsap.utils.toArray('[data-reveal-content="header"]', container).forEach(el => {
    if (!el || !el.textContent.trim()) return;
    try {
      const split = new SplitText(el, { type: "words, chars" });
      splitInstances.push(split);
      const anim = gsap.from(split.chars, {
        y: "25%",
        rotation: 5,
        opacity: 0,
        stagger: { each: 0.01, total: 0.5, ease: "power1.in" },
        delay: 0.5,
        duration: 1,
        ease: "back.out(2)"
      });
      // no ScrollTrigger here (page load)
      createdTriggers.push(anim);
    } catch (e) {
      console.error("SCROLL-REVEAL: header error", e, el);
    }
  });

  // Paragraphs (scroll triggered)
  gsap.utils.toArray('[data-reveal-content="paragraph"]', container).forEach(el => {
    if (!el || !el.textContent.trim()) return;
    try {
      const split = new SplitText(el, { type: "lines" });
      splitInstances.push(split);
      const anim = gsap.from(split.lines, {
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
      // collect the trigger object
      createdTriggers.push(anim.scrollTrigger || null);
    } catch (e) {
      console.error("SCROLL-REVEAL: paragraph error", e, el);
    }
  });

  // Lists
  gsap.utils.toArray('[data-reveal-content="list"]', container).forEach(el => {
    if (!el) return;
    try {
      const anim = gsap.from(el, {
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
      createdTriggers.push(anim.scrollTrigger || null);
    } catch (e) {
      console.error("SCROLL-REVEAL: list error", e, el);
    }
  });

  // Images
  gsap.utils.toArray('[data-reveal-content="image"]', container).forEach(el => {
    if (!el) return;
    try {
      const anim = gsap.from(el, {
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
      createdTriggers.push(anim.scrollTrigger || null);

      const portraitImg = el.querySelector(".portrait-pic");
      if (portraitImg) {
        const pAnim = gsap.from(portraitImg, {
          y: "-10%",
          ease: "none",
          scrollTrigger: {
            trigger: portraitImg,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
        createdTriggers.push(pAnim.scrollTrigger || null);
      }
    } catch (e) {
      console.error("SCROLL-REVEAL: image error", e, el);
    }
  });
}

export function killScrollReveal() {
  console.log("SCROLL-REVEAL: kill – triggers:", createdTriggers.length, "splits:", splitInstances.length);
  // revert SplitText instances
  splitInstances.forEach(s => { try { s.revert(); } catch(e){ /* ignore */ } });
  splitInstances = [];

  // kill only triggers we created (defensive)
  createdTriggers.forEach(st => {
    if (st && st.kill) {
      try { st.kill(); } catch (e) { /* ignore */ }
    }
  });
  createdTriggers = [];

  // small safety: don't call ScrollTrigger.getAll().forEach(...), avoid killing external triggers
}
