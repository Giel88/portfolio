document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.querySelector('.page-overlay');
  const mainContainerSelector = '.main-container';
  const defaultColor = getComputedStyle(document.documentElement).getPropertyValue('--bg') || '#000000';

  // Zet overlay op 100% opacity en force GPU compositing voor smooth transitions
  overlay.style.opacity = '1';
  overlay.style.transform = 'translateZ(0)';

  // Smooth page load fade
  window.requestAnimationFrame(() => {
    const tl = gsap.timeline();
    const delay = window.innerWidth < 768 ? 0 : 0;
    tl.to(overlay, { opacity: 0, duration: 0.5, delay: delay, ease: 'power2.out' });
  });

  // Flag om dubbele navigaties te voorkomen
  let isNavigating = false;

  // Pak alle interne links
  const internalLinks = Array.from(document.querySelectorAll('a')).filter(link => link.hostname === window.location.hostname);

  internalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      if (isNavigating) return;
      isNavigating = true;

      // Reset custom cursor als functie bestaat
      if (window.resetToDot) window.resetToDot();

      // Kies overlay kleur: data-case-color → overlay data-default-color → CSS variabele → fallback
      const color = link.dataset.caseColor || overlay.dataset.defaultColor || defaultColor;
      const href = link.href;
      overlay.style.backgroundColor = color;

      // Fade animatie van main container + overlay
      const tl = gsap.timeline({
        onComplete: () => {
          window.location.href = href;
        }
      });

      tl.to(mainContainerSelector, { opacity: 0, duration: 0.5, overwrite: 'auto' }, 0)
        .to(overlay, { opacity: 1, duration: 0.5, overwrite: 'auto' }, 0);
    });
  });
});
