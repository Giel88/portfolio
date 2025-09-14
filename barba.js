barba.init({
    transitions: [{
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
            gsap.set(data.next.container, { opacity: 0 });
            if (window.Webflow && window.Webflow.require) {
                const ix2 = window.Webflow.require('ix2');
                ix2.init(data.next.container);
                }            
            },  
            
        async afterEnter(data) {
            console.log('afterEnter');
            console.log(data);      
            await gsap.to(data.next.container, { opacity: 1, duration: 1 });                 
            },                      
        }
    ]
});
