barba.init({
  transitions: [{
    name: 'test-leave',

    // Eerste keer laden
    once({ next }) {
      // Fade in container
      console.log("once triggered!");
      return gsap.to(next.container, {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
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
      return gsap.to(next.container, {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      });
    }
  }]
});
