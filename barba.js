barba.init({
  transitions: [
    {
      name: 'default',

      // Oude container fade-out
      async leave({ current, next }) {
        console.log('leave', current);     
        await gsap.to(current.container, { autoAlpha: 0, duration: 1 });
      },

      // Enter hook: scroll reset
      enter({ next }) {
        console.log('enter', next);
        const color = next.container.dataset.themeColor || "#FFFFFF";
      
        // scroll reset eerst
        window.scrollTo(0, 0);
      
        // kleur fade
        return gsap.to("body", {
          backgroundColor: color,
          duration: 0.6
        });
      }

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
