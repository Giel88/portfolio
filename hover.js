function initHoverAnimations(container = document) {
  if (window.matchMedia("(min-width: 992px)").matches) {
  
    // CASE LIST
    container.querySelectorAll('.case-link').forEach(link => {
      const title = link.querySelector('.linktitle');
      if (!title) return;
    
      // hover in
      link.addEventListener('mouseenter', () => {
        if (window.isTransitioning) return; //        
        gsap.to(title, { 
          x: 20,
          //letterSpacing: "0.1em",
          duration: 0.5,
          ease: "back.out(2)",
          overwrite: "auto"
        });
      });
    
      // hover out
      link.addEventListener('mouseleave', () => {
        gsap.to(title, { 
          x: 0,
          letterSpacing: "0em",        
          duration: 0.3,
          ease: "bounce.out",
          overwrite: "auto"
        });
      });
    });
    
    // BUTTON
    container.querySelectorAll('.button').forEach(btn => {
      const title = btn.querySelector('.linktitle');
      if (!title) return;
    
      // hover in
      btn.addEventListener('mouseenter', () => {
        if (window.isTransitioning) return; //        
        gsap.to(title, { 
          x: 20,
          //letterSpacing: "0.1em",         
          duration: 0.5,
          ease: "back.out(2)",
          overwrite: "auto"
        });
      });
    
      // hover out
      btn.addEventListener('mouseleave', () => {
        gsap.to(title, { 
          x: 0,
          letterSpacing: "0em",         
          duration: 0.3,
          ease: "bounce.out",
          overwrite: "auto"
        });
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initHoverAnimations();
});
