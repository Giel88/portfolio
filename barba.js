barba.init({
  transitions: [
    {
      name: 'default',

      // Oude container fade-out
      async leave({ current }) {     
        console.log('leave', current);     
        if (window.resetToDot) window.resetToDot();        
        await gsap.to(current.container, { autoAlpha: 0, duration: 1 });
      },

      // Enter hook: scroll reset + achtergrondkleur fade
      enter({ next }) {
        const fallbackColor = getComputedStyle(document.body)
                              .getPropertyValue('--bg')
                              .trim();          
        const color = next.container.dataset.themeColor || fallbackColor;                
        console.log('enter', next, color);
        window.scrollTo(0, 0);       
        gsap.to("body", { backgroundColor: color, duration: 1 });
      },

      // AfterEnter: fade-in nieuwe container + Webflow IX2 init
      afterEnter({ next }) {
        console.log('afterEnter', next);

        // Forceer container onzichtbaar
        gsap.set(next.container, { autoAlpha: 0 });

        // Kleine timeout zodat browser DOM painted voordat animatie start
        setTimeout(() => {
          gsap.to(next.container, { autoAlpha: 1, duration: 1 });

          if (window.resetToDot) window.resetToDot();

          // Reinitialiseer Webflow interacties
          reinitialiseWebflow(next.container);
        }, 50); // 50ms is meestal voldoende
      },
    },
  ],
});
