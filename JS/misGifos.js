

document.addEventListener("DOMContentLoaded", () => {

  document.querySelector("#gifsCreados").innerHTML = "";
  let localStorageGifs = localStorage.getItem("misGifos");
  if (localStorageGifs != null) 
    document.querySelector("#conte_crear_gifo2").style.display = "none";
  
 renderMisGifos();

  
});


let renderMisGifos = () => {

  const misGifos = JSON.parse(localStorage.getItem("misGifos"));
  if(!misGifos)return
  misGifos.map((item) => {
      CreateCard(item,['imgFav'],document.querySelector("#gifsCreados"),(x)=>{
           x.parentElement.children[1].children[1].innerHTML=''
           x.parentElement.children[0].onclick=(e)=>AbrirModal(e.target.parentElement.children[1].children[0].children[2].children[0]);
           x.children[0].children[2].onclick=(e)=>AbrirModal(e.target);
           x.children[0].children[1].onclick = (e) => downloadGif(e.target.parentElement.parentElement.parentElement.parentElement.children[0],getCriterio(GIFFO))
          
           x.children[0].children[0].onclick = (e) => addFav(e.target,GIFFO)

          },GIFFO)

  });
}

