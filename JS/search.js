

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
const searchContent = async (e) => {
    e.preventDefault()
    if (e) {
        const gifosSearch = await getGifosSearch(Paginacion, searchInput?.value);
        fetchSearch(gifosSearch)
    }
}

const viewMore = async () => {
    Paginacion += 12;
    const gifosSearch = await getGifosSearch(Paginacion, searchInput.value);
    fetchSearch(gifosSearch, true)
}// general search function

const fetchSearch = (arr, flagViemore = false) => {


    if (arr.data.length === 0) {
        searchResults.innerHTML = ''
        let noResultsTitle = document.createElement('h2');
        noResultsTitle.innerText = searchInput.value;

        let noResultsImg = document.createElement('img');
        noResultsImg.setAttribute('src', './assets/icon-busqueda-sin-resultado.svg');

        let noResultsSuggestion = document.createElement('h3');
        noResultsSuggestion.innerText = 'Intenta con otra búsqueda';

        searchResults.append(noResultsTitle, noResultsImg, noResultsSuggestion);

    } else {
      
        let h2SearchResults = document.querySelector('#titulo_busqueda');
        h2SearchResults.innerHTML = searchInput ? searchInput.value : 'experimento';
        if (!flagViemore)
            searchResults.innerHTML = ""
        searchResults.prepend(h2SearchResults);
        h2SearchResults.style.display='block';
        const containerGifos = document.querySelector('#resultados_busqueda')
       

        arr.data.forEach(el => {
            gifosFound.push(el);
            const divGif = document.createElement('div');
            divGif.classList.add('image');
            const imageURL = el.images.fixed_height.url;
            divGif.innerHTML =
                `<img class="imagenGif" src="${imageURL}" alt="${el.title}">`
          
          
            containerGifos.appendChild(divGif);
        })

        searchInput.innerText = "";

        //show view more button
        let verMas = document.querySelector('#ver_mas');
        verMas.style.visibility = 'visible';
        verMas.addEventListener("click", viewMore)
    }

}

searchInput?.addEventListener('keyup', autocomplete);
search?.addEventListener('click', searchContent);

document.addEventListener('keydown', (e) => {
    if (e.key == "Enter") {

        search.click();
    }
})
document.querySelector('#iconono_buscador').addEventListener('click', (e) => {
    e.preventDefault()
    search.click()
})