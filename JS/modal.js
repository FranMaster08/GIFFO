let AbrirModal = (e) => {
    let target =e.parentElement.parentElement.parentElement.parentElement.children[0]
    containerModal.children[3].children[0].value=  e.parentElement.parentElement.parentElement.children[2].children[0].value
    containerModal.style.display = "block";
   
    let userName = target.getAttribute('data-username')
    let datatitle = target.getAttribute('data-title')
    
    console.log('Datos',userName,datatitle);
    
    modalImg.setAttribute('src', target.src);
    modalImg.setAttribute('data-title', datatitle);
    modalImg.setAttribute('data-username', userName);
    document.getElementById('titulo_gifo').innerHTML=datatitle
    document.getElementById('gifo_usuario').innerHTML=userName
    optionsText.style.display = "flex";
}

let closeModal = () => {
    containerModal.style.display = "none";
}

const DowloadModalImg=(e)=>{


    let CriterioDescarga=e.target.parentElement.parentElement.parentElement.parentElement.children[3].children[0].value;
    let imagen=e.target.parentElement.parentElement.parentElement.parentElement.children[1];
    console.log(getCriterio(CriterioDescarga));
    downloadGif(imagen,getCriterio(CriterioDescarga))
}

const ModalFavoritos=(e,criterioDescargas)=>{
    let target = ''
    target =e.target.parentElement.parentElement.parentElement.children[1]
    let localStorageGifs = localStorage.getItem('favoritos');
    let Auxiliar=[]
    localStorageGifs?JSON.parse(localStorageGifs).map(e=>Auxiliar.push(e)):[]
    let verificacion = Auxiliar.filter(x => x.title == target.getAttribute('data-title'))
    if (verificacion.length == 0) {
       let favorito={
           url:target.src,
           title:target.getAttribute('data-title'),
           username:target.getAttribute('data-username'),
           criterioDescargas
       }
        Auxiliar.push(favorito)
        localStorage.setItem('favoritos', JSON.stringify(Auxiliar));
   

    }
    else
        console.log('Ya existe en favoritos');
}

