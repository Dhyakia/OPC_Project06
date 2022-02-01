// API url
const titleAPI_url = 'http://localhost:8000/api/v1/titles/';

// API navigation
const ask = '?';
const sortByScoreAsc = 'sort_by=-imdb_score&';
const sortByGenreCrime = 'genre_contains=crime&';
const sortByGenreHorror = 'genre_contains=horror&';
const sortByGenreWestern = 'genre_contains=western&';

// urls arrays
var array_topMoviesOverall = [];
var array_topMoviesCrime = [];
var array_topMoviesHorror = [];
var array_topMoviesWestern = [];

// Variable that set the number of movie per block
const moviesPerBlock = 7;

// Generate the urls
async function generate_url() {
    let url_askBestMovies = (titleAPI_url + ask + sortByScoreAsc);
    let url_askBestCrime = (url_askBestMovies + sortByGenreCrime);
    let url_askBestHorror = (url_askBestMovies + sortByGenreHorror);
    let url_askBestWestern = (url_askBestMovies + sortByGenreWestern);

    await urlGrab(url_askBestMovies, array_topMoviesOverall);
    await urlGrab(url_askBestCrime, array_topMoviesCrime);
    await urlGrab(url_askBestHorror, array_topMoviesHorror);
    await urlGrab(url_askBestWestern, array_topMoviesWestern);
}

// Push urls into given array
async function urlGrab(url, array){
    var response = await fetch(url);
    var data = await response.json();

    while(array.length < moviesPerBlock){
        var resultsPerPage = 5;
        for(let x of data.results){
            array.push(x.url);
            resultsPerPage-- ;
            if(resultsPerPage == 0){
                response = await fetch(data.next);
                data = await response.json();
            }
        }
    }
}

// Take a single url, fetch data and set [image+title+description] as the best movie overall
async function bestMovieSetup(url) {
    let response = await fetch(url);
    let data = await response.json();

    api_img = data.image_url;
    api_title = data.title;
    api_description = data.description;

    var imgTarget = document.getElementById("top-movie-img");
    var titleTarget = document.getElementById("top-movie-title");
    var descriptionTarget = document.getElementById("top-movie-description");

    imgTarget.src = api_img;
    titleTarget.innerHTML = api_title;
    descriptionTarget.innerHTML = api_description;
};

// Take an array of urls and category, and set the image into said category
async function bestMoviesCarousel(arrayofurls, category){
    for(let i = 0; i < moviesPerBlock; i++){
        let response = await fetch(arrayofurls[i]);
        let data = await response.json();

        var api_img = data.image_url;

        var childData = document.createElement("img");
        childData.src = api_img;
        childData.alt = "movie_poster";
        childData.onclick = function() {modalTrigger()};
        childData.onmouseover = function() {api_title};

        if (category == "overall") {
            var parentDiv = document.getElementById("best_movies_overall");
            parentDiv.appendChild(childData);
        } else if (category == "crime") {
            var parentDiv = document.getElementById("best_movies_crime");
            parentDiv.appendChild(childData);
        } else if(category == "horror") {
            var parentDiv = document.getElementById("best_movies_horror");
            parentDiv.appendChild(childData);
        } else if(category == "western") {
            var parentDiv = document.getElementById("best_movies_western");
            parentDiv.appendChild(childData);
        }
    }
};

/////////////////////////////////////////////////// TEST: START

// Je doit modifier la façon dont j'applique .slick
// L'appliquer une fois qu'une div comporte le même nombre que moviesPerBlock


/////////////////////////////////////////////////// TEST: END

generate_url()
    .then(res =>{
        // .slice = from pos 1 to end
        bestMovieSetup(array_topMoviesOverall[0]);
        bestMoviesCarousel(array_topMoviesOverall.slice(1), "overall");
        bestMoviesCarousel(array_topMoviesCrime, "crime");
        bestMoviesCarousel(array_topMoviesHorror, "horror");
        bestMoviesCarousel(array_topMoviesWestern, "western");
    });

// Modal window variables
var modal = document.getElementById("myModal");
var modalX = document.getElementById("closeModal");

// Modal window trigger
function modalTrigger() {
    modal.style.display = "block";
}

// Modal window exit #1
modalX.onclick = function() {
    modal.style.display = "none";
}

// Modal window exit #2
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Slick :[show 4, slide 1 by 1, with arrows & infinite loop]

$(document).ready(function() {
    $('.slick-slider').slick({
        lazyLoad: 'ondemand',
        arrows: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1
    });
});
