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
let getRenderedImage = () => {
    let cards = document.querySelector('#resultados_busqueda')
    let imagenesBuscadas = []
    for (let i = 0; i < cards.childElementCount; i++) {
        imagenesBuscadas.push(

            {
                datatitle: cards.children[i].children[0].getAttribute('data-title'),
                src: cards.children[i].children[0].getAttribute('src')

            })
    }
    return imagenesBuscadas
}

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
    images.setAttribute('src', cardData.images.fixed_height.url);
    images.setAttribute('id', 'gif');
    images.setAttribute('data-title', cardData.title);
    images.setAttribute('data-username', cardData.username);
    images.classList.add('trending');
    // images.style.height = "275px";
    // images.style.width = "357px";
    let containerGifosHover = document.createElement('div');
    containerGifosHover.setAttribute('class', 'contenedor_gifos_hover');
    containerGifosHover.appendChild(images);
    // containerGifosHover.style.width='357px';
    // containerGifosHover.style.height='275px';
    containerGifosHover.style.margin='0 15px 0';
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
    let imgModalExpand = document.querySelector('.modal-content');
    imgModalExpand.setAttribute('data-title', cardData.title);
    imgModalExpand.setAttribute('data-username', cardData.username);
    let downloadGifModal = document.querySelector('.btn_descarga_mobile_2');
    downloadGifModal.classList.add('descargar_gifo_escritorio')
    // containerModal?.addEventListener('click', downloadGif());
    containerModal.addEventListener('click', (e) => {

        let objetivo = e.target.parentElement.parentElement.parentElement.parentElement.children[0]

        if (e.target.classList.contains('guardar_favorito_corazon'))
            addFav(objetivo)
        if (e.target.classList.contains('descargar_gifo_escritorio'))
            downloadGif(objetivo)
    })

}
const modal = (e) => {
    containerModal.style.display = "block";
    let target = e.src ? e.src : e.target.src;
    modalImg.setAttribute('src', target);
    optionsText.style.display = "flex";
    let expandTitle = document.querySelector('#titulo_gifo');
    let expandUser = document.querySelector('#gifo_usuario');
     expandTitle.innerText = e.target.dataset.title;
     expandUser.innerText = e.target.dataset.username;
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
        if (deleteFromFavs(element)) return
        addFav(element)

        if (document.title == 'FAVORITOS') renderFavs()

    }

    if (element.target.classList.contains('expandir_gifo_desktop'))
        modalDesktop(element.target.parentElement.parentElement.parentElement.parentElement.children[0]);

}
let addFav = (e) => {
    let Src = ''
    if (document.title == 'GIFOS HOME') {
        Src = e.target.parentElement.parentElement.parentElement.parentElement.children[0]   //VER POR QUE EL ADDFAV DE TRENDING NO ESTA FUNCIONANDO
    } else {
        Src = e.target.parentElement.parentElement.parentElement.parentElement.children[0]

    }
    let localStorageGifs = JSON.parse(localStorage.getItem('favoritos'));
    let Auxiliar = localStorageGifs ? localStorageGifs : []
    let verificacion = Auxiliar.filter(x => x.datatitle == Src.getAttribute('data-title'))
    if (verificacion.length == 0) {
        let favorito = {
            datatitle: Src.getAttribute('data-title'),
            userName: Src.getAttribute('data-username'),
            src: Src.src
        }
        Auxiliar.push(favorito)
        localStorage.setItem('favoritos', JSON.stringify(Auxiliar));
    }
    else
        console.log('Ya existe en favoritos');

}

let downloadGif = (evento) => {
    let btnDownload = evento.target.parentElement.parentElement.parentElement.parentElement.children[0].getAttribute('data-title');
    console.log('entramos aca',btnDownload);
    if (evento.target.classList.contains('descarga')) return
    if (evento.target.classList.contains('searchDownload')) {
        downloadSearch(evento, btnDownload)
        return
    }


    if (evento.target.classList.contains('descargar_gifo_escritorio')) {
        console.log(btnDownload);
        arrayDescarga.map(x => console.log(x.title))
        arrayDescarga.map(async (gif) => {
            if (gif.title == btnDownload) {
                console.log(gif);
                await fetch(gif.images.fixed_height.url)
                    .then((img) => {
                        img.blob().then((file) => {
                            let a = document.createElement("a");
                            a.classList.add('descarga')
                            a.href = URL.createObjectURL(file);
                            a.download = gif.title;
                            a.click()

                        });
                    });
            }

        })

    }
}

