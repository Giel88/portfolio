barba.init({
    transitions: [
      {
        name: 'default',
        leave(data) {
          console.log('leave');
          console.log(data);
        },
        enter(data) {
          console.log('enter');
          console.log(data);
        },        
      }
      ]
});
