// API URL as constants
const titleAPI_url = 'http://localhost:8000/api/v1/titles/';

// First, let's generate the urls


/////////////////////////////////////////////////// TEST: START

async function getApi(url) {
    const response = await fetch(url);
    console.log(response);

    var data = await response.json();
    console.log(data);
    
    show(data);
}

function show(data) {
    let tab = 
    `<tr>
        <th>id</th>
        <th>url</th>
        <th>title</th>
        <th>year</th>
    </tr>`

    for (let r of data.results) {
        tab += `<tr>
        <th>${r.id}</th>
        <th>${r.url}</th>
        <th>${r.title}</th>
        <th>${r.year}</th>
       </tr>`;
    }

    document.getElementById("test").innerHTML = tab;
}

// Calling the function
getApi(titleAPI_url);

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