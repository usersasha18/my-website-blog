const output = document.querySelector('.wrapper-search');
const titleMovie = document.querySelector('.title-movie');
const form = document.querySelector('form');
const searchButton = form.querySelector('button');
const sortedPanel = document.querySelector('.sorted-panel');

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

// функция, которая делает запрос на сервер и возвращает json
function outputResponse(keyword ,movies) {
    const title = `<h1>Фильмы найденные по запросу ${keyword}</h1>`
    const sortPanel =
    `
    <div class="inner-sorted">
        <button class="sorted-button">отсортировать по дате выхода</button>
        <button class="sorted-button">отсортировать по рейтингу</button>
        <button class="sorted-button">отсортировать по алфавиту</button>
    </div>
    `;
    output.innerHTML = '';
    for(let value of movies ) {
        console.log(value.rating);
        console.log(value.year);
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
    sortedPanel.innerHTML = sortPanel

    // сортировка
    const sortedButtons = document.querySelectorAll('.sorted-button');
    sortedButtons.forEach(button => {
        button.addEventListener('click', () => {
            const newListMovies = [...movies]
            const sortBy = button.textContent;
            switch(sortBy) {
                case 'отсортировать по дате выхода':
                    newListMovies.sort((a, b) => a.year - b.year)
                    outputResponse(keyword ,newListMovies)
                    break;
                case 'отсортировать по рейтингу':
                    newListMovies.sort((a, b) => b.rating - a.rating)
                    outputResponse(keyword ,newListMovies)
                    break;
                case 'отсортировать по алфавиту':
                    newListMovies.slice().sort((a, b) => {
                        if (a.nameRu && b.nameRu) {
                            return a.nameRu.localeCompare(b.nameRu);
                        }
                        return 0;
                    });
                    outputResponse(keyword ,newListMovies)
                    break;
                default: console.log(4)
            }
        });
    });
}
//функция, которая принимает ключивое слово и массив с фильмами и выводит результат  

// функция, которая получает данные с инпута и по клику вызывает функцию рендеринга
function getValuesFromInput() {
    const searchBar = form.querySelector('input');
    let searchBarValue = searchBar.value;
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
// событие на кнопку
searchButton.addEventListener('click', getValuesFromInput);