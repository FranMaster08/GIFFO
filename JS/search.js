let Paginacion = 0;
const gifosFound = [];
let searchInput = document.getElementById('buscador');
const search = document.querySelector('#icon_buscador');
const containerList = document.querySelector('#match_list');
let searchResults = document.querySelector('#resultados_busqueda');
let seccion2 = document.querySelector('.seccion2');

const getSearchTags = async (word) => {
    try {
        const suggestions = await fetch(`https://api.giphy.com/v1/gifs/search/tags?api_key=j4As5HO2OpUG2w2gTuuqQnIGuwOu2nnJ&limit=4&q=${word}`);
        return suggestions.json();
    } catch (error) {
        console.log("ocurrio un error", error)
    }
}

const getGifosSearch = async (Paginacion, query) => {
    try {
        const imagenes = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=j4As5HO2OpUG2w2gTuuqQnIGuwOu2nnJ&limit=12&offset=${Paginacion}&q=${query}`);
        return imagenes.json()
    } catch (error) {
        console.log("ocurrio un error", error)
    }
}


// search suggestions
const autocomplete = async (ev) => {

    if (ev.key == 'Enter') return
    ev.preventDefault()
    containerList.innerHTML = "";
    if (ev.target.value.length >= 3) {
        const tags = await getSearchTags(ev.target.value);
        tags.data.map(tag => {
            const newLi = document.createElement('li');
            newLi.textContent = tag.name;
            newLi.addEventListener("click", (e) =>
                searchInput.value = e.target.innerText
            )
            containerList.appendChild(newLi);
        })
    }

}

//getting input for search
const searchContent = async () => {


    const gifosSearch = await getGifosSearch(Paginacion, searchInput?.value);
    fetchSearch(gifosSearch)

}

const viewMore = async () => {
    Paginacion += 12;
    const gifosSearch = await getGifosSearch(Paginacion, searchInput.value);
    fetchSearch(gifosSearch, true)
}// general search function

const fetchSearch = (arr, flagViemore = false) => {

    let h2SearchResults = document.querySelector('#titulo_busqueda');
    if (arr.data.length === 0) {
        h2SearchResults.innerText = ''
        searchResults.innerHTML = ''
        let noResultsTitle = document.createElement('h2');
        noResultsTitle.innerText = searchInput.value;

        let noResultsImg = document.createElement('img');
        noResultsImg.setAttribute('src', './assets/icon-busqueda-sin-resultado.svg');
        noResultsImg.setAttribute('class', 'noResultsImg')

        let noResultsSuggestion = document.createElement('h3');
        noResultsSuggestion.innerText = 'Intenta con otra búsqueda';

        searchResults.append(noResultsTitle, noResultsImg, noResultsSuggestion);

    } else {

        h2SearchResults.innerText = searchInput.value
        if (!flagViemore)
            searchResults.innerHTML = ""
        //searchResults.prepend(h2SearchResults);
        // h2SearchResults.style.display='block';
        const containerGifos = document.querySelector('#resultados_busqueda')


        arr.data.forEach(x => {
            gifosFound.push(x);
            let images = document.createElement("img");
            images.setAttribute("src", x.images.fixed_height.url);
            images.classList.add("trending");
            images.setAttribute('data-title', x.title);
            images.setAttribute('data-username', x.username);
            images.classList.add("sacarFavoritos");
            images.setAttribute("id", "gif");
            images.style.height = "100%";
            images.style.width = "100%";
            images.style.boxSizing = "border-box";

            let containerGifosHover = document.createElement("div");
            containerGifosHover.style.display = "flex";
            containerGifosHover.style.justifyContent = "space-around";
            containerGifosHover.style.height = "200px";
            containerGifosHover.style.width = "260px";
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
                            <img class = "descargar_gifo_escritorio searchDownload" id = "descargar_escritorio" src="./assets/icon-download.svg" alt="">
                        </div>
                        <div id="borde_opciones_mause_over_id" class="borde_opciones_mause_over">
                            <img src="./assets/icon-max-normal.svg"  class = "expandir_gifo_desktop" id ="expandir_gifo" alt="">
                        </div>                    
                    </div>
                    <div class="usuario2_mouse_over">
                        <h3 class ="gifo_usuario_hover">${x.username}</h3>
                        <h2 class ="titulo_gifo_hover" class="titulo_gifo_hover">${x.title}</h2>
            </div>`;;
            containerGifosHover.appendChild(mouseOverCard);
            containerGifos.appendChild(containerGifosHover);


        })
        containerGifos.addEventListener('click', (e) => {

            let objetivo = e.target.parentElement.parentElement.parentElement.parentElement.children[0]
            console.log(e.target);
            if (e.target.classList.contains('guardar_favorito_corazon'))
                addFav(objetivo)

            if (e.target.getAttribute('id') && e.target.getAttribute('id') == 'expandir_gifo')
                modalDesktop(objetivo)
        })

        searchInput.innerText = "";

        //show view more button
        let verMas = document.querySelector('#ver_mas');
        verMas.style.visibility = 'visible';
        verMas.addEventListener("click", viewMore)
    }

}

searchInput?.addEventListener('keyup', autocomplete);


document.addEventListener('keypress', async (e) => {
    if (e.key == "Enter") {
        searchContent()
    }
})
document.querySelector('#iconono_buscador').addEventListener('click', async (e) => {
    e.preventDefault()
    searchContent()
})

searchResults?.addEventListener('click', downloadGif);