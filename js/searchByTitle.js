const output = document.querySelector('.wrapper-search');
const titleMovie = document.querySelector('.title-movie');
const form = document.querySelector('form');
const searchButton = form.querySelector('button');


const api = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword`;
const apiKey = 'd0c8e808-df7c-4341-9910-723daffd766e';

async function getMovieByTitle(keyword) {
    try {
        const response = await fetch(api + `?keyword=${keyword}&page=1`, {
            method: 'GET',
            headers: {
                'X-API-KEY': apiKey,
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json()
        outputResponse(data.keyword, data.films)    
    } catch(e) {
        console.log("Произошла ошибка!")
    }
}


function outputResponse(keyword ,movies) {
    const title = `<h1>Фильмы найденные по запросу ${keyword}</h1>`

    output.innerHTML = '';

    for(let value of movies ) {
        if(value.nameRu == undefined) continue;
        let htmlTemplate = `   
        <div class="movie-card">
            <div class="movie-image">
                <img class="inner-image" src="${value.posterUrl}" alt="film1">
            </div>
            <div class="movie-content">
                <div class="inner-content">
                    <p class="title-movie">${value.nameRu}</p>
                    <button id="watchMovie">
                        <a>Перейти</a>
                    </button>
                </div>
            </div>
        </div>
    `
    output.innerHTML += htmlTemplate;
}
titleMovie.innerHTML = title
}

// get values from inputs
function getValuesFromInput() {
    const searchBar = form.querySelector('input');
    const searchBarValue = searchBar.value;
    if(!searchBarValue) {
        titleMovie.innerHTML = '<h1>Введите ключивое слово для поиска</h1>'
        searchBar.style.border = "2px solid red"
        searchBar.placeholder = "введите название"
    }
    else {
        searchBar.style.border = "none "
        getMovieByTitle(searchBarValue)
    }
    // clear input
    searchBarValue = "";
}   

searchButton.addEventListener('click', getValuesFromInput);


// sort functions 

function sortByTitle(data) {

}

function sortByRaiting(data) {

}

function sortByData(data) {

}