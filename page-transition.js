document.addEventListener('DOMContentLoaded', function() {
  const overlay = document.querySelector('.page-overlay'); // overlay in Webflow
  const mainContainerSelector = '.main-container';
  const defaultColor = getComputedStyle(document.documentElement).getPropertyValue('--bg') || '#000000';

  // Overlay staat standaard op 100% opacity in Webflow
  // Page load fade-out overlay
  gsap.fromTo(
    overlay,
    { opacity: 1 },
    { opacity: 0, duration: 0.5, delay: 0.05 }
  );

  // Flag om dubbele navigaties te voorkomen
  let isNavigating = false;

  // Pak alle interne links
  const internalLinks = Array.from(document.querySelectorAll('a')).filter(link => link.hostname === window.location.hostname);

  internalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      if (isNavigating) return; // voorkom meerdere klikken
      isNavigating = true;
      
      if (window.resetToDot) window.resetToDot();

      // Kleur: data-case-color → overlay data-default-color → CSS variabele → fallback
      const color = link.dataset.caseColor || overlay.dataset.defaultColor || defaultColor;
      const href = link.href;

      overlay.style.backgroundColor = color;

      const tl = gsap.timeline({
        onComplete: () => {
          window.location.href = href;
        }
      });

      tl.to(mainContainerSelector, { opacity: 0, duration: 0.5 }, 0)
        .to(overlay, { opacity: 1, duration: 0.5 }, 0);
    });
  });
});
