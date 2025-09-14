barba.init({
  transitions: [{
    name: 'test-leave',

    // Eerste keer laden
    once({ next }) {
      console.log("once triggered!");
      gsap.set(next.container, { opacity: 0 });
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
      return gsap.to(current.container, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    },

    // Nieuwe pagina binnenkomen
    enter({ next }) {
      console.log("enter triggered!");
      return new Promise(resolve => {
        if (window.Webflow && Webflow.ready) {
          Webflow.ready(() => {
            gsap.fromTo(next.container, 
              { opacity: 0 },
              { opacity: 1, duration: 1, ease: "power2.out", onComplete: resolve }
            );
          });
        } else {
          gsap.fromTo(next.container, 
            { opacity: 0 },
            { opacity: 1, duration: 1, ease: "power2.out", onComplete: resolve }
          );
        }
      });
    },

    // Na enter animatie
    afterEnter({ next }) {
      console.log("afterEnter triggered");

      // Scroll naar boven fix
      window.scrollTo({ top: 0, behavior: "instant" });

      // Herinitialiseer Webflow IX2 interacties
      if (window.Webflow && window.Webflow.destroy && window.Webflow.ready) {
        Webflow.destroy(); 
        Webflow.ready();
      }
    }
  }]
});
