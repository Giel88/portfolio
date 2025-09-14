barba.init({
  transitions: [
    {
      name: 'default',

      // Oude container fade-out
      async leave({ current, next }) {
        const nextColor = next.container.dataset.bg || "var(--bg)";
        console.log('leave', current);
      
        // Beide animaties tegelijk uitvoeren
        await Promise.all([
          gsap.to(current.container, { autoAlpha: 0, duration: 1 }),
          gsap.to("body", { backgroundColor: nextColor, duration: 1, ease: "power2.out" })
        ]);
      },

      // Enter hook: scroll reset
      enter({ next }) {
        console.log('enter', next);
        window.scrollTo(0, 0);
      },

      // AfterEnter: nieuwe container fade-in + Webflow IX2 init
      afterEnter({ next }) {
        console.log('afterEnter', next);

        // Forceer container onzichtbaar
        gsap.set(next.container, { autoAlpha: 0 });

        // Kleine timeout zodat browser DOM painted voordat animatie start
        setTimeout(() => {
          gsap.to(next.container, { autoAlpha: 1, duration: 1 });

          // Webflow IX2 reset na fade
          if (window.Webflow && window.Webflow.require) {
            const ix2 = window.Webflow.require('ix2');
            ix2.init(next.container);
          }
        }, 50); // 50ms is meestal voldoende
      },
    },
  ],
});
