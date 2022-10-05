'use strict';

const MY_API_TOKEN = config.MY_API_TOKEN;

const API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=' +
  MY_API_TOKEN +
  '&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_URL =
  'https://api.themoviedb.org/3/search/movie?api_key=4f6690e5920a431c7b65b9bf0b5869bf&query="';

const main = document.getElementById('main');
const form = document.getElementById('search_form');
const search = document.getElementById('search');
const logo = document.querySelector('.logo');

logo.addEventListener('click', () => {
  main.innerHTML = '';
  getMovies(API_URL);
});

// Get initial Movies
getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  // console.log(data.results.length);


  if (data.results.length === 0) {
    main.innerHTML = '';

    const createErrorEL = document.createElement('div');
    createErrorEL.classList.add('errorHandle');

    createErrorEL.innerHTML = `<h1>Oh no 🙅🏻 ! There is no such movie exists , please return to Home page or search anything relevant</h1>`;

    main.appendChild(createErrorEL);
  }
  else{
    showMovies(data.results);
    console.log(data.results)
  }
}

function showMovies(movies) {
  main.innerHTML = '';

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, vote_count, popularity, overview, release_date, adult} = movie;

    const createEL = document.createElement('div');
    createEL.classList.add('movie');

    createEL.innerHTML = `
    <img src="${IMG_PATH + poster_path}" alt="movie image" class="movie-img" />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getOverviewRating(
            vote_average
          )}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3 class="overview">
          <p style="font-size:2rem">${title}</p>
          <p style="font-size:1.5rem">Age Group : ${getAdultStatus(adult)}</p>
          Released Date:  ${release_date}</br>
          Ratings: ${vote_average} out of total ${vote_count}</br>
          Popularity: ${popularity}</br>
          Over View : ${overview}
        </h3>
        </div>
    `;

    main.appendChild(createEL);
  });
}

function getOverviewRating(rating) {
  if (rating >= 8) {
    return 'green';
  } else if (rating >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

function getAdultStatus(adult){
  if(adult){
    return '18+';
  }
  else
  {
    return '14+'
  }
}
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_URL + searchTerm);
    search.value = '';
  } else {
    window.location.reload();
  }
});
