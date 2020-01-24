var api = "KSW4mzb0OnZ7Tk76WeLj7DdtK6dYUSBl";
var baseURL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json";

var body = document.querySelector('body');
var searchBtn = document.querySelectorAll('input')[0];
var submitBtn = document.querySelectorAll('input')[1];

var section = document.querySelector('section');
var movieDisplay = document.querySelector(".lead");
var jumboDiv = document.querySelector('.jumbotron-class');
var containerDiv = document.querySelector('.container-class');

// if (searchBtn.value === '') {
//     document.querySelector('.jumbotron-class').style.display = "none";
// }

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

    var movieDetails = data.results;
    if (movieDetails == 0) {
        var paraError = document.createElement('p');
        paraError.textContent = "No results found!";
        paraError.classList.add('jumbotron-class')
        section.appendChild(paraError);
    } else {
        for (var i = 0; i < movieDetails.length; i++) {
            var movie_title = document.createElement('h1');
            var movie_headline = document.createElement('h2');
            var movie_summary = document.createElement('h4');
            var movie_link = document.createElement('link');
            var movie_image = document.createElement('img');
            var clearfix = document.createElement('div');

            movie_title.innerText = movieDetails[i].display_title;
            movie_headline.innerText = movieDetails[i].headline;
            movie_summary.innerText = movieDetails[i].summary_short;
            movie_link.href = movieDetails[i].link.url;
            movie_link.innerText = movieDetails[i].link.suggested_link_text;
            movie_image.src = movieDetails[i].multimedia.src;

            clearfix.setAttribute('class', 'clearfix');

            containerDiv.appendChild(movie_title);
            containerDiv.appendChild(movie_headline);
            containerDiv.appendChild(movie_summary);
            containerDiv.appendChild(movie_image);
            containerDiv.appendChild(movie_link);
            var hr = document.createElement('hr');
            hr.classList.add('.hr-line')
            containerDiv.appendChild(hr);
        }
    }
}