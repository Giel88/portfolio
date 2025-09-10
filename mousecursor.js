document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.querySelector('.custom-cursor');
  const icon = cursor.querySelector('.custom-cursor-icon');

  let lastX = 0;
  let lastY = 0;

  // GSAP quickSetter voor vloeiende position updates
  const setX = gsap.quickSetter(cursor, 'x', 'px');
  const setY = gsap.quickSetter(cursor, 'y', 'px');

  // Cursor volgen + stretch-effect
  document.addEventListener('mousemove', (e) => {
    const deltaX = e.clientX - lastX;
    const deltaY = e.clientY - lastY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Hoek van beweging
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    // Cursor volgen en stretchen
    gsap.to(cursor, { 
      duration: 0.15,
      x: e.clientX,
      y: e.clientY,
      width: 12 + distance * 0.5,      // stretch in bewegingsrichting
      height: 12 - Math.min(distance * 0.3, 8), // platter loodrecht
      rotation: angle,
      transformOrigin: 'center center',
      ease: 'power2.out'
    });

    lastX = e.clientX;
    lastY = e.clientY;
  });

  // Hover effect voor links
  document.querySelectorAll('a').forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(cursor, { duration: 0.3, width: 24, height: 24 }); // vergroot
      icon.style.display = 'block';
      icon.style.transform = el.dataset.iconHover === 'flipped' ? 'rotate(-90deg)' : 'rotate(0deg)';
    });
    el.addEventListener('mouseleave', () => {
      // Terug naar standaard 12px
      gsap.to(cursor, { duration: 0.3, width: 12, height: 12, rotation: 0 });
      icon.style.display = 'none';
    });
  });
});
