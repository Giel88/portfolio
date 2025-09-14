console.log("Barba init geladen");

barba.init({
  transitions: [
    {
      name: 'color-only',
      leave({ next }) {
        const newColor = next.container.dataset.themeColor;

        // heel belangrijk: return de GSAP tween (die is een Promise voor Barba)
        return gsap.to("body", {
          backgroundColor: newColor,
          duration: 0.6,
          ease: "power2.inOut"
        });
      }
    }
  ]
});
