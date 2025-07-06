const hamburguerButton = document.getElementById('hamburguerButton');
const contentDiv = document.getElementById('contentDiv');

if (window.innerWidth < 767) {
contentDiv.classList.toggle('hidden');
}

hamburguerButton.addEventListener('click', () => {
    contentDiv.classList.toggle('hidden');
});

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

const buttonPortfolioTodos = document.getElementById("portfolio-toggle-todos");
const buttonPortfolioProgramacion = document.getElementById("portfolio-toggle-programacion");
const buttonPortfolioArtistatecnico = document.getElementById("portfolio-toggle-artistatecnico");
const buttonPortfolioOtros = document.getElementById("portfolio-toggle-otros");

function togglePortfolio(type)
{
    buttonPortfolioTodos.classList.remove('portfolio-button-selected');
    buttonPortfolioProgramacion.classList.remove('portfolio-button-selected');
    buttonPortfolioArtistatecnico.classList.remove('portfolio-button-selected');
    buttonPortfolioOtros.classList.remove('portfolio-button-selected');

    switch (type)
    {
        case "Todos":
            buttonPortfolioTodos.classList.add('portfolio-button-selected');
            Array.from(proyectosItems).forEach((div) => {
                div.style.display = 'flex';
            });
            break;
        case "Programacion":
            buttonPortfolioProgramacion.classList.add('portfolio-button-selected');
            Array.from(proyectosItems).forEach((div) => {
                const img = div.querySelector('img')
                let type = img.getAttribute("proyect-type");

                if (!type.includes("programacion")){
                    div.style.display = 'none';
                } else{
                    div.style.display = 'flex';
                }
            });
            break;
        case "ArtistaTecnico":
            buttonPortfolioArtistatecnico.classList.add('portfolio-button-selected');
            Array.from(proyectosItems).forEach((div) => {
                const img = div.querySelector('img')
                let type = img.getAttribute("proyect-type");

                if (!type.includes("artistatecnico")){
                    div.style.display = 'none';
                } else{
                    div.style.display = 'flex';
                }
            });
            break;
        case "Otros":
            buttonPortfolioOtros.classList.add('portfolio-button-selected');
            Array.from(proyectosItems).forEach((div) => {
                const img = div.querySelector('img')
                let type = img.getAttribute("proyect-type");

                if (!type.includes("otros")){
                    div.style.display = 'none';
                } else{
                    div.style.display = 'flex';
                }
            });
            break;
    }
}

buttonPortfolioTodos.addEventListener('click', () => togglePortfolio("Todos"));
buttonPortfolioProgramacion.addEventListener('click', () => togglePortfolio("Programacion"));
buttonPortfolioArtistatecnico.addEventListener('click', () => togglePortfolio("ArtistaTecnico"));
buttonPortfolioOtros.addEventListener('click', () => togglePortfolio("Otros"));