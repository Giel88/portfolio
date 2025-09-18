gsap.registerPlugin();

// ------------------------------
// Persistent mouse tracking & smooth movement
// ------------------------------
let mouse = { x: 0, y: 0 };
let pos = { x: 0, y: 0 };
let currentHover = null;
const smoothing = 0.2;

// Mousemove listener (blijft actief over paginaovergangen)
document.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX; 
  mouse.y = e.clientY;
});

// Smooth update loop
gsap.ticker.add(() => {
  if (currentHover) {
    pos.x += (mouse.x - pos.x) * smoothing;
    pos.y += (mouse.y - pos.y) * smoothing;
    gsap.set(currentHover, { x: pos.x, y: pos.y });
  }
});

// ------------------------------
// Hover function per container
// ------------------------------
function initCaseHover(container = document) {
  const caseItems = container.querySelectorAll('.case-item');

  caseItems.forEach(item => {
    const hoverContainer = item.querySelector('.case-hover-image-container');
    if (!hoverContainer) return;

    // Init hover container op huidige muispositie + centering via GSAP
    gsap.set(hoverContainer, { 
      opacity: 0, 
      scale: 0.9, 
      display: 'none', 
      x: pos.x, 
      y: pos.y, 
      xPercent: -50, 
      yPercent: -50,
      transformOrigin: "50% 50%" 
    });

    // Verwijder oude listeners (handig bij Barba page transitions)
    item.onmouseenter = null;
    item.onmouseleave = null;

    // Hover enter (verschijnen animatie)
    item.addEventListener('mouseenter', () => {
      currentHover = hoverContainer;
      pos.x = mouse.x;
      pos.y = mouse.y;

      gsap.set(hoverContainer, { display: 'flex' });

      gsap.to(hoverContainer, {
        scale: 1,
        duration: 0.2,
        ease: "back.out(1.7)"
      });

      gsap.to(hoverContainer, {
        opacity: 1,
        duration: 0.2,
        ease: "power1.out"
      });
    });

    // Hover leave (verdwijnen animatie)
    item.addEventListener('mouseleave', () => {
      gsap.to(hoverContainer, {
        scale: 0.9,
        duration: 0.1,
        ease: "power1.in"
      });

      gsap.to(hoverContainer, {
        opacity: 0,
        duration: 0.1,
        ease: "power1.in",
        onComplete: () => gsap.set(hoverContainer, { display: 'none' })
      });

      currentHover = null;
    });
  });
}

// ------------------------------
// Init hover bij eerste page load (harde refresh)
// ------------------------------
document.addEventListener('DOMContentLoaded', () => {
  pos.x = mouse.x;
  pos.y = mouse.y;

  initCaseHover(document);
});
