barba.init({
  transitions: [
    {
      name: 'debug',
      leave({ current, next }) {
        const color = current.container.dataset.themeColor;        
        console.log("Leave gestart", current, next);
        return gsap.to("body", { backgroundColor: color, duration: 1 });
      },
      enter({ next }) {
        console.log("Enter gestart", next);
      }
    }
  ]
});
