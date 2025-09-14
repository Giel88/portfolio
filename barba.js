barba.init({
  transitions: [{
    name: 'fade-color-transition',

    // Eerste keer laden
    once({ next }) {
      console.log("once triggered!");
      const color = next.container.dataset.themeColor || "var(--bg)";

      // Achtergrond instellen
      gsap.set("body", { backgroundColor: color });

      // Container op invisible zetten
      gsap.set(next.container, { autoAlpha: 0 });

      // Fade-in container
      return gsap.to(next.container, {
        autoAlpha: 1,
        duration: 1,
        ease: "power2.out"
      });
    },

    // Pagina verlaten
    leave({ current, next }) {
      console.log("leave triggered!");
      const nextColor = next.container.dataset.themeColor || "var(--bg)";

      // Fade-out huidige container + achtergrond veranderen
      return gsap.to(current.container, {
        autoAlpha: 0,
        duration: 0.5,
        ease: "power2.out",
        onUpdate: () => gsap.set("body", { backgroundColor: nextColor })
      });
    },

    // Nieuwe pagina binnenkomen
    enter({ next }) {
      console.log("enter triggered!");

      // Container eerst invisible zetten
      gsap.set(next.container, { autoAlpha: 0 });

      // Wacht kort zodat Webflow CMS content geladen is
      return new Promise(resolve => {
        setTimeout(() => {
          gsap.to(next.container, {
            autoAlpha: 1,
            duration: 1,
            ease: "power2.out",
            onComplete: resolve
          });
        }, 100); // 100ms delay
      });
    },

    // Na enter animatie
    afterEnter({ next }) {
      console.log("afterEnter triggered");

      // Scroll naar boven fix
      window.scrollTo({ top: 0, behavior: "instant" });

      // Herinitialiseer Webflow IX2 interacties
      if (window.Webflow && window.Webflow.destroy && window.Webflow.ready) {
        window.Webflow.destroy(); // verwijdert oude bindings
        window.Webflow.ready();   // herbind de interacties
      }
    }
  }]
});
