document.addEventListener("DOMContentLoaded", () => {

  barba.init({
    transitions: [{
      name: 'fade-color-transition',

      // Eerste keer laden
      once({ next }) {
        const color = next.dataset.themeColor || "#ffffff";

        // Achtergrond instellen
        gsap.set("body", { backgroundColor: color });

        // Fade in container
        return gsap.to(next, { opacity: 1, duration: 0.5 });
      },

      // Pagina verlaten
      leave({ current, next }) {
        const nextColor = next.dataset.themeColor || "#ffffff";

        // Fade-out huidige container + achtergrond veranderen
        return gsap.to(current, {
          opacity: 0,
          duration: 0.5,
          onUpdate: () => gsap.set("body", { backgroundColor: nextColor })
        });
      },

      // Nieuwe pagina binnenkomen
      enter({ next }) {
        return gsap.to(next, { opacity: 1, duration: 0.5 });
      }
    }]
  });

});
