barba.init({
    transitions: [
      {
        name: 'default',
        async leave(data) {
          console.log('leave');
          console.log(data);
          await gsap.to(data.current.container, { opacity: 0, duration: 1 });
        },
        async enter(data) {
          console.log('enter');
          console.log(data);
          window.scrollTo(0, 0);            
        },     
        async afterEnter(data) {
          console.log('afterEnter');
          console.log(data);
          window.scrollTo(0, 0);  
          await gsap.to(data.next.container, { opacity: 0, duration: 4 });            
        },                      
      }
      ]
});
