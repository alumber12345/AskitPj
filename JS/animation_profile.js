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
    .fromTo(".left-col h1",{
        autoAlpha: 0,
    },{
        autoAlpha: 1, 
        duration: 0.2,
    },"0.35")
    .fromTo(".list-container",{
        autoAlpha: 0,
        y: 30
    },{
        autoAlpha: 1, 
        duration: 0.5,
        y: 0
    })

})

function menuToggle(){
    const toggleMenu = document.querySelector('.icons-menu');
    toggleMenu.classList.toggle('active')
}