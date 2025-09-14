barba.init({
  transitions: [
    {
      name: 'default',

      // Eerste keer laden
      once({ next }) {
        const color = next.container.dataset.themeColor || "var(--bg)";
        console.log('once', next, 'kleur:', color);

        gsap.set("body", { backgroundColor: color });
        return gsap.to(next.container, { autoAlpha: 1, duration: 0.5 });
      },

      // Oude container fade-out + achtergrondkleur animatie
      leave({ current, next }) {
        const nextColor = next && next.container
          ? next.container.dataset.themeColor || "var(--bg)"
          : "var(--bg)";

        console.log('leave', current, 'kleur van volgende:', nextColor);

        return gsap.to(current.container, {
          autoAlpha: 0,
          duration: 1,
          onUpdate: () => gsap.set("body", { backgroundColor: nextColor })
        });
      },

      // Scroll reset + fade-in nieuwe container
      enter({ next }) {
        console.log('enter', next);

        window.scrollTo(0, 0);

        if (next && next.container) {
          gsap.set(next.container, { autoAlpha: 0 });
          return gsap.to(next.container, { autoAlpha: 1, duration: 1 });
        }
      },

      // Webflow IX2 init na fade-in
      afterEnter({ next }) {
        console.log('afterEnter', next);

        if (next && next.container && window.Webflow && window.Webflow.require) {
          const ix2 = window.Webflow.require('ix2');
          ix2.init(next.container);
        }
      }
    }
  ]
});
