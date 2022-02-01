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
        let api_img = data.image_url;

        let childData = document.createElement("img");
        childData.src = api_img;
        childData.alt = "movie_poster";
        childData.onclick = function() {modalTrigger()};

        if (category == "overall") {
            let parentDiv = document.getElementById("best_movies_overall");
            parentDiv.appendChild(childData);
            if(parentDiv.childElementCount == moviesPerBlock){
                $(document).ready(function(){
                    $('#best_movies_overall').slick({
                        lazyLoad: 'ondemand',
                        arrows: true,
                        infinite: true,
                        slidesToShow: 4,
                        slidesToScroll: 1
                    })
                })
            }
        } else if (category == "crime") {
            let parentDiv = document.getElementById("best_movies_crime");
            parentDiv.appendChild(childData);
            if(parentDiv.childElementCount == moviesPerBlock){
                $(document).ready(function(){
                    $('#best_movies_crime').slick({
                        lazyLoad: 'ondemand',
                        arrows: true,
                        infinite: true,
                        slidesToShow: 4,
                        slidesToScroll: 1
                    })
                })
            }
        } else if(category == "horror") {
            let parentDiv = document.getElementById("best_movies_horror");
            parentDiv.appendChild(childData);
            if(parentDiv.childElementCount == moviesPerBlock){
                $(document).ready(function(){
                    $('#best_movies_horror').slick({
                        lazyLoad: 'ondemand',
                        arrows: true,
                        infinite: true,
                        slidesToShow: 4,
                        slidesToScroll: 1
                    })
                })
            }

        } else if(category == "western") {
            let parentDiv = document.getElementById("best_movies_western");
            parentDiv.appendChild(childData);
            if(parentDiv.childElementCount == moviesPerBlock){
                $(document).ready(function(){
                    $('#best_movies_western').slick({
                        lazyLoad: 'ondemand',
                        arrows: true,
                        infinite: true,
                        slidesToShow: 4,
                        slidesToScroll: 1
                    })
                })
            }
        }
    }
};

/////////////////////////////////////////////////// TEST: START

// Dernier objectif: afficher les données dans une fenêtre modale.
    // 1. Créer une fonction qui prend un argument permettant de reconnaitre
    // de quel image la modale s'ouvre.

    // 2. L'argument permet d'identifier dans la liste, par sa pos ou autre,
    // puis effectuer les calls sur l'url, et en extraire les informations.

    // 3. Mettre la methode en .then après modalTrigger et prier trés fort
    // que rien n'explose pendant l'évaluation.

async function getDataModal(arg){
    let response = await fetch(arg);
    let data = await response.json();

    api_img = data.image_url;                       // Text (url)
    api_title = data.title;                         // Text
    api_fullgenre = data.genres;                    // List w Text
    api_releasedate = data.year;                    // Text
    api_rating = data.avg_vote;                     // Num
    api_imdbscore = data.imdb_score;                // Num
    api_realisator = data.directors;                // List w Text
    api_actors = data.actors;                       // List w Text
    api_duration = data.duration;                   // Num (raw minutes)
    api_country = data.countries;                   // Text
//  api_BoxOffice = ;                               // ??? No idea yet
    api_fulldescription = data.long_description;    // Text

    let child_Img = document.createElement()
    child_Img.src = api_img;

    let parentDiv = document.getElementById("modalInfos");
    parentDiv.appendChild(child_Img);    
}

/////////////////////////////////////////////////// TEST: END

// 2 methods here :
    // First method: takes an already existing <img> and replace the src=""
    // Second method: document.createElement to create a brand new <img>
generate_url()
    .then(res =>{
        bestMovieSetup(array_topMoviesOverall[0]);
        // .slice = from pos 1 to end
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
};

// Modal window exit #1
modalX.onclick = function() {
    modal.style.display = "none";
};

// Modal window exit #2
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
