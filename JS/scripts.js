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

/////////////////////////////////////////////////// TEST: START

// Dernier objectif: afficher les données dans une fenêtre modale:

    // A. 

    // B.  

    // C. 

    // D.  

    // E.  

/////////////////////////////////////////////////// TEST: END

// Fetch data on said url and display it inside the modal window
async function getModalData(url){
    let response = await fetch(url);
    let data = await response.json();

    api_img = data.image_url;                       // Text (url)
    api_title = data.title;                         // Text
    api_genres = data.genres;                       // array w Text
    api_releasedate = data.year;                    // Text
    api_rating = data.avg_vote;                     // Num
    api_imdbscore = data.imdb_score;                // Num
    api_realisator = data.directors;                // array w Text
    api_actors = data.actors;                       // array w Text
    api_duration = data.duration;                   // Num (raw minutes)
    api_country = data.countries;                   // Text
    api_BoxOffice = "I DONT KNOW";                  // ??? No idea yet
    api_longdescription = data.long_description;    // Text

    let parentDiv = document.getElementById("modalInfos");

    let child_Img = document.createElement("img");
    child_Img.src = api_img;
    parentDiv.appendChild(child_Img);  

    let child_title = document.createElement("p");
    child_title.innerHTML = "Titre: " + api_title;
    parentDiv.appendChild(child_title);  

    let child_genres = document.createElement("p");
    child_genres.innerHTML = "Genres: " + api_genres;
    parentDiv.appendChild(child_genres);
    
    let child_releasedate = document.createElement("p");
    child_releasedate.innerHTML = "Date de sortie: " + data.year;
    parentDiv.appendChild(child_releasedate);

    let child_rating = document.createElement("p");
    child_rating.innerHTML = "Score moyen: " + data.avg_vote;
    parentDiv.appendChild(child_rating);

    let child_imdbscore = document.createElement("p");
    child_imdbscore.innerHTML = "Score imbd: " + data.imdb_score;
    parentDiv.appendChild(child_imdbscore);

    let child_realisator = document.createElement("p");
    child_realisator.innerHTML = "Réalisateurs: " + data.directors;
    parentDiv.appendChild(child_realisator);

    let child_actors = document.createElement("p");
    child_actors.innerHTML = "Acteurs: " + data.actors;
    parentDiv.appendChild(child_actors);

    let child_duration = document.createElement("p");
    child_duration.innerHTML = "Durée en minutes: " + data.duration;
    parentDiv.appendChild(child_duration);

    let child_country = document.createElement("p");
    child_country.innerHTML = "Pays d'origine: " + data.countries;
    parentDiv.appendChild(child_country);

    // ???
    let child_BoxOffice = document.createElement("p");
    child_BoxOffice.innerHTML = "Box Office: " + api_BoxOffice;
    parentDiv.appendChild(child_BoxOffice);

    let child_longdescription = document.createElement("p");
    child_longdescription.innerHTML = "Description: " + data.long_description;
    parentDiv.appendChild(child_longdescription);
};

// Loop that empty the modal window of all its content when closed. (remove childs)
function removeModalData(){
    const parentDiv = document.getElementById("modalInfos");
    while(parentDiv.lastElementChild){
        parentDiv.removeChild(parentDiv.lastElementChild);
    }
}


// Modal window trigger
async function modalTrigger(url) {
    modal.style.display = "block";
    getModalData(url);
};

// Modal window exit #1
modalX.onclick = function() {
    modal.style.display = "none";
    removeModalData();
};

// Modal window exit #2
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        removeModalData();
    }
};
