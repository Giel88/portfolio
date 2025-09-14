document.addEventListener("DOMContentLoaded", () => {
  const background = document.querySelector(".background");

  // bij page load meteen achtergrond syncen
  const initialTheme = document.body.dataset.theme;
  if(initialTheme) {
    let color = initialTheme;
    if(color.startsWith('var(')) {
      color = getComputedStyle(document.body).getPropertyValue('--bg').trim();
    }
    background.style.backgroundColor = color;
  }

  const swup = new Swup({
    containers: ["#swup"],
    plugins: [new SwupJsPlugin({
      animations: [
        {
          name: 'theme-fade',
          from: '(.*)',
          to: '(.*)',

          // OUT = oude content fade-out + background kleur animatie tegelijk
          out: (done, data) => {
            const nextThemeVar = data?.visit?.to?.document?.body?.dataset?.theme || '#ffffff';
            let nextTheme = nextThemeVar;
            if(nextTheme.startsWith('var(')) {
              nextTheme = getComputedStyle(document.body).getPropertyValue('--bg').trim();
            }

            const tl = gsap.timeline({
              defaults: { duration: 0.6, ease: 'power1.out' },
              onComplete: done
            });

            tl.to("#swup", { opacity: 0 }, 0)
              .to(background, { backgroundColor: nextTheme }, 0);
          },

          // IN = nieuwe content fade-in
          in: (done) => {
            gsap.fromTo("#swup", { opacity: 0 }, { opacity: 1, duration: 0.6, onComplete: done });
          }
        }
      ]
    })]
  });

  // herinitialiseer scripts/interactions na nieuwe content
  swup.hooks.on('page:view', () => {
    if(window.initMyComponents) window.initMyComponents();
  });
});
