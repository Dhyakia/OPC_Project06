// API URL as constants
const genreAPI = 'http://localhost:8000/api/v1/genres/'
const titleAPI = 'http://localhost:8000/api/v1/titles/'

//Slick initializer
$(document).ready(function(){
    $('.slick-test').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3
      });
});
    
    

// Modal window variables
var modal = document.getElementById("myModal");
var btn = document.getElementsByClassName("myBtn")[0];
var span = document.getElementById("close");

// Modal window trigger
btn.onclick = function() {
    modal.style.display = "block";
}

// Modal window exit #1
span.onclick = function() {
    modal.style.display = "none";
}

// Modal window exit #2
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}