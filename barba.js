function resetWebflow(data) {
  let parser = new DOMParser();
  let dom = parser.parseFromString(data.next.html, "text/html");
  let webflowPageId = $(dom).find("html").attr("data-wf-page");
  $("html").attr("data-wf-page", webflowPageId);
  window.Webflow && window.Webflow.destroy();
  window.Webflow && window.Webflow.ready();
  window.Webflow && window.Webflow.require("ix2").init();
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
        window.scrollTo(0, 0);      
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
      
            // Autoplay video's
            const videos = data.next.container.querySelectorAll('video[autoplay]');
            videos.forEach(video => {
              video.pause();
              video.currentTime = 0;
              video.muted = true;
              video.play().catch(e => console.log('Video autoplay blocked', e));
            });
          }
        });
      },

      afterEnter(data) {
        initHoverAnimations(data.next.container); 
        
        // Kill oude triggers
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
        // Init nieuwe triggers voor de nieuwe pagina
        initScrollReveal(data.next.container);       
      
        // Refresh voor veiligheid
        ScrollTrigger.refresh();
      }
    }
  ]
});
