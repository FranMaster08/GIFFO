let main = () => {
    if (document.title == 'FAVORITOS') {
        renderFavs()
        renderTrendings()
    }
    if (document.title == 'GIFOS HOME') {
        renderTrendings()
    }
    if (document.title == 'MIS GIFOS') {
        renderTrendings()
        renderMisGifos()
    }
}
arrowRigth?.addEventListener('click', slideRight)
arrowLeft?.addEventListener('click', slideLeft)
x?.addEventListener('click', closeModal)
document.getElementById('ModalFav')?.addEventListener('click',ModalFavoritos)
document.querySelector('#btn_descarga_mobile').addEventListener('click',DowloadModalImg)
main()