barba.init({
  transitions: [
    {
      name: 'debug',
      leave({ current, next }) {
        console.log("Leave gestart", current, next);
        return gsap.to("body", { backgroundColor: "red", duration: 1 });
      },
      enter({ next }) {
        console.log("Enter gestart", next);
      }
    }
  ]
});
