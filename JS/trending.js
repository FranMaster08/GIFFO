let arrayDescarga = [];
const arrowLeft = document.querySelector("#left_arrow_id");
const arrowRigth = document.querySelector("#rigth_arrow_id");
const slick = document.getElementsByClassName("contenedor_gifos_hover");
let contenedorCarrusel = document.querySelector('#contenedor_carrusel');
let getApi = document.querySelector('.list_gifos');
let leftArrow = document.querySelector('.left_arrow');
let gifoUrl = "https://api.giphy.com/v1/gifs/trending?api_key=LcybAN2NSdMZKawiiuEU0m7lgBTrf52c&limit=12&offset=5&rating=g&random_id=e826c9fc5c929e0d6c6d423841a282aa";
let contenedorModal = document.querySelector("#myModal");
let modalImg = document.querySelector("#img01");
let x = document.querySelector(".close");
let optionsText = document.querySelector("#options");

let l = 0;

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
            arrayDescarga = trendings.data
            trendings.data.map(x => CrearCardTrending(x))
        }

    } catch (error) {
        console.log(error);
    }

}
const CrearCardTrending = (datosCard) => {
    let imagenes = document.createElement('img');
    imagenes.setAttribute('src', datosCard.images.downsized.url);
    imagenes.setAttribute('id', 'gif');
    imagenes.setAttribute('data-title', datosCard.title);
    imagenes.setAttribute('data-username', datosCard.username);
    imagenes.classList.add('trending');
    let contenedorGifosHover = document.createElement('div');
    contenedorGifosHover.setAttribute('class', 'contenedor_gifos_hover');
    contenedorGifosHover.appendChild(imagenes);
    let mouseOverTarjeta = document.createElement('div');
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
    getApi.insertBefore(contenedorCarrusel, arrowRigth);
    imagenes.addEventListener("click", modal);
}
const modal = (e) => {
    contenedorModal.style.display = "block";
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
let MoverAlaDerecha = () => {
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
let MoverAlaIzquierda = () => {
    l--
    for (var i of slick) {
        if (l == 0) i.style.left = "0px";
        if (l == 1) i.style.left = "-740px";
        if (l == 2) i.style.left = "-1480px";
        if (l == 3) i.style.left = "-2220px";
        if (l < 0) l = 4

    }

}
let CerrarModal = () => {
    contenedorModal.style.display = "none";
}
let expandirEscritorio = (elemento) => {

    if (elemento.target.classList.contains('guardar_favorito_corazon')) {
        Almacenar(elemento)
        if (document.title == 'FAVORITOS') RenderizarFvoritos()

    }

    if (elemento.target.classList.contains('expandir_gifo_desktop'))
        modalEscritorio(elemento.target.parentElement.parentElement.parentElement.parentElement.children[0]);

}
let Almacenar = (e) => {
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
let modalEscritorio = (e) => {
    contenedorModal.style.display = "block";
    let target = e.src ? e.src : e.target.src;
    modalImg.setAttribute('src', target);
    optionsText.style.display = "none";
}

let RenderizarFvoritos = () => {
    let localStorageGifsArray = [];
    document.querySelector('#imagenes_favoritos').innerHTML = ''
    let localStorageGifs = localStorage.getItem('favoritos');
    if (localStorageGifs != null) {
        localStorageGifsArray = JSON.parse(localStorageGifs);
        document.querySelector('#conte_favoritos2').style.display = 'none'
    }

    localStorageGifsArray.map(x => {
        let imagenes = document.createElement('img');
        imagenes.setAttribute('src', x);
        imagenes.classList.add('trending');
        imagenes.classList.add('sacarFavoritos');
        imagenes.setAttribute('id', 'gif');
        imagenes.style.height = "100%";
        imagenes.style.width = "100%";
        imagenes.style.boxSizing = "border-box"

        let contenedorGifosHover = document.createElement('div');
        contenedorGifosHover.style.display = "flex"
        contenedorGifosHover.style.justifyContent = "space-around"
        contenedorGifosHover.setAttribute('class', 'contenedor_gifos_hover');
        contenedorGifosHover.appendChild(imagenes);
        let mouseOverTarjeta = document.createElement('div');
        mouseOverTarjeta.style.height = "100%";
        mouseOverTarjeta.style.width = "100%";
        mouseOverTarjeta.style.right = "0";
        mouseOverTarjeta.setAttribute('class', 'mouse_over_tarjeta2 ');
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
                 `;
        contenedorGifosHover.appendChild(mouseOverTarjeta);
        document.querySelector('#imagenes_favoritos').appendChild(contenedorGifosHover);
    })
    document.querySelector('#imagenes_favoritos').addEventListener('click', (e) => {

        SacarDeFavoritos(e.target.parentElement.parentElement.parentElement.parentElement.children[0]);
    })
}


let main = () => {
    if (document.title == 'FAVORITOS') {
        RenderizarFvoritos()
        RenderizarTrendings()
    }
    if (document.title == 'GIFOS HOME') {
        RenderizarTrendings()
    }
    if (document.title == 'MIS GIFOS') {
        RenderizarTrendings()
    }
}


let SacarDeFavoritos = (e) => {
    if (typeof e != "undefined") {
        if (e.classList.contains('sacarFavoritos')) {
            let localStorageGifs = JSON.parse(localStorage.getItem('favoritos'));
            let Auxiliar = localStorageGifs ? localStorageGifs : []
            let verificacion = Auxiliar.filter(item => item != e.src)
            localStorage.setItem('favoritos', JSON.stringify(verificacion));
            RenderizarFvoritos()
        }

    }
}



contenedorCarrusel?.addEventListener('click', downloadGif);
contenedorCarrusel?.addEventListener('click', expandirEscritorio);
arrowRigth?.addEventListener('click', MoverAlaDerecha)
arrowLeft?.addEventListener('click', MoverAlaIzquierda)
x?.addEventListener('click', CerrarModal)

main()