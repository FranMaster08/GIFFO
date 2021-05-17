document.addEventListener("DOMContentLoaded", () => {
  let localStorageGifsArray = [];
  document.querySelector("#gifsCreados").innerHTML = "";
  let localStorageGifs = localStorage.getItem("misGifos");
  if (localStorageGifs != null) {
    localStorageGifsArray = JSON.parse(localStorageGifs);
    document.querySelector("#conte_crear_gifo2").style.display = "none";
  }

  const misGifos = JSON.parse(localStorage.getItem("misGifos"));
  const urls = misGifos.map((id) => `https://i.giphy.com/${id}.gif`);

  localStorageGifsArray = urls.map((url) => {
    let images = document.createElement("img");
    images.setAttribute("src", url);
    images.classList.add("trending");
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
  });

  localStorageGifsArray.forEach((gif) => {
    document.querySelector(".contenedor_imagenes_favoritos").appendChild(gif);

    
  });
});


let deleteFromMisGifos = (e) => {
  if (typeof e != "undefined") {
      if (e.classList.contains('sacarFavoritos')) {
          let localStorageGifs = JSON.parse(localStorage.getItem('misGifos'));
          let Auxiliar = localStorageGifs ? localStorageGifs : []
          let verificacion = Auxiliar.filter(item => item != e.src)
          localStorage.setItem('misGifos', JSON.stringify(verificacion));
          
      }

  }
}


document.querySelector("#gifsCreados").addEventListener("click", (e) => {
  deleteFromMisGifos(
    e.target.parentElement.parentElement.parentElement.parentElement
      .children[0]
  );
});

//   document
//     .querySelector(".contenedor_imagenes_favoritos")
//     .addEventListener("click", downloadGif);
// });