let downloadSearch = (evento, btnDownload) => {
    console.log('entramos');
    if (evento.target.classList.contains('descargar_gifo_escritorio')) {
        getRenderedImage().map(async (item) => {
            if (item.datatitle == btnDownload) {
                await fetch(item.src)
                    .then((img) => {
                        img.blob().then((file) => {
                            let a = document.createElement("a");
                            a.classList.add('descarga')
                            a.href = URL.createObjectURL(file);
                            a.download = item.datatitle;
                            a.click()

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
    optionsText.style.display = "flex";
}
//no funciona en favoritos y en mis gifos

let renderFavs = (x) => {
    let localStorageGifsArray = [];
    document.querySelector('#imagenes_favoritos').innerHTML = ''
    let localStorageGifs = localStorage.getItem('favoritos');
    if (localStorageGifs != null) {
        localStorageGifsArray = JSON.parse(localStorageGifs);
        document.querySelector('#conte_favoritos2').style.display = 'none'
    }

    localStorageGifsArray.map(x => {
        let images = document.createElement('img');
        images.setAttribute('src', x.src);
        images.classList.add('trending');
        images.setAttribute('data-title', x.datatitle);
        images.setAttribute('data-username', x.userName);
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
                            <img class = 'guardar_favorito_corazon sacarFavoritos' src="./assets/icon-fav-hover.svg" alt="">
                        </div>
                        <div class="borde_opciones_mause_over click_descarga_gifo">
                            <img class = "descargar_gifo_escritorio" id = "descargar_escritorio" src="./assets/icon-download.svg" alt="">
                        </div>
                        <div id="borde_opciones_mause_over_id" class="borde_opciones_mause_over">
                            <img src="./assets/icon-max-normal.svg"  class = "expandir_gifo_desktop" id ="expandir_gifo" alt="">
                        </div>                    
                    </div>
                    <div class="usuario2_mouse_over">
                    <h3 class ="gifo_usuario_hover">${x.username}</h3>
                    <h2 class ="titulo_gifo_hover" class="titulo_gifo_hover">${x.title}</h2>
        </div>
                 `;
        containerGifosHover.appendChild(mouseOverCard);
        document.querySelector('#imagenes_favoritos').appendChild(containerGifosHover);
        images.addEventListener("click", modal);
    })
    
}

let renderMisGifos = () => {

    const misGifos = JSON.parse(localStorage.getItem("misGifos"));
    const urls = misGifos.map((id) => `https://i.giphy.com/${id}.gif`);
    localStorageGifsArray = urls.map((url) => {
        let images = document.createElement("img");
        images.setAttribute("src", url);
        images.classList.add("trending");
        images.setAttribute('data-title', url);
        images.setAttribute('data-username', url);
        images.classList.add("sacarFavoritos");
        images.setAttribute("id", "gif");
        images.style.height = "100%";
        images.style.width = "100%";
        images.style.boxSizing = "border-box";

        let containerGifosHover = document.createElement("div");
        containerGifosHover.style.display = "flex";
        containerGifosHover.style.justifyContent = "space-around";
        containerGifosHover.setAttribute("class", "contenedor_gifos_hover");
        containerGifosHover.appendChild(images);
        let mouseOverCard = document.createElement("div");
        mouseOverCard.style.height = "100%";
        mouseOverCard.style.width = "100%";
        mouseOverCard.style.right = "0";
        mouseOverCard.setAttribute("class", "mouse_over_tarjeta2 ");
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
        document.querySelector("#gifsCreados").appendChild(containerGifosHover);

        document.querySelector('#gifsCreados').addEventListener('click', (e) => {

            let objetivo = e.target.parentElement.parentElement.parentElement.parentElement.children[0]

            if (e.target.classList.contains('guardar_favorito_corazon'))
                deleteFromMisGifos(objetivo)
            if (e.target.classList.contains('descargar_gifo_escritorio'))
                downloadCreatedGif(e)
            if (e.target.getAttribute('id') && e.target.getAttribute('id') == 'expandir_gifo')
                modalDesktop(objetivo)
        })
    });
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
        renderMisGifos()
    }
}


let deleteFromFavs = (e) => {
    let dataTitle = e.target.parentElement.parentElement.parentElement.parentElement.children[0].getAttribute('data-title');
    if (typeof e != "undefined") {
        if (e.target.classList.contains('sacarFavoritos')) {
            let localStorageGifs = JSON.parse(localStorage.getItem('favoritos'));
            let Auxiliar = localStorageGifs ? localStorageGifs : []
            let verificacion = Auxiliar.filter(item => item.datatitle != dataTitle)
            localStorage.setItem('favoritos', JSON.stringify(verificacion));
            renderFavs()
            return true
        }

    }
    return false
}



containerCarrousel?.addEventListener('click', downloadGif);
containerCarrousel?.addEventListener('click', maximizeGif);
document.querySelector('#imagenes_favoritos')?.addEventListener('click', downloadGif);
document.querySelector('#imagenes_favoritos')?.addEventListener('click', maximizeGif);
arrowRigth?.addEventListener('click', slideRight)
arrowLeft?.addEventListener('click', slideLeft)
x?.addEventListener('click', closeModal)


main()