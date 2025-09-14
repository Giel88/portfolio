barba.init({
  transitions: [
    {
      name: 'color-fade',
      leave({ current, next }) {
        // fallback: gebruik kleur van current als next.trigger ontbreekt
        const newColor = next.trigger?.dataset.color || current.container.dataset.themeColor;

        return gsap.to("body", {
          backgroundColor: newColor,
          duration: 0.6,
          ease: "power2.inOut"
        });
      }
    }
  ]
});
