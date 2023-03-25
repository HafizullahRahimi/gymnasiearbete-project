// Menu BTN
const menu = document.querySelector('#menu');
const menuBtn = document.querySelector('#dropDownMenuBtn');
const closeMenuBtn = document.querySelector('#closeMenuBtn');


menuBtn.addEventListener('click',function(){
    menu.classList.add('menuActive')
})

closeMenuBtn.addEventListener('click',function(){
    menu.classList.remove('menuActive')
})