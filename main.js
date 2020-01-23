var api = "KSW4mzb0OnZ7Tk76WeLj7DdtK6dYUSBl";
var baseURL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json";

var body = document.querySelector('body');
var searchBtn = document.querySelectorAll('input')[0];
var submitBtn = document.querySelectorAll('input')[1];

var section = document.querySelector('section');
var movieDisplay = document.querySelector(".lead");

if (searchBtn.value === '') {
    document.querySelector('.jumbotron-class').style.display = "none";
}

submitBtn.addEventListener('click', submitHandler);

function submitHandler(e) {
    document.querySelector('.jumbotron-class').style.display = "block";
    fetchResults(e);
}

function fetchResults(e) {
    e.preventDefault();

    var url = baseURL + '?query=' + searchBtn.value + '&api-key=' + api;

    if (searchBtn.value !== '') {
        fetch(url).then(function(response) {
            return response.json();
        }).then(function(data) {

            displayMovies(data);
        });
    }
}


function displayMovies(data) {
    // var movieDetails = data;
    // for(var i=0;i<movieDetails.length;i++) {

    // }
    // var movieName = document.querySelector('.display-4');
    // var headLine = document.createElement('h3');
    // var some = document.querySelector('.container-class');
    // var summary = document.querySelector('.summary');
    // var releasedDate = document.createElement('h4');
    // var artcileLink = document.createElement('a');
    // var movieImage = document.createElement('img');
    // movieName.innerText = movieDetails.results[0].display_title;
    // headLine.innerText = movieDetails.results[0].headline;
    // summary.innerText = movieDetails.results[0].summary_short;
    // artcileLink.href = movieDetails.results[0].link.url;
    // artcileLink.innerText = movieDetails.results[0].link.suggested_link_text;
    // movieImage.src = movieDetails.results[0].multimedia.src;
    // some.appendChild(headLine);
    // // body.appendChild(summary);
    // body.appendChild(artcileLink);
    // body.appendChild(movieImage);
    // window.console.log("movieDetails", movieDetails)
}