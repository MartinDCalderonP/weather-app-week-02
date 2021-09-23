import { getWeatherData, throttle } from './helpers.js';

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
let searchResults;

searchButton.addEventListener('click', throttle(searchLocation, 5000));

function searchLocation(e) {
	e.preventDefault();
	pauseSearchButton();

	let queryUrl = `https://api.allorigins.win/raw?url=https://www.metaweather.com/api/location/search/?query=`;

	fetch(queryUrl + searchInput.value)
		.then((data) => data.json())
		.then((data) => {
			searchResults = data;
			showSearchResults();
		})
		.catch((err) => {
			console.log(err);
		});
}

function showSearchResults() {
	if (searchResults[0].woeid) {
		getWeatherData(searchResults[0].woeid);
	}
}

function pauseSearchButton() {
	searchButton.disabled = true;

	setTimeout(() => (searchButton.disabled = false), 5000);
}
