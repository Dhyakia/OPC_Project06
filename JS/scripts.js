// API URL as constants
const titleAPI = 'http://localhost:8000/api/v1/titles/';

// Param. setup
const askTopScore = '?sort_by=-imdb_score';
const askFilterCrime = '&genre_contains=Crime';
const askFilterHorror = '&genre_contains=horror';
const askFilterWestern = '&genre_contains=western';

// Not very future-proof. Better use the link within the "next" key.
const nextTwo = '&page=2';

// Initilisation of the object's lists
var top_movies_all = [];
var top_movies_crime = [];
var top_movies_horror = [];
var top_movies_western = [];


// Modal window variables
var modal = document.getElementById("myModal");
var modalX = document.getElementById("closeModal");


// Next function will take an argument latter.
// Using "(this)" maybe ? or the id ?
// Anyway, i need something to identify what image has been clicked.

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