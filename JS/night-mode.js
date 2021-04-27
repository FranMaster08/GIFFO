const changeMode = document.querySelector('#dark_mode');
const logo = document.querySelector('#logo_escritorio2');
const crearGifoBtn = document.querySelector('.crear-gifo-btn');
const sliderLeft = document.querySelector('#flecha_isquierda');
const sliderRight = document.querySelector('#flecha_derecha');


changeMode.addEventListener('click', function() {
    document.body.classList.toggle('mode_dark');
    
    if(window.matchMedia("(min-width: 768px)").matches) {
        if(changeMode.innerText == "MODO NOCTURNO") {
            changeMode.innerText = "MODO DIURNO";
            logo.src = "./assets/logo-mobile-modo-noct.svg";
            crearGifoBtn.src = "./assets/CTA-crear-gifo-modo-noc.svg";
            sliderLeft.src = "./assets/button-slider-left-md-noct.svg";
            sliderRight.src = "./assets/button-slider-right-md-noct.svg";
    
        } else  if (changeMode.innerText == "MODO DIURNO") {
            changeMode.innerText = "MODO NOCTURNO"
            logo.src = "./assets/logo-mobile.svg";
            crearGifoBtn.src = "./assets/button-crear-gifo.svg";
            sliderLeft.src = "./assets/button-slider-left.svg";
            sliderRight.src = "./assets/Button-Slider-right.svg"


        }
    } else if (window.matchMedia("(max-width: 767px)").matches) {
        if(changeMode.innerText == "Modo Nocturno") {
            changeMode.innerText = "Modo Diurno";
            logo.src = "./assets/logo-mobile-modo-noct.svg";
    
        } else  if (changeMode.innerText == "Modo Diurno") {
            changeMode.innerText = "Modo Nocturno"
            logo.src = "./assets/logo-mobile.svg";
        }

    }

})