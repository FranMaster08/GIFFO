//LLAMADA A API
  //1. escribir una funcion por cada peticion a una api
  //2. escribir async antes de la lista de 
  //parametros en la funcion del punto 1
  //3. encerrar los llamados a fetch en try catch
  //4. donde usemos funciones del punto1 escribimos async tambien en 
  //la funcion contenedora antes de la lista de parametros
  //5. cuando llamemos a una funcion del punto 1 ponemos await
  //6. celebrar con los datos


  const getSearchGifsByKeyword =  async (apiKey,keyword) => {
    const API_URL = "https://api.giphy.com/v1/gifs/search";
    try {
      const tags = await fetch(`${API_URL}?api_key=${apiKey}&q=${keyword}&limit=12`);
      return tags.json()
    } catch (error) {
      console.log("ocurrio un error",error)
    }
  }
  const getSearchTags =  async (apiKey,query) => {
    const API_URL = "https://api.giphy.com/v1/gifs/search/tags";
    try {
      const tags = await fetch(`${API_URL}?api_key=${apiKey}&q=${query}`);
      return tags.json()
    } catch (error) {
      console.log("ocurrio un error",error)
    }
  }
  
  const getSuggestionsHanlder = async (ev) => {
  const API_KEY =  "LcybAN2NSdMZKawiiuEU0m7lgBTrf52c";
    const contenedorSugerencias = document.querySelector('#match_list');
    const contenedorGifs = document.querySelector('#suggestions');
    contenedorSugerencias.innerHTML = '';
    contenedorGifs.innerHTML = '';
    if(ev.target.value.length >= 3 && ev.keyCode !== '13') {
        const tags = await getSearchTags(API_KEY,ev.target.value);
        tags.data.forEach(tag => {
          const newLi = document.createElement('li');
          newLi.textContent = tag.name;
          contenedorSugerencias.appendChild(newLi);
        });
    }
    if (ev.keyCode === 13) {
      const gifs = await getSearchGifsByKeyword(API_KEY,ev.target.value);
        gifs.data.forEach(gif => {
          const newImg = document.createElement('img');
          newImg.setAttribute("src",gif.images.fixed_height.url)
          contenedorGifs.appendChild(newImg);
        });
    }
  }
  document.addEventListener('DOMContentLoaded',async () => {
    document.querySelector('#buscador').addEventListener('keyup',getSuggestionsHanlder);
  });