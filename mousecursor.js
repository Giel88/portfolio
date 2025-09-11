document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.querySelector('.custom-cursor');
  const icon = cursor.querySelector('.custom-cursor-icon');

  const setX = gsap.quickSetter(cursor, 'x', 'px');
  const setY = gsap.quickSetter(cursor, 'y', 'px');

  let mouseInside = true;

  // Cursor volgt de muis
  document.addEventListener('mousemove', (e) => {
    setX(e.clientX);
    setY(e.clientY);

    if (mouseInside) {
      const hoveredLink = document.querySelector('a:hover');
      if (!hoveredLink) resetCursor();
    }
  });

  // Reset cursor naar default
  function resetCursor() {
    gsap.to(cursor, { 
      duration: 0.15, 
      ease: "back.in(1)",
      width: 12, 
      height: 12, 
      rotation: 0,
      opacity: 1 
    });

    // Icon animeren uit
    gsap.to(icon, { 
      duration: 0.2,
      opacity: 0,
      scale: 0.6,
      ease: "back.in(2)",
      onComplete: () => {
        icon.style.pointerEvents = "none"; // optioneel
      }
    });
  }

  // Hover effect voor links
  document.querySelectorAll('a').forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(cursor, { 
        duration: 0.3, 
        ease: "back.out(3)",        
        width: 80, 
        height: 80, 
        opacity: 1 
      });

      // Icon animeren in
      gsap.fromTo(icon, 
        { opacity: 0, scale: 0.6 }, 
        { duration: 0.3, opacity: 1, scale: 1, ease: "back.out(2)" }
      );

      icon.style.transform = el.dataset.iconHover === 'flipped' 
        ? 'rotate(-90deg)' 
        : 'rotate(0deg)';
    });
    el.addEventListener('mouseleave', resetCursor);
  });

  // Cursor tonen/verbergen bij in/uit venster
  document.addEventListener('mouseenter', () => {
    mouseInside = true;
    gsap.to(cursor, { duration: 0.2, opacity: 1 });
  });

  document.addEventListener('mouseleave', () => {
    mouseInside = false;
    gsap.to(cursor, { duration: 0.2, opacity: 0 });
  });

  // Initialize
  gsap.set(icon, { opacity: 0, scale: 0.6 }); // start verborgen
  resetCursor();
});
