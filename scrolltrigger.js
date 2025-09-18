gsap.registerPlugin(SplitText, ScrollTrigger);

//ScrollTrigger.defaults({ markers: true });

function scrollReveal(container = document) {
  // Headers (pageload animatie)
  gsap.utils.toArray('[data-reveal-content="header"]', container).forEach(heading => {
    if (!heading || !heading.textContent.trim()) return;
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

  // Paragraphs
  gsap.utils.toArray('[data-reveal-content="paragraph"]', container).forEach(paragraph => {
    if (!paragraph || !paragraph.textContent.trim()) return;
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
  gsap.utils.toArray('[data-reveal-content="list"]', container).forEach(list => {
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
  gsap.utils.toArray('[data-reveal-content="image"]', container).forEach(image => {
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

// Initial call
scrollReveal();
