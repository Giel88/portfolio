barba.init({
  transitions: [{
    name: 'test-leave',

    // Eerste keer laden
    once({ next }) {
      console.log("once triggered!");
      gsap.set(next.container, { opacity: 0 });
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

    // Vóórdat nieuwe pagina binnenkomt
    beforeEnter({ next }) {
      console.log("beforeEnter triggered!");
      gsap.set(next.container, { opacity: 0 });
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
