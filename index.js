
const APIKEY = "6064aa7f48af8302eb07108537086979";

async function trendingMovies(){
    let data = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${APIKEY}`);
    let collect = await data.json();
    let output = collect.results;
    MovieList(output);
    let header = document.querySelector('.title-header');
    header.innerHTML = `Trending Movies`;
    const showTrendingMoviesButton = document.getElementById('show-trending-movies');
    showTrendingMoviesButton.hidden = true;

}



async function catchgenres(){
    let data = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKEY}&language=en-US`);
    let collect = await data.json();
    let goutput = collect.genres;
    return goutput;
    
}


async function genres(genreid){
    const goutput = await catchgenres(); 
    for (let i = 0; i < goutput.length; i++) {
        if (goutput[i].id === genreid) {
          return goutput[i].name;

        }
      }
}
async function searchForMovies(){
    const keyword = document.getElementById('searched-keyword');
    let data = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&query=${keyword.value}`);
    let collect = await data.json();
    let output = collect.results;
    let movieContainer = document.querySelector('#movieContainer');
    let header = document.querySelector('.title-header');
    header.innerHTML = `Search result for "${keyword.value}"`;
    movieContainer.innerHTML = '';
    MovieList(output);
    const showTrendingMoviesButton = document.getElementById('show-trending-movies');
    showTrendingMoviesButton.hidden = false;

}

const keywordInput = document.getElementById('searched-keyword');
keywordInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    searchForMovies();
  }
});

async function displayTrendingMovies() {
    let movieContainer = document.querySelector('#movieContainer');
    movieContainer.innerHTML = ''; 
    await trendingMovies();
}


async function MovieList(output){
    let movieContainer = document.querySelector('#movieContainer');
    for (let i = 0 ; i < output.length; i++) {

       
        let tMovie = document.createElement("div");
        tMovie.classList.add("movieInfo");

        let img = document.createElement("img");
        img.src = 'https://image.tmdb.org/t/p/w500'+output[i].poster_path;
        img.classList.add('movieimg');


        tMovie.appendChild(img);

        let movieInfo = document.createElement('div');

        let mName = document.createElement('p');
        mName.textContent = output[i].title;
        mName.classList.add('title');

        movieInfo.appendChild(mName);


        let mReleaseDate = document.createElement('p');
        mReleaseDate.textContent = 'Release date: '+output[i].release_date;
        mReleaseDate.classList.add('releasedate');
        movieInfo.appendChild(mReleaseDate);

        let mDesc = document.createElement('p');
        mDesc.textContent = 'Summery: '+output[i].overview;
        mDesc.classList.add('desc');
        movieInfo.appendChild(mDesc);

        let mGenre = document.createElement('p');
        mGenre.textContent = 'Genre: '
        const genreIds = output[i].genre_ids;
        for (let j = 0; j < genreIds.length; j++) {
            const genreName = await genres(genreIds[j]);
            mGenre.textContent += genreName;
            if (j < genreIds.length - 1) {
                mGenre.textContent += ', ';
            }
        }
        
        mGenre.classList.add('genre');
        movieInfo.appendChild(mGenre);

        tMovie.appendChild(movieInfo);

        movieContainer.appendChild(tMovie);
        
    }

}

trendingMovies();