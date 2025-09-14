barba.init({
  transitions: [{
    name: 'fade-color-transition',

    // Eerste keer laden
    once({ next }) {
      console.log("once triggered!");
      const color = next.container.dataset.themeColor || "var(--bg)";

      // Achtergrondkleur instellen
      gsap.set("body", { backgroundColor: color });

      // Forceer opacity 0 en fade-in
      gsap.set(next.container, { opacity: 0 });
      return gsap.to(next.container, {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      });
    },

    // Pagina verlaten
    leave({ current, next }) {
      const nextColor = next.container.dataset.themeColor || "var(--bg)";
      console.log("leave triggered, next color:", nextColor);

      // Fade-out huidige container + background color tegelijk
      const tl = gsap.timeline();
      tl.to("body", { backgroundColor: nextColor, duration: 1, ease: "power2.out" }, 0);
      tl.to(current.container, { opacity: 0, duration: 1, ease: "power2.out" }, 0);
      return tl;
    },

    // Vóórdat nieuwe pagina binnenkomt
    beforeEnter({ next }) {
      console.log("beforeEnter triggered");

      // Forceer opacity 0 vóór tween
      next.container.style.opacity = '0';
    },

    // Nieuwe pagina binnenkomen
    enter({ next }) {
      console.log("enter triggered");

      // Dubbele requestAnimationFrame om zeker te zijn dat opacity 0 goed staat
      return new Promise(resolve => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            gsap.to(next.container, {
              opacity: 1,
              duration: 1,
              ease: "power2.out",
              onComplete: resolve
            });
          });
        });
      });
    },

    // Na enter animatie
    afterEnter({ next }) {
      console.log("afterEnter triggered");

      // Scroll naar boven
      window.scrollTo({ top: 0, behavior: "instant" });

      // Herinitialiseer Webflow IX2 interacties
      if (window.Webflow && window.Webflow.destroy && window.Webflow.ready) {
        window.Webflow.destroy(); // verwijdert oude bindings
        window.Webflow.ready();   // herbind de interacties
      }
    }
  }]
});
