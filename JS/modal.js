let AbrirModal = (e) => {

    let target =e.parentElement.parentElement.parentElement.parentElement.children[0]
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
    console.log(e.target);
}

const ModalFavoritos=(e)=>{
    let target = ''
    if (document.title == 'GIFOS HOME'){
        target =e.target.parentElement.parentElement.parentElement.children[1]
    }else{
        target =e.target.parentElement.parentElement.parentElement.parentElement.children[1]
    }
   
    console.log(target);
    let localStorageGifs = localStorage.getItem('favoritos');
    let Auxiliar=[]
    localStorageGifs?JSON.parse(localStorageGifs).map(e=>Auxiliar.push(e)):[]
    let verificacion = Auxiliar.filter(x => x.title == target.getAttribute('data-title'))
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