barba.init({
  transitions: [
    {
      name: 'default',

      // Eerste keer laden
      once({ next }) {
        //const color = next.container.dataset.bg || "var(--bg)";
        //gsap.set("body", { backgroundColor: color });
        return gsap.to(next.container, { autoAlpha: 1, duration: 0.5 });
      },

      // Oude container fade-out + achtergrondkleur animatie
      leave({ current, next }) {
        //const nextColor = next.container.dataset.bg || "var(--bg)";
        return gsap.to(current.container, {
          autoAlpha: 0,
          duration: 1,
          //onUpdate: () => gsap.set("body", { backgroundColor: nextColor })
        });
      },

      // Scroll reset bij nieuwe pagina
      enter({ next }) {
        window.scrollTo(0, 0);
        // Nieuwe container eerst onzichtbaar zetten
        gsap.set(next.container, { autoAlpha: 0 });
        return gsap.to(next.container, { autoAlpha: 1, duration: 1 });
      },

      // Webflow IX2 init na fade-in
      afterEnter({ next }) {
        if (window.Webflow && window.Webflow.require) {
          const ix2 = window.Webflow.require('ix2');
          ix2.init(next.container);
        }
      }
    }
  ]
});
