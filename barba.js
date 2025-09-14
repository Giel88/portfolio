barba.init({
  transitions: [{
    name: 'container-fade',

    // Eerste keer laden
    once({ next }) {
      console.log("once triggered!");
      // Start container op opacity 0
      gsap.set(next.container, { opacity: 0 });

      // Wacht tot Webflow klaar is, fade dan in
      return new Promise(resolve => {
        if (window.Webflow && Webflow.ready) {
          Webflow.ready(() => {
            gsap.to(next.container, {
              opacity: 1,
              duration: 1,
              ease: "power2.out",
              onComplete: resolve
            });
          });
        } else {
          gsap.to(next.container, {
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            onComplete: resolve
          });
        }
      });
    },

    // Pagina verlaten
    leave({ current }) {
      console.log("leave triggered!");
      // Fade-out huidige container
      return gsap.to(current.container, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    },

    // Nieuwe pagina binnenkomen
    enter({ next }) {
      console.log("enter triggered!");
      // Start opacity 0
      gsap.set(next.container, { opacity: 0 });

      // Wacht tot Webflow klaar is voordat je fade-in doet
      return new Promise(resolve => {
        if (window.Webflow && Webflow.ready) {
          Webflow.ready(() => {
            gsap.to(next.container, {
              opacity: 1,
              duration: 1,
              ease: "power2.out",
              onComplete: resolve
            });
          });
        } else {
          gsap.to(next.container, {
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            onComplete: resolve
          });
        }
      });
    },

    // Na enter animatie
    afterEnter({ next }) {
      console.log("afterEnter triggered");

      // Scroll naar boven
      window.scrollTo({ top: 0, behavior: "instant" });

      // Herinitialiseer Webflow IX2 interacties
      if (window.Webflow && window.Webflow.destroy && window.Webflow.ready) {
        Webflow.destroy();
        Webflow.ready();
      }
    }
  }]
});
