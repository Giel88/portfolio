document.addEventListener("DOMContentLoaded", () => {

  barba.init({
    transitions: [{
      name: 'fade-color-transition',

      // Eerste keer laden
      once({ next }) {
        const color = next.container.dataset.themeColor || "var(--bg)";

        // Achtergrond instellen
        gsap.set("body", { backgroundColor: color });

        // Fade in container
        return gsap.to(next.container, { opacity: 1, duration: 0.5 });
      },

      // Pagina verlaten
      leave({ current, next }) {
        const nextColor = next.container.dataset.themeColor || "var(--bg)";

        // Fade-out huidige container + achtergrond veranderen
        return gsap.to(current.container, {
          opacity: 0,
          duration: 0.5,
          onUpdate: () => gsap.set("body", { backgroundColor: nextColor })
        });
      },

      // Nieuwe pagina binnenkomen
      enter({ next }) {
        // Fade in nieuwe container
        return gsap.to(next.container, { opacity: 1, duration: 0.5 });
      }
    }]
  });

});
