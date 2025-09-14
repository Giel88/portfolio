barba.init({
  transitions: [{
    name: 'fade-color-transition',

    // Eerste keer laden
    once({ next }) {
      const color = next.container.dataset.themeColor || "var(--bg)";
      console.log("once → init page load");

      // Achtergrond instellen
      gsap.set("body", { backgroundColor: color });

      // Fade in container
      return gsap.to(next.container, { opacity: 1, duration: 1 });
    },

    // Pagina verlaten
    leave({ current, next }) {
      const nextColor = next.container.dataset.themeColor || "var(--bg)";
      console.log("leave → start fade-out");

      // Eerst fade-out + bg veranderen
      return gsap.to(current.container, {
        opacity: 0,
        duration: 1,
        onUpdate: () => gsap.set("body", { backgroundColor: nextColor })
      }).then(() => {
        console.log("leave → finished fade-out, waiting extra 0.5s");
        // Daarna nog 0.5s wachten voordat enter mag starten
        return new Promise(resolve => setTimeout(resolve, 500));
      });
    },

    // Nieuwe pagina binnenkomen
    enter({ next }) {
      console.log("enter → start fade-in new content");
      return gsap.to(next.container, { opacity: 1, duration: 1 });
    }
  }]
});
