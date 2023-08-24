const outputMovie = document.querySelector('#output-movie');

// const api = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2022&month=OCTOBER';
const apiKey = 'd0c8e808-df7c-4341-9910-723daffd766e';

async function getData() {
    try {
        fetch([], {
            method: 'GET',
            headers: {
                'X-API-KEY': apiKey,
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                requestData(json.items)
            })
    } catch(e) {
        console.log("error")
    }
}

getData();

function requestData(getData) {
    if(getData) {
        console.log("error")
            for(let value of getData) {
                const filteredData =
                `
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
                `;
                outputMovie.innerHTML += filteredData; 
            }
    } else {
            outputMovie.innerHTML = "<h1>Sorry, no movies</h1>";
    }
}