function resetWebflow(data) {
  let parser = new DOMParser();
  let dom = parser.parseFromString(data.next.html, "text/html");
  let webflowPageId = $(dom).find("html").attr("data-wf-page");
  $("html").attr("data-wf-page", webflowPageId);
  window.Webflow && window.Webflow.destroy();
  window.Webflow && window.Webflow.ready();
  window.Webflow && window.Webflow.require("ix2").init();
  window.Webflow && window.Webflow.require("ix3").init();  
}

function autoplayVideos(container) {
  const videos = container.querySelectorAll('video[autoplay]');
  videos.forEach(video => {
    video.pause();
    video.currentTime = 0;
    video.muted = true; // nodig voor autoplay op de meeste browsers
    video.play().catch(e => console.log('Video autoplay blocked', e));
  });
}

barba.init({
  transitions: [
    {
      name: 'default',
      once(data) {
        const overlay = document.querySelector('.page-overlay');   
        gsap.to(overlay, { opacity: 0 });    
      },
      
      async leave(data) {
        if (window.resetToDot) window.resetToDot();
        await gsap.to(data.current.container, { autoAlpha: 0, duration: 1 });
      },

      beforeEnter(data) {
        //window.scrollTo(0, 0);      
      },

      enter(data) {
        let transitionData = data;
        data.next.container.classList.add("fixed");        
        gsap.set(data.next.container, { autoAlpha: 0 });
        gsap.to(data.next.container, { 
          autoAlpha: 1, 
          duration: 1, 
          onComplete: () => {
            window.scrollTo(0, 0);
            data.next.container.classList.remove("fixed");            
            resetWebflow(transitionData);            
      
            // Reset custom dot if available
            if (window.resetToDot) window.resetToDot();

          }
        });
      },

      afterEnter(data) {
        initHoverAnimations(data.next.container);
      
        // Kill oude triggers
        ScrollTrigger.getAll()
          .filter(trigger => trigger.trigger && data.current.container.contains(trigger.trigger))
          .forEach(trigger => trigger.kill());
      
        // Wacht tot de browser de nieuwe container volledig heeft gerenderd
        requestAnimationFrame(() => {
          // Init ScrollTrigger animaties
          scrollReveal(data.next.container);

          // Init autoplayVideos
          autoplayVideos(data.next.container);
      
          // Init horizontal loop
          const scrollContainer = data.next.container.querySelector(".scroll-container");
          if (scrollContainer) {
            // Extra delay om layout shifts te vermijden
            setTimeout(() => initScrollText(scrollContainer), 50);
          }
      
          // Refresh ScrollTrigger zodat alles op de juiste plek staat
          ScrollTrigger.refresh();
        });
      }
    }
  ]
});
