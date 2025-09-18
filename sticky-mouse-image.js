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
  mouse.x = e.clientX; // offset van de muis
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
      scale: 0, 
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

    // Hover enter
    item.addEventListener('mouseenter', () => {
      currentHover = hoverContainer;
      pos.x = mouse.x;
      pos.y = mouse.y;

      gsap.set(hoverContainer, { display: 'flex' });
      gsap.to(hoverContainer, { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" });
    });

    // Hover leave
    item.addEventListener('mouseleave', () => {
      gsap.to(hoverContainer, {
        opacity: 0,
        scale: 0,
        duration: 0.3,
        ease: "power3.in",
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
  // Stel pos gelijk aan huidige muispositie
  pos.x = mouse.x;
  pos.y = mouse.y;

  // Init hover voor de eerste pagina
  initCaseHover(document);
});
