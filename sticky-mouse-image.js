gsap.registerPlugin();

// ------------------------------
// Config
// ------------------------------
const smoothing = 0.2;        // snelheid van volgen
const maxRotation = 15;       // maximale rotatie in graden

// ------------------------------
// Persistent mouse tracking & smooth movement
// ------------------------------
let mouse = { x: 0, y: 0 };
let pos = { x: 0, y: 0 };
let lastPos = { x: 0, y: 0 };
let currentHover = null;

document.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Smooth follow + 2D rotation
gsap.ticker.add(() => {
  if (currentHover) {
    // Smooth volgen
    pos.x += (mouse.x - pos.x) * smoothing;
    pos.y += (mouse.y - pos.y) * smoothing;
    gsap.set(currentHover, { x: pos.x, y: pos.y });

    // Horizontale muisbeweging
    const dx = mouse.x - lastPos.x;

    // Rotatie op basis van beweging
    const rotation = gsap.utils.clamp(-maxRotation, maxRotation, dx * 2);

    gsap.to(currentHover, {
      rotation: rotation,
      duration: 0.2,
      ease: "power1.out"
    });

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
      rotation: 0
    });

    // Verwijder oude listeners bij Barba page transitions
    item.onmouseenter = null;
    item.onmouseleave = null;

    // Hover enter
    item.addEventListener('mouseenter', () => {
      // Kill oude animaties van dit hoverContainer
      gsap.killTweensOf(hoverContainer);

      currentHover = hoverContainer;
      pos.x = mouse.x;
      pos.y = mouse.y;

      gsap.set(hoverContainer, { display: 'flex' });

      // Verschijnen animaties
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
      // Kill oude animaties
      gsap.killTweensOf(hoverContainer);

      // Verdwijnen animaties
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
        rotation: 0,
        duration: 0.3,
        ease: "power1.out"
      });

      currentHover = null;
    });
  });
}

// ------------------------------
// Init hover bij eerste page load
// ------------------------------
document.addEventListener('DOMContentLoaded', () => {
  pos.x = mouse.x;
  pos.y = mouse.y;
  lastPos.x = mouse.x;
  lastPos.y = mouse.y;

  initCaseHover(document);
});
