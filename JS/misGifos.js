document.addEventListener("DOMContentLoaded", () => {
  let localStorageGifsArray = [];
  document.querySelector("#gifsCreados").innerHTML = "";
  let localStorageGifs = localStorage.getItem("misGifos");
  if (localStorageGifs != null) {
    localStorageGifsArray = JSON.parse(localStorageGifs);
    document.querySelector("#conte_crear_gifo2").style.display = "none";
  }

  

 renderMisGifos();

  localStorageGifsArray.forEach((gif) => {
    document.querySelector(".contenedor_imagenes_favoritos").appendChild(gif);

    
  });
});


let deleteFromMisGifos = (e) => {
  if (typeof e != "undefined") {
      if (e.classList.contains('sacarFavoritos')) {
          let localStorageGifs = JSON.parse(localStorage.getItem('misGifos'));
          let Auxiliar = localStorageGifs ? localStorageGifs : []
          let verificacion = Auxiliar.filter(item => item.src != e.src)
          localStorage.setItem('misGifos', JSON.stringify(verificacion));
          renderMisGifos()
      }

  }
}

let downloadCreatedGif = (evento) => {
  console.log('entrando');
  let btnDownload = evento.target.parentElement.parentElement.parentElement.parentElement.children[0].getAttribute('src');
  console.log(btnDownload);
  if (evento.target.classList.contains('descargar_gifo_escritorio')) {
      arrayDescarga.map(async (gif) => {
          if (gif.source == btnDownload) {
              await fetch(gif.images.downsized.url)
                  .then((img) => {
                      img.blob().then((file) => {
                          let a = document.createElement("a");
                          a.href = URL.createObjectURL(file);
                          a.download = gif.source;
                          a.click();
                      });
                  });
          }

      })

  }
}



