// To top button

const toTop = document.querySelector('.to-top-btn');

window.addEventListener('scroll',function(){
    if(window.pageYOffset > 600){
        toTop.classList.add('active-to-top-Btn');
    }else{
        toTop.classList.remove('active-to-top-Btn');
    }
})