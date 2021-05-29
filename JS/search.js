let Paginacion = 0;
const gifosFound = [];
let searchInput = document.getElementById('buscador');
const search = document.querySelector('#icon_buscador');
const containerList = document.querySelector('#match_list');
let searchResults = document.querySelector('#resultados_busqueda');
let seccion2 = document.querySelector('.seccion2');

const getSearchTags = async (word) => {
    try {
        const suggestions = await fetch(`https://api.giphy.com/v1/gifs/search/tags?api_key=wUIs2kykDiUjqc9ljNRoH97ddpN05IwD&limit=4&q=${word}`);
        return suggestions.json();
    } catch (error) {
        console.log("ocurrio un error", error)
    }
}

const getGifosSearch = async (Paginacion, query) => {
    try {
        const imagenes = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=wUIs2kykDiUjqc9ljNRoH97ddpN05IwD&limit=12&offset=${Paginacion}&q=${query}`);
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
        const containerGifos = document.querySelector('#resultados_busqueda')
       
        let datos=arr.data.map(dato=>{
          
            return {
                
                   
                    url:dato.images.fixed_height_small.url,
                    username:dato.title,
                    title:dato.title
                
            }
        })
  
        datos.forEach(x => {
            gifosFound.push(x);
            CreateCard(x, ['searchImg'], containerGifos, (e) => {
                e.parentElement.children[0].onclick=(y)=>AbrirModal(y.target.parentElement.children[1].children[0].children[2].children[0]);
                e.children[0].children[2].onclick=(y)=>AbrirModal(y.target);
                e.children[0].children[1].onclick = (y) => downloadGif(y.target.parentElement.parentElement.parentElement.parentElement.children[0],getRenderedImage())
                e.children[0].children[0].onclick = (y) => addFav(y.target)
                containerList.innerHTML = "";
                let verMas = document.querySelector('#ver_mas');
                verMas.style.visibility = 'visible';
                verMas.addEventListener("click", viewMore);

            })

        })
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