barba.init({
  transitions: [
    {
      name: 'color-only',
      leave({ next }) {
        const newColor = next.container.dataset.themeColor;
        return gsap.to("body", {
          backgroundColor: newColor,
          duration: 1,
          ease: "power2.inOut"
        });
      }
    }
  ]
});
