var api = "KSW4mzb0OnZ7Tk76WeLj7DdtK6dYUSBl";
var baseURL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json";

var body = document.querySelector('body');
var searchBtn = document.querySelectorAll('input')[0];
var submitBtn = document.querySelectorAll('input')[1];

var movieDisplay = document.querySelector(".lead");

submitBtn.addEventListener('click', submitHandler);

function submitHandler(e) {
    fetchResults(e);
}

function fetchResults(e) {
    e.preventDefault();

    var url = baseURL + '?query=' + searchBtn.value + '&api-key=' + api;

    if (searchBtn.value !== '') {
        fetch(url).then(function(response) {
            return response.json();
        }).then(function(data) {
            var movieDetails = JSON.stringify(data);

        });
    }
}