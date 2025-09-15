gsap.registerPlugin(SplitText, ScrollTrigger);

function textAndParagraphReveal() {
  const headings = document.querySelectorAll('[data-reveal-content="heading"]');
  headings.forEach(heading => {
    const split = new SplitText(heading, { type: "chars" });
    gsap.from(split.chars, {
      y: "25%",
      rotation: 5,
      opacity: 0,
      stagger: { each: 0.05, total: 0.5 },
      delay: 0.5,
      duration: 1,
      ease: "back.out(1.7)"
    });
  });

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
        end: "top 90%",
        toggleActions: "none play none none"
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

window.addEventListener('load', () => {
  textAndParagraphReveal();
});
