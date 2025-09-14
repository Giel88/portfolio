barba.init({
  transitions: [{
    name: 'test-leave',

    once({ next }) {
      // Fade in container
      return gsap.to(next.container, { opacity: 1, duration: 1, ease: "power2.out" });
    },    
    
    leave({ current, next }) {
      console.log("leave triggered!");
      return new Promise(resolve => setTimeout(resolve, 500));
    },

    enter({ next }) {
      console.log("enter triggered!");
    }
  }]
});
