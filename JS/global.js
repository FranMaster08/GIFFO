let arrayDescarga = [];
const arrowLeft = document.querySelector("#left_arrow_id");
const arrowRigth = document.querySelector("#rigth_arrow_id");
const slick = document.getElementsByClassName("contenedor_gifos_hover");
let containerCarrousel = document.querySelector('#contenedor_carrusel');
let getApi = document.querySelector('.list_gifos');
let leftArrow = document.querySelector('.left_arrow');
let gifoUrl = "https://api.giphy.com/v1/gifs/trending?api_key=wUIs2kykDiUjqc9ljNRoH97ddpN05IwD&limit=12&offset=5&rating=g&random_id=e826c9fc5c929e0d6c6d423841a282aa";
let containerModal = document.querySelector("#myModal");
let modalImg = document.querySelector("#img01");
let x = document.querySelector(".close");
let optionsText = document.querySelector("#options");
let l = 0;
let localStorageGifsArray = [];
const TREND='Trendings'
const FAV='Favoritos'
const GIFFO='Giffos'
const CreateCard = (cardData, classImagen = null, ContenedorPadre, callback,Criterio) => {
    let images = document.createElement('img');
    images.setAttribute('src', cardData.url);
    images.setAttribute('id', 'gif');
    images.setAttribute('data-title', cardData.title);
    images.setAttribute('data-username', cardData.username);
    if (classImagen) classImagen.map(item => images.classList.add(item))
    let containerGifosHover = document.createElement('div');
    containerGifosHover.setAttribute('class', 'contenedor_gifos_hover');
    containerGifosHover.appendChild(images);
    containerGifosHover.style.margin = '0 15px 0';
    containerGifosHover.style.display = "flex";
    containerGifosHover.style.justifyContent = "center";
    let mouseOverCard = document.createElement('div');
    mouseOverCard.setAttribute('class', 'mouse_over_tarjeta2');
    mouseOverCard.style.height = "100%";
    mouseOverCard.style.width = "100%";
    mouseOverCard.style.right = "0";
    mouseOverCard.innerHTML = `
        <div class="opciones_mouse_over">
            <div class="borde_opciones_mause_over llegar_al_corazon">
                <img class=guardar_favorito_corazon  src="./assets/icon-fav-hover.svg" alt="">
            </div>
            <div class="borde_opciones_mause_over ">
                <img class="descargar_gifo_escritorio" id="descargar_escritorio" src="./assets/icon-download.svg"
                    alt="">
            </div>
            <div id="borde_opciones_mause_over_id" class="borde_opciones_mause_over">
                <img src="./assets/icon-max-normal.svg"  class="expandir_gifo_desktop" id="expandir_gifo" alt="">
            </div>
        </div>
        <div class="usuario2_mouse_over">
            <h3 class="gifo_usuario_hover">${cardData.username}</h3>
            <h2 class="titulo_gifo_hover" class="titulo_gifo_hover">${cardData.title}</h2>
        </div>`;
    let divCriterio = document.createElement('div');
    let inputCriterio = document.createElement('input');
    inputCriterio.setAttribute('hidden','true')
    inputCriterio.setAttribute('value',Criterio)
    divCriterio.appendChild(inputCriterio)
    mouseOverCard.appendChild(divCriterio)
    containerGifosHover.appendChild(mouseOverCard);
    ContenedorPadre.appendChild(containerGifosHover);
    callback(mouseOverCard)

}

let downloadGif = (objetoADescargar, CriterioDeBusqueda) => {
    TitleImagen=objetoADescargar.getAttribute('data-title');
    urlImagen=objetoADescargar.src;
    CriterioDeBusqueda.map(async item => {
        if (item.title == TitleImagen) {
            await fetch(urlImagen)
                .then((img) => {
                    img.blob().then((file) => {
                        let a = document.createElement("a");
                        a.classList.add('descarga')
                        a.href = URL.createObjectURL(file);
                        a.download = item.title;
                        a.click()
                    });
                });
        }

    })

}


const verificarPantalla=(nombrePantalla)=>{
    return document.title==nombrePantalla
}


const getCriterio=(nombre)=>{
    switch (nombre) {
        case TREND:
             return arrayDescarga
         
        case FAV:
             return JSON.parse(localStorage.getItem('favoritos'))
             
        case GIFFO:
             return JSON.parse(localStorage.getItem("misGifos"))
                break;
    
        default:
            break;
    }
}