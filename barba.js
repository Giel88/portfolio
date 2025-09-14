
barba.init({
  transitions: [{
    name: 'fade-color-transition',

    once({ next }) {
      const color = next.dataset.themeColor || "#ffffff";
      gsap.set("body", { backgroundColor: color });
      return gsap.to(next, { opacity: 1, duration: 0.5 });
    },

    leave({ current, next }) {
      const nextColor = next.dataset.themeColor || "#ffffff";
      return gsap.to(current, {
        opacity: 0,
        duration: 0.5,
        onUpdate: () => gsap.set("body", { backgroundColor: nextColor })
      });
    },

    enter({ next }) {
      return gsap.to(next, { opacity: 1, duration: 0.5 });
    }
  }]
});
