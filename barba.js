barba.init({
  transitions: [
    {
      name: 'default',

      once({ next }) {
        const color = next.container.dataset.themeColor || "var(--bg)";
        gsap.set("body", { backgroundColor: color });
        return gsap.to(next.container, { autoAlpha: 1, duration: 0.5 });
      },

      leave({ current, next }) {
        const nextColor = next.container.dataset.themeColor || "var(--bg)";
        console.log('leave', current, 'kleur:', nextColor);

        return gsap.to(current.container, {
          autoAlpha: 0,
          duration: 1,
          onUpdate: () => gsap.set("body", { backgroundColor: nextColor }),
        });
      },

      enter({ next }) {
        console.log('enter', next);
        window.scrollTo(0, 0);
        gsap.set(next.container, { autoAlpha: 0 });
        return gsap.to(next.container, { autoAlpha: 1, duration: 1 });
      },

      afterEnter({ next }) {
        console.log('afterEnter', next);
        if (window.Webflow && window.Webflow.require) {
          const ix2 = window.Webflow.require('ix2');
          ix2.init(next.container);
        }
      }
    }
  ]
});
