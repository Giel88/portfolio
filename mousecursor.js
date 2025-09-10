document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.querySelector('.custom-cursor');
  const icon = cursor.querySelector('.custom-cursor-icon');

  const setX = gsap.quickSetter(cursor, 'x', 'px');
  const setY = gsap.quickSetter(cursor, 'y', 'px');

  // Cursor volgt de muis
  document.addEventListener('mousemove', (e) => {
    setX(e.clientX);
    setY(e.clientY);

    // Check of er een link hovered wordt, reset anders
    const hoveredLink = document.querySelector('a:hover');
    if (!hoveredLink) resetCursor();
  });

  // Reset cursor naar default
  function resetCursor() {
    gsap.to(cursor, { 
      duration: 0.3, 
      width: 12, 
      height: 12, 
      rotation: 0, 
      backgroundColor: 'var(--cursor)',
      opacity: 1 
    });
    icon.style.display = 'none';
  }

  // Hover effect voor links
  document.querySelectorAll('a').forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(cursor, { 
        duration: 0.3, 
        width: 80, 
        height: 80, 
        backgroundColor: 'var(--cursor-hover)',
        opacity: 1 
      });
      icon.style.display = 'block';
      icon.style.transform = el.dataset.iconHover === 'flipped' 
        ? 'rotate(-90deg)' 
        : 'rotate(0deg)';
    });
    el.addEventListener('mouseleave', resetCursor);
  });

  // Cursor tonen/verbergen bij in/uit venster
  document.addEventListener('mouseenter', () => {
    gsap.to(cursor, { duration: 0.2, opacity: 1 });
  });
  document.addEventListener('mouseleave', () => {
    gsap.to(cursor, { duration: 0.2, opacity: 0 });
  });

  // Initialize
  resetCursor();
});
