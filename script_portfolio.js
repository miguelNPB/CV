const hamburguerButton = document.getElementById('hamburguerButton');
const contentDiv = document.getElementById('contentDiv');

if (window.innerWidth < 767) {
    contentDiv.classList.toggle('hidden');
}

const containerProyectos = document.getElementById('proyectContainer');
const proyectosItems = containerProyectos.getElementsByTagName('div');

const modalVideo = document.getElementById('modalVideo');
const titleTextModal = document.getElementById('modal-title-text');
const footerTextModal = document.getElementById('modal-footer-text');
const videoSrcModal = document.getElementById('modal-src-video');
const linkSrcModal = document.getElementById('modal-src-link');

Array.from(proyectosItems).forEach((div) => {
    const img = div.querySelector('img');
    img.addEventListener('click', function (){
        let videoSrc = img.getAttribute('data-video');
        let link = img.getAttribute('data-link');
        let titleText = img.getAttribute('data-title-text');
        let footerText = img.getAttribute('data-footer-text');

        titleTextModal.textContent = titleText;
        footerTextModal.textContent = footerText;
        videoSrcModal.setAttribute('src', videoSrc);
        linkSrcModal.setAttribute('href', link);
    })
});