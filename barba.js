document.addEventListener("DOMContentLoaded", () => {
  barba.init({
    transitions: [
      {
        name: 'default',

        // Eerste keer laden
        once({ next }) {
          const color = next.container.dataset.themeColor || "var(--bg)";

          // Achtergrond instellen
          gsap.set("body", { backgroundColor: color });

          // Fade in container
          return gsap.to(next.container, { autoAlpha: 1, duration: 0.5 });
        },

        // Oude container fade-out + achtergrondkleur animatie
        leave({ current, next }) {
          const nextColor = next.container.dataset.themeColor || "var(--bg)";
          
          return gsap.to(current.container, {
            autoAlpha: 0,
            duration: 1,
            onUpdate: () => gsap.set("body", { backgroundColor: nextColor }),
          });
        },

        // Scroll reset + fade-in nieuwe container
        enter({ next }) {
          window.scrollTo(0, 0);

          // Nieuwe container eerst onzichtbaar
          gsap.set(next.container, { autoAlpha: 0 });

          // Fade in nieuwe container
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
});
