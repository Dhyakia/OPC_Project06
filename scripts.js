// Target the modal ...
var modal = document.getElementById("modal-window");
// ... the image ...

// getElementsByClassName return a collection of items, starting at 0.
// I need the modal to open if i click on any image.


var image = document.getElementsByClassName("image-target")[6];
// and the "close" button.
var close_modal = document.getElementsByClassName("close-modal")[0];

// Open the modal window when user click on image
image.onclick = function() {
    modal.style.display = "block";
}

// Close the modal window when user click on the "close" icon
close_modal.onclick = function() {
    modal.style.display = "none";
}

// Close the modal window when user click outside of the modal window
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}