function resetWebflow(data) {
  if (!data || !data.next || !data.next.html) return;

  let parser = new DOMParser();
  let dom = parser.parseFromString(data.next.html, "text/html");
  let webflowPageId = $(dom).find("html").attr("data-wf-page");
  $("html").attr("data-wf-page", webflowPageId);

  if (window.Webflow) {
    window.Webflow.destroy();
    window.Webflow.ready();
    window.Webflow.require("ix2").init();
  }
}

let transitionData = null; // globale opslag van transition data

barba.init({
  transitions: [
    {
      name: 'default',

      once({ current }) {
        const overlay = document.querySelector('.page-overlay');
        gsap.to(overlay, { opacity: 0 });
      }
      
      async leave({ current, next }) {
        // Sla de data op zodat we die in afterEnter kunnen gebruiken
        transitionData = next;

        // fade out current container
        if (window.resetToDot) window.resetToDot();
        await gsap.to(current.container, { autoAlpha: 0, duration: 1 });
      },

      enter({ next }) {
        // Alleen console log en scroll
        console.log('enter', next);
        window.scrollTo(0, 0);
      },

      afterEnter({ next }) {
        // fade in next container
        gsap.set(next.container, { autoAlpha: 0 });
        gsap.to(next.container, { 
          autoAlpha: 1, 
          duration: 1, 
          onComplete: () => {
            // Reset Webflow met opgeslagen data
            resetWebflow(transitionData);

            // Reset custom dot if available
            if (window.resetToDot) window.resetToDot();

            // Autoplay video's
            const videos = next.container.querySelectorAll('video[autoplay]');
            videos.forEach(video => {
              video.pause();
              video.currentTime = 0;
              video.muted = true;
              video.play().catch(e => console.log('Video autoplay blocked', e));
            });
          }
        });
      }
    }
  ]
});
