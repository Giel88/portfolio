gsap.registerPlugin(SplitText, ScrollTrigger);

// Headings op pageload
document.addEventListener("DOMContentLoaded", () => {
  gsap.utils.toArray('[data-reveal-content="header"]').forEach(heading => {
    if (!heading || !heading.textContent.trim()) return; // skip lege headings
    const split = new SplitText(heading, { type: "words, chars" });

    gsap.from(split.chars, {
      y: "25%",
      rotation: 5,
      opacity: 0,
      stagger: { each: 0.01, total: 0.50, ease: "power1.in" },
      delay: 0.5,
      duration: 1,
      ease: "back.out(2)"
    });
  });
});

// ScrollReveal voor paragraphs, lists en images
function scrollReveal() {
  // Paragraphs
  gsap.utils.toArray('[data-reveal-content="paragraph"]').forEach(paragraph => {
    if (!paragraph || !paragraph.textContent.trim()) return; // skip lege blokken
    const split = new SplitText(paragraph, { type: "lines" });

    gsap.from(split.lines, {
      y: "25%",
      opacity: 0,
      stagger: { each: 0.05, total: 0.5, ease: "power1.in" },
      duration: 1,
      ease: "power1.out",
      scrollTrigger: {
        trigger: paragraph,
        start: "top bottom",
        end: "top 70%",
        toggleActions: "none play none none"
      }
    });
  });

  // Lists
  gsap.utils.toArray('[data-reveal-content="list"]').forEach(list => {
    if (!list) return;
    gsap.from(list, {
      y: "25%",
      opacity: 0,
      duration: 1,
      ease: "power1.out",
      scrollTrigger: {
        trigger: list,
        start: "top bottom",
        end: "bottom bottom",
        toggleActions: "play none none none",
        once: true
      }
    });
  });

  // Images
  gsap.utils.toArray('[data-reveal-content="image"]').forEach(image => {
    if (!image) return;

    // Basis fade-in
    gsap.from(image, {
      y: "10%",
      opacity: 0,
      duration: 1,
      ease: "power1.out",
      scrollTrigger: {
        trigger: image,
        start: "top bottom",
        end: "top 70%",
        toggleActions: "none play none none"
      }
    });

    // Portrait scroll effect (indien aanwezig)
    const portraitImg = image.querySelector(".portrait-pic");
    if (portraitImg) {
      gsap.from(portraitImg, {
        y: "10%",
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

// Call de functie
scrollReveal();

window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});
