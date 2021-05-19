const switchThemeBtn = document.querySelector('#dark_mode');
const logo = document.querySelector('#logo_escritorio2');
const crearGifBtn = document.querySelector('#crear-gifo-btn');
const searchBtn = document.querySelector('#icon_buscador');
const previousBtn = document.querySelector('#flecha_isquierda');
const nextBtn = document.querySelector('#flecha_derecha');
const camera = document.querySelector('#camera');
const celuloide = document.querySelector('#celuloide');

// Switch Theme Event

const switchTheme = (e) => {
    
	document.body.classList.toggle('mode_dark');

	// Guarda la elección en el localStorage
	if (document.body.classList.contains('mode_dark')) {
		localStorage.setItem('dark-mode', true);
	} else {
		localStorage.setItem('dark-mode', false);
	}
};

switchThemeBtn.addEventListener('click', switchTheme);

// consulta cual es el modo elegido y setea las propiedades nocturnas
const setLocalStorageTheme = (e) => {
    
    
	if (localStorage.getItem('dark-mode') == 'true') {
		document.body.classList.add('mode_dark');
		switchThemeBtn.textContent = 'MODO DIURNO';
		if(logo)logo.src = './assets/logo-mobile-modo-noct.svg';
		if(crearGifBtn)crearGifBtn.src = './assets/CTA-crar-gifo-modo-noc.svg';
		if(searchBtn)searchBtn.src = './assets/icon-search-mod-noc.svg';
		if(previousBtn)previousBtn.src = './assets/button-slider-left-md-noct.svg';
		if(nextBtn)nextBtn.src = './assets/button-slider-right-md-noct.svg';
		if(camera)camera.src = './assets/camara-modo-noc.svg';
		if(celuloide)celuloide.src = './assets/pelicula-modo-noc.svg';
	} else {
		document.body.classList.remove('mode_dark');
		switchThemeBtn.textContent = 'MODO NOCTURNO';
	}
};

setLocalStorageTheme();