gsap.registerPlugin();

// ------------------------------
// Persistent mouse tracking & smooth movement + dynamic 3D rotation
// ------------------------------
let mouse = { x: 0, y: 0 };
let pos = { x: 0, y: 0 };
let lastPos = { x: 0, y: 0 };
let currentHover = null;
const smoothing = 0.2;
const maxRotation = 15; // maximale rotatie in graden

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

    // Bereken snelheid van muisbeweging
    const dx = mouse.x - lastPos.x;
    const dy = mouse.y - lastPos.y;

    // Snelheidsafhankelijke rotatie
    const rotateY = gsap.utils.clamp(-maxRotation, maxRotation, dx * 0.5);
    const rotateX = gsap.utils.clamp(-maxRotation, maxRotation, -dy * 0.3);

    gsap.to(currentHover, {
      rotationY: rotateY,
      rotationX: rotateX,
      rotationZ: 0,
      duration: 0.2,
      ease: "power1.out",
      transformStyle: "preserve-3d"
    });

    // Update laatste positie
    lastPos.x = mouse.x;
    lastPos.y = mouse.y;
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

    // Init hover container
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
      rotationY: 0,
      rotationZ: 0,
      transformStyle: "preserve-3d"
    });

    item.onmouseenter = null;
    item.onmouseleave = null;

    // Hover enter
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

    // Hover leave
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
      gsap.to(hoverContainer, { 
        rotationX: 0, 
        rotationY: 0, 
        rotationZ: 0, 
        duration: 0.3, 
        ease: "power1.out", 
        transformStyle: "preserve-3d" 
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
  lastPos.x = mouse.x;
  lastPos.y = mouse.y;

  initCaseHover(document);
});
