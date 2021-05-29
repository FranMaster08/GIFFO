
const getRenderedImage = () => {
    let cards = document.querySelector('#resultados_busqueda')
    let imagenesBuscadas = []
    for (let i = 0; i < cards.childElementCount; i++) {
        imagenesBuscadas.push(

            {
                title: cards.children[i].children[0].getAttribute('data-title'),
                src: cards.children[i].children[0].getAttribute('src')

            })
    }
    return imagenesBuscadas
}
const loadTrendings = async () => {
    try {
        let requestOptions = {
            method: 'GET'
        };
        let response = await fetch(gifoUrl, requestOptions)
        return response.json();
    } catch (error) {
        console.log(error);
    }
}
const renderTrendings = async () => {
    try {
        let trendings = await loadTrendings()
        if (trendings) {
            arrayDescarga = trendings.data
            arrayDescarga.map(x => x.url = x.images.fixed_height.url)
            trendings.data.map(x => CreateCard(x, ['trending'], containerCarrousel,
                (x) => {
                    
                    x.parentElement.children[0].onclick=(e)=>AbrirModal(e.target.parentElement.children[1].children[0].children[2].children[0]);
                    x.children[0].children[2].onclick=(e)=>AbrirModal(e.target);
                    x.children[0].children[1].onclick = (e) => downloadGif(e.target.parentElement.parentElement.parentElement.parentElement.children[0],getCriterio(TREND))
                    x.children[0].children[0].onclick = (e) => addFav(e.target,TREND)
                    getApi.insertBefore(containerCarrousel, arrowRigth)
                },TREND))
            
        }

    } catch (error) {
        console.log(error);
    }

}
const slideRight = () => {
    l++
    for (var i of slick) {
        if (l == 0) i.style.left = "0px";
        if (l == 1) i.style.left = "-640px";
        if (l == 2) i.style.left = "-1380px";
        if (l == 3) i.style.left = "-2120px";
        if (l == 4) i.style.left = "-2860px";
        if (l > 4) l = 4

    }

}
const slideLeft = () => {
    l--
    for (var i of slick) {
        if (l == 0) i.style.left = "0px";
        if (l == 1) i.style.left = "-740px";
        if (l == 2) i.style.left = "-1480px";
        if (l == 3) i.style.left = "-2220px";
        if (l < 0) l = 4

    }

}




