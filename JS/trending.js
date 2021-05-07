let arrayDescarga = [];
const arrowLeft = document.querySelector("#left_arrow_id");
const arrowRigth = document.querySelector("#rigth_arrow_id");
const slick = document.getElementsByClassName("contenedor_gifos_hover");
let containerCarrousel = document.querySelector('#contenedor_carrusel');
let getApi = document.querySelector('.list_gifos');
let leftArrow = document.querySelector('.left_arrow');
let gifoUrl = "https://api.giphy.com/v1/gifs/trending?api_key=LcybAN2NSdMZKawiiuEU0m7lgBTrf52c&limit=12&offset=5&rating=g&random_id=e826c9fc5c929e0d6c6d423841a282aa";
let containerModal = document.querySelector("#myModal");
let modalImg = document.querySelector("#img01");
let x = document.querySelector(".close");
let optionsText = document.querySelector("#options");

let l = 0;

const loadTrendings = async () => {
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
const renderTrendings = async () => {
    try {
        let trendings = await loadTrendings()
        if (trendings) {
            arrayDescarga = trendings.data
            trendings.data.map(x => createCardTrending(x))
        }

    } catch (error) {
        console.log(error);
    }

}
const createCardTrending = (cardData) => {
    let images = document.createElement('img');
    images.setAttribute('src', cardData.images.downsized.url);
    images.setAttribute('id', 'gif');
    images.setAttribute('data-title', cardData.title);
    images.setAttribute('data-username', cardData.username);
    images.classList.add('trending');
    let containerGifosHover = document.createElement('div');
    containerGifosHover.setAttribute('class', 'contenedor_gifos_hover');
    containerGifosHover.appendChild(images);
    let mouseOverCard = document.createElement('div');
    mouseOverCard.setAttribute('class', 'mouse_over_tarjeta2');
    mouseOverCard.innerHTML = `
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
                    <h3 class ="gifo_usuario_hover">${cardData.username}</h3>
                    <h2 class ="titulo_gifo_hover" class="titulo_gifo_hover">${cardData.title}</h2>
        </div>`;
    containerGifosHover.appendChild(mouseOverCard);
    containerCarrousel.appendChild(containerGifosHover);
    getApi.insertBefore(containerCarrousel, arrowRigth);
    images.addEventListener("click", modal);
}
const modal = (e) => {
    containerModal.style.display = "block";
    let target = e.src ? e.src : e.target.src;
    modalImg.setAttribute('src', target);
    optionsText.style.display = "flex";
    document.querySelector('#titulo_gifo').innerText = e.target.dataset.title;
    document.querySelector('#gifo_usuario').innerText = e.target.dataset.username;
    document.querySelector('#corazon2').addEventListener('click', () => {
        let localStorageGifs = localStorage.getItem('favoritos');
        let localStorageGifsArray = [];
        if (localStorageGifs != null)
            localStorageGifsArray = JSON.parse(localStorageGifs);
        localStorageGifsArray.push(target)
        localStorage.setItem('favoritos', JSON.stringify(localStorageGifsArray));
    })
}
let slideRight = () => {
    l++
    for (var i of slick) {
        if (l == 0) i.style.left = "0px";
        if (l == 1) i.style.left = "-640px";
        if (l == 2) i.style.left = "-1380px";
        if (l == 3) i.style.left = "-2120px";
        if (l == 4) i.style.left = "-2860px";
        if (l > 4) l = 4

    }

}
let slideLeft = () => {
    l--
    for (var i of slick) {
        if (l == 0) i.style.left = "0px";
        if (l == 1) i.style.left = "-740px";
        if (l == 2) i.style.left = "-1480px";
        if (l == 3) i.style.left = "-2220px";
        if (l < 0) l = 4

    }

}
let closeModal = () => {
    containerModal.style.display = "none";
}
let maximizeGif = (element) => {

    if (element.target.classList.contains('guardar_favorito_corazon')) {
        addFav(element)
        if (document.title == 'FAVORITOS') renderFavs()

    }

    if (element.target.classList.contains('expandir_gifo_desktop'))
        modalDesktop(element.target.parentElement.parentElement.parentElement.parentElement.children[0]);

}
let addFav = (e) => {
    let Src = e.target.parentElement.parentElement.parentElement.parentElement.children[0].src
    let localStorageGifs = JSON.parse(localStorage.getItem('favoritos'));
    let Auxiliar = localStorageGifs ? localStorageGifs : []
    let verificacion = Auxiliar.filter(x => x == Src)
    if (verificacion.length == 0) {
        Auxiliar.push(Src)
        localStorage.setItem('favoritos', JSON.stringify(Auxiliar));
    }
    else
        console.log('Ya existe en favoritos');

}

let downloadGif = (evento) => {
    let btnDownload = evento.target.parentElement.parentElement.parentElement.parentElement.children[0].getAttribute('data-title');
    console.log(btnDownload);
    if (evento.target.classList.contains('descargar_gifo_escritorio')) {
        arrayDescarga.map(async (gif) => {
            if (gif.title == btnDownload) {
                await fetch(gif.images.downsized.url)
                    .then((img) => {
                        img.blob().then((file) => {
                            let a = document.createElement("a");
                            a.href = URL.createObjectURL(file);
                            a.download = gif.title;
                            a.click();
                        });
                    });
            }

        })

    }
}
let modalDesktop = (e) => {
    containerModal.style.display = "block";
    let target = e.src ? e.src : e.target.src;
    modalImg.setAttribute('src', target);
    optionsText.style.display = "none";
}
//no funciona en favoritos y en mis gifos

let renderFavs = () => {
    let localStorageGifsArray = [];
   document.querySelector('#imagenes_favoritos').innerHTML = ''
    let localStorageGifs = localStorage.getItem('favoritos');
    if (localStorageGifs != null) {
        localStorageGifsArray = JSON.parse(localStorageGifs);
        document.querySelector('#conte_favoritos2').style.display = 'none'
    }

    localStorageGifsArray.map(x => {
        let images = document.createElement('img');
        images.setAttribute('src', x);
        images.classList.add('trending');
        images.classList.add('sacarFavoritos');
        images.setAttribute('id', 'gif');
        images.style.height = "100%";
        images.style.width = "100%";
        images.style.boxSizing = "border-box"

        let containerGifosHover = document.createElement('div');
        containerGifosHover.style.display = "flex"
        containerGifosHover.style.justifyContent = "space-around"
        containerGifosHover.setAttribute('class', 'contenedor_gifos_hover');
        containerGifosHover.appendChild(images);
        let mouseOverCard = document.createElement('div');
        mouseOverCard.style.height = "100%";
        mouseOverCard.style.width = "100%";
        mouseOverCard.style.right = "0";
        mouseOverCard.setAttribute('class', 'mouse_over_tarjeta2 ');
        mouseOverCard.innerHTML = `
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
                 `;
        containerGifosHover.appendChild(mouseOverCard);
        document.querySelector('#imagenes_favoritos').appendChild(containerGifosHover);
    })
    document.querySelector('#imagenes_favoritos').addEventListener('click', (e) => {

        deleteFromFavs(e.target.parentElement.parentElement.parentElement.parentElement.children[0]);
    })
}


let main = () => {
    if (document.title == 'FAVORITOS') {
        renderFavs()
        renderTrendings()
    }
    if (document.title == 'GIFOS HOME') {
        renderTrendings()
    }
    if (document.title == 'MIS GIFOS') {
        renderTrendings()
    }
}


let deleteFromFavs = (e) => {
    if (typeof e != "undefined") {
        if (e.classList.contains('sacarFavoritos')) {
            let localStorageGifs = JSON.parse(localStorage.getItem('favoritos'));
            let Auxiliar = localStorageGifs ? localStorageGifs : []
            let verificacion = Auxiliar.filter(item => item != e.src)
            localStorage.setItem('favoritos', JSON.stringify(verificacion));
            renderFavs()
        }

    }
}



containerCarrousel?.addEventListener('click', downloadGif);
containerCarrousel?.addEventListener('click', maximizeGif);
arrowRigth?.addEventListener('click', slideRight)
arrowLeft?.addEventListener('click', slideLeft)
x?.addEventListener('click', closeModal)

main()