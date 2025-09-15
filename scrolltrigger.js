function scrollReveal() {
  const paragraphs = document.querySelectorAll('[data-reveal-content="paragraph"]');
  paragraphs.forEach(paragraph => {
    const split = new SplitText(paragraph, { type: "lines" });

    // Normale ScrollTrigger
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

    // Fallback voor paragrafen onderaan de pagina
    if (paragraph.getBoundingClientRect().top + paragraph.offsetHeight > document.documentElement.scrollHeight - window.innerHeight) {
      gsap.from(split.lines, {
        y: "25%",
        opacity: 0,
        stagger: { each: 0.05, total: 0.5, ease: "power1.in" },
        duration: 1,
        ease: "power1.out"
      });
    }
  });

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
      ease: "power1.out",
      scrollTrigger: {
        trigger: image,
        start: "top bottom",
        end: "top 70%",
        toggleActions: "none play none none"
      }
    });

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
