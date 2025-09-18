gsap.registerPlugin();

// ------------------------------
// Persistent mouse tracking & smooth movement
// ------------------------------
let mouse = { x: 0, y: 0 };
let pos = { x: 0, y: 0 };
let currentHover = null;
const smoothing = 0.2;
const maxRotation = 5; // maximaal aantal graden rotatie

document.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX; 
  mouse.y = e.clientY;
});

gsap.ticker.add(() => {
  if (currentHover) {
    // Smooth follow
    pos.x += (mouse.x - pos.x) * smoothing;
    pos.y += (mouse.y - pos.y) * smoothing;
    gsap.set(currentHover, { x: pos.x, y: pos.y });

    // Bereken delta voor rotatie
    let dx = mouse.x - pos.x;
    let dy = mouse.y - pos.y;

    // Rotatie in graden gebaseerd op horizontale beweging
    let rotateY = gsap.utils.clamp(-maxRotation, maxRotation, dx / 10);
    let rotateX = gsap.utils.clamp(-maxRotation, maxRotation, -dy / 15); // optioneel ook verticale lean

    gsap.to(currentHover, {
      rotationY: rotateY,
      rotationX: rotateX,
      duration: 0.2,
      ease: "power1.out"
    });
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

    gsap.set(hoverContainer, { 
      opacity: 0, 
      scale: 0, 
      display: 'none', 
      x: pos.x, 
      y: pos.y, 
      xPercent: -50, 
      yPercent: -50,
      transformOrigin: "50% 50%",
      rotationX: 0,
      rotationY: 0
    });

    item.onmouseenter = null;
    item.onmouseleave = null;

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

      // Reset rotatie
      gsap.to(hoverContainer, { rotationX: 0, rotationY: 0, duration: 0.2, ease: "power1.out" });

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
