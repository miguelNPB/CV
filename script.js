const hamburguerButton = document.getElementById('hamburguerButton');
const contentDiv = document.getElementById('contentDiv');

const containerNav = document.getElementById('navLinksContainer')
const navLinks = containerNav.getElementsByTagName('a')

hamburguerButton.addEventListener('click', () => {
    contentDiv.classList.toggle('hidden');
});

Array.from(navLinks).forEach((link) =>{
    link.addEventListener('click', (event) => {
    if (window.innerWidth < 767) {
        contentDiv.classList.toggle('hidden');
    }
    })
});