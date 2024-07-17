
const movieName = document.getElementById('searchMovie');
const search = document.getElementById('searchBtn');
const movieCard = document.querySelector('.movieCard');

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '312d15c7f6mshdf4f3c2e753a11ep181ebejsne3c4c1595810',
        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
    }
};

search.addEventListener('click', (e) => {
    e.preventDefault();

    const movies = movieName.value;
    movieCard.textContent = '';

    if (movies === '') {
        setError("Enter The Movie Name");
    }
    else {
        setSuccess();
        fetchMovieData(movies);
    }
})

async function fetchMovieData(movie) {
    try {
        const url = `https://imdb8.p.rapidapi.com/auto-complete?q=${movie}`;
        const response = await fetch(url, options);
        console.log(response)

        const data = await response.json();
        console.log(data);

        const movieData = data.d;

        movieData.map((lists => {
            console.log(lists);
            const cardData = document.createElement('div');
            cardData.innerHTML = `
            <div class = "card">
            <img src="${lists.i.imageUrl}" alt="${lists.l}">
            <p>Name : <span>${lists.l}</span> </p>
            <p>Cast : <span>${lists.s}</span> </p>
            <p>Year : <span>${lists.y}</span> </p>
            </div>
            `
            movieCard.appendChild(cardData);
        }))
    }
    catch (error) {
        console.error(error);
    }
}

function setError(message) {
    let errordata = document.createElement("p");
    errordata.textContent = message;
    errordata.classList.add('error-text');

    movieCard.appendChild(errordata);
}

function setSuccess() {
    movieCard.textContent = '';
}