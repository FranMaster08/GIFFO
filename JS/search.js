

  let searchInput = document.getElementById('buscador');
  const search = document.querySelector('#icon_buscador');


  const getSearchTags = async (word) => {
    try {
        const suggestions = await fetch(`https://api.giphy.com/v1/gifs/search/tags?api_key=j4As5HO2OpUG2w2gTuuqQnIGuwOu2nnJ&limit=4&q=${word}`);
        return suggestions.json();
    } catch (error) {
        console.log("ocurrio un error", error)
    }
}
const gifosFound =[];

const getGifosSearch = async (offset, query) => {
    try {
        const imagenes = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=j4As5HO2OpUG2w2gTuuqQnIGuwOu2nnJ&limit=12&offset=${offset}&q=${query}`);
        return imagenes.json()
    } catch (error) {
        console.log("ocurrio un error", error)
    }
}


// search suggestions
const autocomplete = async (ev) => {
  const containerList = document.querySelector('#match_list');
  containerList.innerHTML= "";
  if (ev.target.value.length >= 3) {
      const tags = await getSearchTags(ev.target.value);
      containerList.innerHTML = "";
      tags.data.forEach(tag => {
          const newLi = document.createElement('li');
          newLi.textContent = tag.name;
          containerList.appendChild(newLi);

          newLi.addEventListener("click", function() {
              searchContent();
              containerList.innerHTML = "";
          })
      })
  }
  // search on enter
  if (ev.key === 'Enter' || ev.keyCode === '13'){
      const containerGifos = document.querySelector('#resultados_busqueda');
      containerGifos.innerHTML = "";
      containerList.innerHTML= "";
      searchContent();
  }
}

if (searchInput != null) {

  searchInput.addEventListener('keyup', autocomplete);
}

let gifosOffset = 0;
//getting input for search
const searchContent = async () => {
  const gifosSearch = await getGifosSearch(gifosOffset, searchInput.value);
  fetchSearch(gifosSearch)
}

const viewMore = async() => {
  gifosOffset +=12;
  const gifosSearch = await getGifosSearch(gifosOffset, searchInput.value);
  fetchSearch(gifosSearch)
}

if(search != null) {

  search.addEventListener('click', searchContent);
}



// general search function

const fetchSearch = (arr) => {

  let searchResults = document.querySelector('#resultados_busqueda');
  // searchResults.innerHTML = '';
  if(arr.data.length === 0){
      let noResultsTitle = document.createElement('h2');
      noResultsTitle.innerText = searchInput.value;
      
      let noResultsImg = document.createElement('img');
      noResultsImg.setAttribute('src', './assets/icon-busqueda-sin-resultado.svg');

      let noResultsSuggestion = document.createElement('h3');
      noResultsSuggestion.innerText = 'Intenta con otra búsqueda';

      searchResults.append(noResultsTitle,noResultsImg,noResultsSuggestion);

  } else {

      let h2SearchResults = document.querySelector('#titulo_busqueda');
      h2SearchResults.textContent = searchInput.value;
      searchResults.prepend(h2SearchResults);
      const containerGifos = document.querySelector('#resultados_busqueda')
      arr.data.forEach(el => {
          gifosFound.push(el);
          const divGif = document.createElement('div');
          divGif.classList.add('image');
          const imageURL = el.images.fixed_height.url;
          divGif.innerHTML = 
          `<img class="imagenGif" src="${imageURL}" alt="${el.title}">
          
          <div class="dataGif">
              <div class="botones">
                  <a class="boton fav"><img data-id="${el.id}" src="./assets/icon-fav.svg" alt=""></a>
                  <a class="boton maxGif"><img src="./assets/icon-max-normal.svg" alt=""></a>
                  <a class="boton download" href="${imageURL}" download><img src="./assets/icon-download.svg" alt=""></a>
              </div>
              <div class="info">
                  <p class="user">${el.username}</p>
                  <h4 class="title">${el.title}</h4>
              </div>
          </div>`
          containerGifos.appendChild(divGif);

          // const maximise = divGif.querySelector('.dataGif > .botones > .maxGif');
          // maximise.addEventListener('click', function() {
          //     createModal(imageURL, el.title, el.username, el.id)
          // });

          // const image = divGif.querySelector('.imagenGif');
          // image.addEventListener("click", function() {
          //     createModal(imageURL, el.title, el.username, el.id)
          // });

          // divGif.querySelector('.fav').addEventListener('click', addToFavs)
      })

      searchInput.innerText = "";

      //show view more button
      let verMas = document.querySelector('#ver_mas');
      verMas.style.visibility= 'visible';
      verMas.addEventListener("click", viewMore)



  }

}