  barba.init({
    transitions: [{
      name: 'test-leave',
      
      // Pagina verlaten
      leave({ current, next }) {
        console.log("leave triggered!");
        // Return een dummy promise zodat Barba wacht
        return new Promise(resolve => {
          setTimeout(resolve, 500); // halve seconde wachten
        });
      },

      // Nieuwe pagina binnenkomen
      enter({ next }) {
        console.log("enter triggered!");
      }
    }]
  });
