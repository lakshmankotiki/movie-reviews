/** displaying movie reviews using NewYorkTimes API
 * We provide one search box for user to search for movie
 * and will display the results based on movie name and 
 * will display the reviews of the respective movie
 */
var api = "KSW4mzb0OnZ7Tk76WeLj7DdtK6dYUSBl";
var baseURL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json";

//Creation of DOM
var body = document.querySelector('body');
var section = document.querySelector('section');
var movieDisplay = document.querySelector(".lead");
var jumboDiv = document.querySelector('.jumbotron-class');
var containerDiv = document.querySelector('.container-class');

//getting search box and sub,it
var searchBtn = document.querySelectorAll('input')[0];
var submitBtn = document.querySelectorAll('input')[1];

if (searchBtn.value === '') {
    jumboDiv.style.display = "none";
}

//click event and handler when user click on submit button
submitBtn.addEventListener('click', submitHandler);

function submitHandler(e) {
    if (searchBtn.value === '') {
        jumboDiv.style.display = "none";
    } else {
        // document.querySelector('.jumbotron-class').style.display = "block";
        fetchResults(e);
    }
}

//fetching results from API
function fetchResults(e) {
    e.preventDefault();

    var url = baseURL + '?query=' + searchBtn.value + '&api-key=' + api;

    //if search box having value
    if (searchBtn.value !== '') {

        fetch(url).then(function(response) {
            return response.json();
        }).then(function(data) {

            displayMovies(data);
        });
    }
}


//displaying movies on body using DOM
function displayMovies(data) {

    //removing extra element if available
    if(document.querySelector('p')) {
        document.querySelector('p').remove();
    }

    //checking and removing if already any childs containers available
    while (containerDiv.firstChild) {
        containerDiv.removeChild(containerDiv.firstChild);
    }

    var movieDetails = data.results;
    //what if no results found from API
    if (movieDetails == 0) {
        var paraError = document.createElement('p');
        paraError.textContent = "No results found!";
        paraError.classList.add('jumbotron-class');
        section.appendChild(paraError);
    } else {
        //looping if we get mopre than one results from the API
        for (var i = 0; i < movieDetails.length; i++) {
            var movie_title = document.createElement('h1');
            var movie_headline = document.createElement('h3');
            var movie_summary = document.createElement('p');
            var movie_link = document.createElement('a');
            var movie_image = document.createElement('img');

            //assigning values to the DOM from results
            movie_title.innerText = "Movie Name is: " + "'" +movieDetails[i].display_title+ "'";
            movie_headline.innerText = movieDetails[i].headline;
            movie_summary.innerText = movieDetails[i].summary_short;
            //checking the review link availble or not
            if(movieDetails[i].link.url) {
                movie_link.href = movieDetails[i].link.url;
                movie_link.textContent = movieDetails[i].link.suggested_link_text;
            }
            //checking image links available or not
            if(movieDetails[i].multimedia) {
                movie_image.src = movieDetails[i].multimedia.src;
            }

            //applying styles for DOM
            movie_link.style.left = "10px";
            movie_link.setAttribute("target", "_target");

            //appending data to the conainer
            containerDiv.appendChild(movie_title);
            containerDiv.appendChild(movie_headline);
            containerDiv.appendChild(movie_summary);
            containerDiv.appendChild(movie_image);
            containerDiv.appendChild(movie_link);

            //if we get more than one results then displaying results in block type
            document.querySelector('.jumbotron-class').style.display = "block";


            //adding line for differenciating movies if more than one movie
            var hr = document.createElement('hr');
            hr.classList.add('.hr-line');
            containerDiv.appendChild(hr);

            //applying styles using setAttribute
            hr.setAttribute("height", "20px");
        }
    }
}