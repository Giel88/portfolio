barba.init({
    transitions: [
      {
        name: 'default',
        leave(data) {
          console.log('leave');
          console.log(data);
          gsap.to(data.current.container, { opacity: 0 });
        },
        enter(data) {
          console.log('enter');
          console.log(data);
          window.scrollTo(0, 0);           
        },        
      }
      ]
});
