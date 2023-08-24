const contentDiv = document.querySelector('.content-rout');

function loadRouts(url) {
    console.log(url)
    fetch(url)
        .then(res => res.text())
        .then(content => {
            contentDiv.innerHTML = content 
        })
        .catch(error => {
            console.error('Error loading page:', error);
        });
}

function handleLinkClick(event) {
    event.preventDefault();
    const href = event.target.getAttribute('href');
    loadRouts(href)
}
const links = document.querySelectorAll('.nav-link a')
links.forEach(link => {
    link.addEventListener('click', (event) => handleLinkClick(event))
})