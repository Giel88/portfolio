document.addEventListener('DOMContentLoaded', function() {
  // pak alle interne links
  const internalLinks = Array.from(document.querySelectorAll('a')).filter(link => link.hostname === window.location.hostname);
  
  const overlay = document.querySelector('.page-overlay'); // je overlay div in Webflow
  const mainContainerSelector = '.main-container'; // pas aan als nodig

  // default kleur uit CSS variabele --bg
  const defaultColor = getComputedStyle(document.documentElement).getPropertyValue('--bg') || '#000000';

  internalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      // kies kleur: eerst data-case-color, dan overlay fallback, dan CSS variabele
      const color = link.dataset.caseColor || overlay.dataset.defaultColor || defaultColor;
      const href = link.href;

      overlay.style.backgroundColor = color;

      // GSAP animatie
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
