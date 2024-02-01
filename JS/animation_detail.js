document.addEventListener("DOMContentLoaded", function(){

    var loading = new TimelineMax();
    loading.fromTo(".containers",{
        autoAlpha: 0,
    },{
        autoAlpha: 1, 
        duration: 0.3,
    },"0.35")
    .fromTo(".header",{
        opacity: 0,
        autoAlpha: 0,
        y: -20
    },{
        opacity: 1,
        autoAlpha: 1, 
        duration: 0.1,
        y: 0
    })
    .fromTo(".footer-distributed",{
        autoAlpha: 0,
    },{
        autoAlpha: 1, 
        duration: 0.2,
    })

})

function menuToggle(){
    const toggleMenu = document.querySelector('.icons-menu');
    toggleMenu.classList.toggle('active')
}