document.addEventListener("DOMContentLoaded", function(){

    var loading = new TimelineMax();
    loading.fromTo(".header",{
        opacity: 0,
        autoAlpha: 0,
        y: -20
    },{
        opacity: 1,
        autoAlpha: 1, 
        duration: 0.2,
        y: 0
    },"0.35")
    .fromTo(".home h2",{
        autoAlpha: 0,
        y: 20
    },{
        autoAlpha: 1, 
        duration: 0.5,
        y: 0
    }, "0.35")
    .fromTo(".home p",{
        autoAlpha: 0,
    },{
        autoAlpha: 1, 
        duration: 0.2,
    })
    .fromTo(".btn",{
        autoAlpha: 0,
        x: -12
    },{
        autoAlpha: 1, 
        duration: 0.3,
        x: 0
    })

})

function menuToggle(){
    const toggleMenu = document.querySelector('.icons-menu');
    toggleMenu.classList.toggle('active')
}
