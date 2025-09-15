gsap.registerPlugin(SplitText, ScrollTrigger);

// Headings op pageload
document.addEventListener("DOMContentLoaded", () => {
  const headings = document.querySelectorAll('[data-reveal-content="header"]');
  headings.forEach(heading => {
    const split = new SplitText(heading, { type: "words, chars" });
    gsap.from(split.chars, {
      y: "25%",
      rotation: 5,
      opacity: 0,
      stagger: { each: 0.01, total: 0.10, ease: "power1.in" },
      delay: 0.5,
      duration: 0.25,
      ease: "back.out(1.7)"
    });
  });
});

// Paragraphs, lists en images via scroll
function scrollReveal() {
  const paragraphs = document.querySelectorAll('[data-reveal-content="paragraph"]');
  paragraphs.forEach(paragraph => {
    const split = new SplitText(paragraph, { type: "lines" });
    gsap.from(split.lines, {
      y: "25%",
      opacity: 0,
      stagger: { each: 0.05, total: 0.5 },
      duration: 1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: paragraph,
        start: "top bottom",
        end: "top 70%",
        toggleActions: "none play none none"
      }
    });
  });

  const lists = document.querySelectorAll('[data-reveal-content="list"]');
  lists.forEach(list => {
    gsap.from(list, {
      y: "25%",
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: list,
        start: "top bottom",
        end: "bottom bottom",
        toggleActions: "play none none none",
        once: true
      }
    });
  });

  const images = document.querySelectorAll('[data-reveal-content="image"]');
  images.forEach(image => {
    gsap.from(image, {
      y: "10%",
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: image,
        start: "top bottom",
        end: "top 70%",
        toggleActions: "none play none none"
      }
    });
  });
}

scrollReveal();
