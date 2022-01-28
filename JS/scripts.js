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

generate_url();
console.log(array_topMoviesOverall);

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

/////////////////////////////////////////////////// TEST: START

/// Donc: 

/// 1. Je doit trouver comment faire des requêtes à travers des urls.
    /// Je veux mettre l'image du meilleur film overall
    /// L'image se trouve: dans "array_topMoviesOverall", position 0, à "image_url"
    /// ATTENTION: il s'agit d'un lien qui doit devenir la source, non pas d'une image.
    /// Une fois targété*, je veux l'afficher sur le site.



    
/// 2. Ensuite, je doit récupérer les données
    ///

/// 3. Les afficher au bon endroit sur le site
    ///

/// 4. Faire les eventuelles changements nécéssaires en CSS
    ///

/// 5. Afficher les bonnes données au seins de la fenêtre modale.
    /// 

/////////////////////////////////////////////////// TEST: START