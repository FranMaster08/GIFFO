
let contenedorCarrusel = document.querySelector('#contenedor_carrusel');
let getApi = document.querySelector('.list_gifos');
let leftArrow = document.querySelector('.left_arrow');
let gifoUrl = "https://api.giphy.com/v1/gifs/trending?api_key=LcybAN2NSdMZKawiiuEU0m7lgBTrf52c&limit=12&offset=5&rating=g&random_id=e826c9fc5c929e0d6c6d423841a282aa";
//modal 
let contenedorModal = document.querySelector("#myModal");
let modalImg = document.querySelector("#img01");
let x = document.querySelector(".close");
let optionsText = document.querySelector("#options");

//modal
const arrayDescarga = [];



const CargarTrendings = async () => {
    try {
        let requestOptions = {
            method: 'GET'
        };
        let response = await fetch(gifoUrl, requestOptions)
        return response.json();
    } catch (error) {
        console.log(error);
    }
}

const RenderizarTrendings = async () => {
    try {
        let trendings = await CargarTrendings()
        if (trendings) {

            trendings.data.forEach(element => {
                CrearCardTrending(element)
            });
        }

    } catch (error) {
        console.log(error);
    }

}

const CrearCardTrending = (datosCard) => {
    //lo vamos sacar

    //Creamos Imagenes
    let imagenes = document.createElement('img');
    imagenes.setAttribute('src', datosCard.images.downsized.url);
    imagenes.setAttribute('data-title', datosCard.title);
    imagenes.setAttribute('data-username', datosCard.username);
    imagenes.classList.add('trending');
    imagenes.classList.add('gif');
    //contenedorCarrusel.appendChild(imagenes)

    let  contenedorGifosHover = document.createElement('div');
    contenedorGifosHover.setAttribute('class', 'contenedor_gifos_hover');
    contenedorGifosHover.appendChild(imagenes);
    var mouseOverTarjeta = document.createElement('div');
    mouseOverTarjeta.setAttribute('class', 'mouse_over_tarjeta2');
    mouseOverTarjeta.innerHTML = `
    <div class="opciones_mouse_over">    
                    <div class="borde_opciones_mause_over llegar_al_corazon">
                        <img class = guardar_favorito_corazon src="./assets/icon-fav-hover.svg" alt="">
                    </div>
                    <div class="borde_opciones_mause_over click_descarga_gifo">
                        <img class = "descargar_gifo_escritorio" id = "descargar_escritorio" src="./assets/icon-download.svg" alt="">
                    </div>
                    <div id="borde_opciones_mause_over_id" class="borde_opciones_mause_over">
                        <img src="./assets/icon-max-normal.svg"  class = "expandir_gifo_desktop" id ="expandir_gifo" alt="">
                    </div>
                    
                </div>
                <div class="usuario2_mouse_over">
                    <h3 class ="gifo_usuario_hover">${datosCard.username}</h3>
                    <h2 class ="titulo_gifo_hover" class="titulo_gifo_hover">${datosCard.title}</h2>
                </div>`;


    contenedorGifosHover.appendChild(mouseOverTarjeta);
    contenedorCarrusel.appendChild(contenedorGifosHover);
    getApi.insertBefore(contenedorCarrusel, leftArrow);
    // Evento click pop up modal
    imagenes.addEventListener("click", modal);




}


const modal=(e)=>{
    // console.log(e);
    contenedorModal.style.display = "block";
    let target= e.src?e.src:e.target.src;
    modalImg.setAttribute('src', target);
    optionsText.style.display = "flex";
    // Title Gifo
    document.querySelector('#titulo_gifo').innerText = e.target.dataset.title;
    // User Gifo
    document.querySelector('#gifo_usuario').innerText =e.target.dataset.username;

    //save gif into local storage
    document.querySelector('#corazon2').addEventListener('click', ()=> {
        let localStorageGifs = localStorage.getItem('favoritos');
        let localStorageGifsArray =  [];        
        if (localStorageGifs != null) 
            localStorageGifsArray = JSON.parse(localStorageGifs);
        localStorageGifsArray.push(target)
        localStorage.setItem('favoritos', JSON.stringify(localStorageGifsArray));        

    })
}


RenderizarTrendings()
