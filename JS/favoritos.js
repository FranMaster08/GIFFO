
const addFav = (e,criterioDescargas) => {
    let Src = ''
    let target = e.parentElement.parentElement.parentElement.parentElement.children[0]
    Src = typeof target == 'undefined' ? e : target
    let localStorageGifs = localStorage.getItem('favoritos');
    let Auxiliar=[]
    localStorageGifs?JSON.parse(localStorageGifs).map(e=>Auxiliar.push(e)):[]
    let verificacion = Auxiliar.filter(x => x.title == Src.getAttribute('data-title'))
    if (verificacion.length == 0) {
       let favorito={
           url:target.src,
           title:target.getAttribute('data-title'),
           username:target.getAttribute('data-username'),
           criterioDescargas
       }
        Auxiliar.push(favorito)
        localStorage.setItem('favoritos', JSON.stringify(Auxiliar));
        renderFavs()
    }
    else
        console.log('Ya existe en favoritos');

}

const renderFavs = () => {
    if(!verificarPantalla('FAVORITOS'))return
    let localStorageGifsArray = [];
    let ImagenesFavoritos=document.querySelector('#imagenes_favoritos')
    ImagenesFavoritos.innerHTML = ''
    let localStorageGifs = localStorage.getItem('favoritos');
    if (localStorageGifs != null) {
        localStorageGifsArray = JSON.parse(localStorageGifs);
        document.querySelector('#conte_favoritos2').style.display = 'none'
    }
    localStorageGifsArray.map
    (x => CreateCard(x, ['imgFav'], ImagenesFavoritos,(x) => {
            let Criterio=x.children[2].children[0].value
            x.parentElement.children[0].onclick=(e)=>AbrirModal(e.target.parentElement.children[1].children[0].children[2].children[0]);
             x.children[0].children[2].onclick=(e)=>AbrirModal(e.target);
             x.children[0].children[0].onclick = (e)=>deleteFromFavs(e.target)
             x.children[0].children[1].onclick = (e) => downloadGif(e.target.parentElement.parentElement.parentElement.parentElement.children[0],getCriterio(Criterio))


         }
           ,x.criterioDescargas ))

   
}

const deleteFromFavs = (e) => {
    let dataTitle =e.parentElement.parentElement.parentElement.parentElement.children[0].getAttribute('data-title');  
    console.log(dataTitle);
    let Auxiliar=[]
    let localStorageGifs = localStorage.getItem('favoritos');
    localStorageGifs?JSON.parse(localStorageGifs).map(e=>Auxiliar.push(e)):[]
    let verificacion = Auxiliar.filter(item => item.title != dataTitle)
    localStorage.setItem('favoritos', JSON.stringify(verificacion));
    renderFavs()
}
