// API url
const titleAPI_url = 'http://localhost:8000/api/v1/titles/';

// API navigation
const ask = '?';
const sortByScoreAsc = 'sort_by=-imdb_score&';
const sortByGenreCrime = 'genre_contains=crime&';
const sortByGenreHorror = 'genre_contains=horror&';
const sortByGenreWestern = 'genre_contains=western&';

// Lists to store urls of pages
var list_topMoviesOverall = [];
var list_topMoviesCrime = [];
var list_topMoviesHorror = [];
var list_topMoviesWestern = [];

// Maintenant, je veux générer les urls
function generate_url() {
    var url_askBestMovies = (titleAPI_url + ask + sortByScoreAsc);
    var url_askBestCrime = (url_askBestMovies + sortByGenreCrime);
    var url_askBestHorror = (url_askBestMovies + sortByGenreHorror);
    var url_askBestWestern = (url_askBestMovies + sortByGenreWestern);

    urlGrab(url_askBestMovies, list_topMoviesOverall);
    urlGrab(url_askBestCrime, list_topMoviesCrime);
    urlGrab(url_askBestHorror, list_topMoviesHorror);
    urlGrab(url_askBestWestern, list_topMoviesWestern);
}

// Push 10 movie's complete page into a list
async function urlGrab(url, list) {
    var response = await fetch(url);
    var data = await response.json();

    // This var change the amount of movies fetch();
    var howManyMovies = 8;

    while (list.length < howManyMovies) {
        var resultsPerPage = 5;

        while (resultsPerPage > 0) {
            response = await fetch(data.next);
            data = await response.json();

            for (let x of data.results) {
                list.push(x.url);
                resultsPerPage --;
            }
        }
    } 

    /// FOR TESTING PURPOSES ONLY ///
    let showTest = `
        <p>${list[0]}<p>
        <p>${list[1]}<p>
        <p>${list[2]}<p>
        <p>${list[3]}<p>`

    document.getElementById("test").innerHTML = showTest;
}

/////////////////////////////////////////////////// TEST: START

generate_url();

console.log(list_topMoviesOverall);
console.log(list_topMoviesCrime);
console.log(list_topMoviesHorror);
console.log(list_topMoviesWestern);

/////////////////////////////////////////////////// TEST: START

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