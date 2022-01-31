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
async function urlGrab(url, array) {
    var response = await fetch(url);
    var data = await response.json();

    // This var change the amount of movies fetch();
    var howManyMovies = 10;

    while (array.length < howManyMovies) {
        var resultsPerPage = 5;

        while (resultsPerPage > 0) {
            response = await fetch(data.next);
            data = await response.json();

            for (let x of data.results) {
                array.push(x.url);
                resultsPerPage --;
            }
        }
    }
}


/////////////////////////////////////////////////// TEST: START

// Good
async function getData(url) {
    let response = await fetch(url);
    let data = await response.json();

    api_img = data.image_url;
    api_title = data.title;

    var test_targetImg = document.getElementById("test_img");
    var test_targetTitle = document.getElementById("test_para");
    
    test_targetImg.src = api_img;
    test_targetTitle.innerHTML = data.title;
};

/////////////////////////////////////////////////// TEST: START



// Because function are async - i'll need to wait AFTER using generate_url
// to make use of the urls ---> usage of 'then' and 'catch' will be in order.
generate_url()
    .then(res =>{
        getData(array_topMoviesOverall[0]);
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