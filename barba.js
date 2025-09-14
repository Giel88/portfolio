barba.init({
  transitions: [
    {
      name: 'default',

      // Oude container fade-out
      async leave({ current }) {
        console.log('leave', current);
        await gsap.to(current.container, { opacity: 0, duration: 1 });
      },

      // Enter hook: scroll reset
      enter({ next }) {
        console.log('enter', next);
        window.scrollTo(0, 0);
      },

      // AfterEnter: nieuwe container fade-in + Webflow IX2 init
      async afterEnter({ next }) {
        console.log('afterEnter', next);

        // Fade-in van 0 → 1, altijd vloeiend
        await gsap.fromTo(
          next.container,
          { opacity: 0 },
          { opacity: 1, duration: 1, delay: 2 }
        );

        // Webflow IX2 reset na fade-in
        if (window.Webflow && window.Webflow.require) {
          const ix2 = window.Webflow.require('ix2');
          ix2.init(next.container);
        }
      },
    },
  ],
});
