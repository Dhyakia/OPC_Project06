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
const moviesPerBlock = 8;

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

/////////////////////////////////////////////////// TEST: START

// Good
// Now that i understand how to get data and put it into the HTML ...
// I need to find a way to do it for all 4 boxes.

// i'll need 2 function:
// 1. First one will take care of the top movie overall
// 2. Second function will take a list range and set 
async function getData(url) {
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

/////////////////////////////////////////////////// TEST: END


generate_url()
    .then(res =>{
        getData(array_topMoviesOverall[0]);
    })
    .then(res =>{
        // Function that takes a list and set image into the html
    })


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
        arrows: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1
    });
});