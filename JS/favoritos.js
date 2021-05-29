
const addFav = (e) => {
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
           username:target.getAttribute('data-username')
       }
        Auxiliar.push(favorito)
        localStorage.setItem('favoritos', JSON.stringify(Auxiliar));
       
    }
    else
        console.log('Ya existe en favoritos');

}

const renderFavs = () => {
    let localStorageGifsArray = [];
    let ImagenesFavoritos=document.querySelector('#imagenes_favoritos')
    ImagenesFavoritos.innerHTML = ''
    let localStorageGifs = localStorage.getItem('favoritos');
    if (localStorageGifs != null) {
        localStorageGifsArray = JSON.parse(localStorageGifs);
        document.querySelector('#conte_favoritos2').style.display = 'none'
    }
    localStorageGifsArray.map(x => CreateCard(x, ['imgFav'], ImagenesFavoritos,
         (x) => 
                x.children[0].children[0].onclick = (e)=>deleteFromFavs(e.target)
            ))

   
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
