barba.init({
  transitions: [{
    name: 'test-leave',

    leave({ current }) {
      console.log("leave triggered!");
      return gsap.to(current.container, {
        opacity: 0,
        duration: 0.5
      });
    },
    
    enter({ next }) {
      console.log("enter triggered!");      
      return gsap.fromTo(next.container, 
        { opacity: 0 },
        { opacity: 1, duration: 1 }
      );
    },
    
  }]
});
