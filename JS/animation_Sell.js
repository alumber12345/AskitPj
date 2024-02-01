document.addEventListener("DOMContentLoaded", function(){

    var loading = new TimelineMax();
    loading.fromTo(".header",{
        autoAlpha: 0,
        y:-20
    },{
        autoAlpha: 1, 
        duration: 0.1,
        y:0
    },"0.35")
    .fromTo(".wrapper",{
        opacity: 0,
        autoAlpha: 0,
        y: 40
    },{
        opacity: 1,
        autoAlpha: 1, 
        duration: 0.4,
        y: 0
    })

})

function menuToggle(){
    const toggleMenu = document.querySelector('.icons-menu');
    toggleMenu.classList.toggle('active')
}