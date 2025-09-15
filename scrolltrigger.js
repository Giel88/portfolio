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
      stagger: { each: 0.01, total: 0.5, ease: "power1.in" },
      delay: 0.5,
      duration: 1,
      ease: "back.out(2)"
    });
  });
});

window.addEventListener('load', () => {

  // Paragraphs
  const paragraphs = document.querySelectorAll('[data-reveal-content="paragraph"]');
  paragraphs.forEach(paragraph => {
    const split = new SplitText(paragraph, { type: "lines" });

    gsap.from(split.lines, {
      y: "25%",
      opacity: 0,
      stagger: { each: 0.05, total: 0.5, ease: "power1.in" },
      duration: 1,
      ease: "power1.out",
      scrollTrigger: {
        trigger: paragraph,
        start: "top 70%",
        end: "top bottom",
        toggleActions: "play play none none",
        once: true,
        markers: true  // <-- dit toont de markers          
      }
    });
  });

  // Lists
  const lists = document.querySelectorAll('[data-reveal-content="list"]');
  lists.forEach(list => {
    gsap.from(list, {
      y: "25%",
      opacity: 0,
      duration: 1,
      ease: "power1.out",
      scrollTrigger: {
        trigger: list,
        start: "top bottom",
        end: "top 90%",
        toggleActions: "none play none none",
        once: true
      }
    });
  });

  // Images
  const images = document.querySelectorAll('[data-reveal-content="image"]');
  images.forEach(image => {
    // Fade-in blok
    gsap.from(image, {
      y: "10%",
      opacity: 0,
      duration: 1,
      ease: "power1.out",
      scrollTrigger: {
        trigger: image,
        start: "top bottom",
        end: "top 70%",
        toggleActions: "none play none none",
        once: true
      }
    });

    // Portrait scroll effect
    const portraitImg = image.querySelector(".portrait-pic");
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
});
