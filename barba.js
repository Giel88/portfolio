barba.init({
  transitions: [
    {
      name: 'color-fade',
      leave({ next }) {
        // pak de kleur direct van de link waarop geklikt is
        const newColor = next.trigger.dataset.color;

        return gsap.to("body", {
          backgroundColor: newColor,
          duration: 0.6,
          ease: "power2.inOut"
        });
      }
    }
  ]
});
