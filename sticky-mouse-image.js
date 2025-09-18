function initCaseHover(container = document) {
  gsap.registerPlugin();

  const caseItems = container.querySelectorAll('.case-item');
  let currentHover = null;
  let mouse = {x: 0, y: 0};
  let pos = {x: 0, y: 0};
  const smoothing = 0.2;

  // Mousemove listener
  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX + 20;
    mouse.y = e.clientY + 20;
  });

  // Smooth update loop
  gsap.ticker.add(() => {
    if (currentHover) {
      pos.x += (mouse.x - pos.x) * smoothing;
      pos.y += (mouse.y - pos.y) * smoothing;
      gsap.set(currentHover, {x: pos.x, y: pos.y});
    }
  });

  caseItems.forEach(item => {
    const hoverContainer = item.querySelector('.case-hover-image-container');

    gsap.set(hoverContainer, {opacity: 0, scale: 0, display: 'none', x: 0, y: 0});

    item.addEventListener('mouseenter', () => {
      currentHover = hoverContainer;
      pos.x = mouse.x;
      pos.y = mouse.y;

      gsap.set(hoverContainer, {display: 'flex'});
      gsap.to(hoverContainer, {opacity: 1, scale: 1, duration: 0.4, ease: "power3.out"});
    });

    item.addEventListener('mouseleave', () => {
      gsap.to(hoverContainer, {
        opacity: 0,
        scale: 0,
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => gsap.set(hoverContainer, {display: 'none'})
      });
      currentHover = null;
    });
  });
}
