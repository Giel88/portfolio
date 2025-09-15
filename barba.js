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
          
          if (window.Webflow) {
            // Destroy oude bindings
            window.Webflow.destroy();
          
            // Re-init IX2 alleen op nieuwe container
            const ix2 = window.Webflow.require("ix2");
            if (ix2) {
              ix2.init(next.container);  // <- belangrijk, geef container mee
            }
          }
          
          // Autoplay video’s
          const videos = next.container.querySelectorAll('video[autoplay]');
          videos.forEach(video => {
            video.pause();
            video.currentTime = 0;
            video.muted = true;
            video.play().catch(e => console.log('Video autoplay blocked', e));
          });         
          
        }, 50); // 50ms is meestal voldoende
      },
    },
  ],
});
