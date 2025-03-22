const toggleButton = document.getElementById('toggleButton');
const contentDiv = document.getElementById('contentDiv');

toggleButton.addEventListener('click', () => {
    contentDiv.classList.toggle('hidden');
});