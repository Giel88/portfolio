gsap.registerPlugin(ScrollTrigger);

export function scrollReveal(container = document) {
  // ===============================
  // Headers (pageload animatie)
  // ===============================
  gsap.utils.toArray('[data-reveal-content="header"]', container).forEach(el => {
    if (!el || !el.textContent.trim()) return;
    const chars = el.textContent.split("").map(c => `<span>${c}</span>`).join("");
    el.innerHTML = chars;

    gsap.from(el.querySelectorAll("span"), {
      y: "25%",
      rotation: 5,
      opacity: 0,
      stagger: 0.01,
      delay: 0.5,
      duration: 1,
      ease: "back.out(2)"
    });
  });

  // ===============================
  // Paragraphs
  // ===============================
  gsap.utils.toArray('[data-reveal-content="paragraph"]', container).forEach(el => {
    if (!el || !el.textContent.trim()) return;
    const lines = el.textContent.split("\n").map(l => `<span>${l}</span>`).join("");
    el.innerHTML = lines;

    gsap.from(el.querySelectorAll("span"), {
      y: "25%",
      opacity: 0,
      stagger: 0.05,
      duration: 1,
      ease: "power1.out",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "top 70%",
        toggleActions: "play none none none"
      }
    });
  });

  // ===============================
  // Lists
  // ===============================
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

  // ===============================
  // Images
  // ===============================
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
        toggleActions: "play none none none"
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
