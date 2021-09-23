import { mainTitle, cardContainer } from './script.js';
import { getWeatherData, throttle } from './helpers.js';

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', throttle(searchLocation, 500));

function searchLocation(e) {
	e.preventDefault();
	pauseSearchButton();

	let queryUrl = `https://api.allorigins.win/raw?url=https://www.metaweather.com/api/location/search/?query=`;

	if (searchInput.value) {
		fetch(queryUrl + searchInput.value)
			.then((data) => data.json())
			.then(showSearchResults)
			.catch((err) => {
				console.log(err);
			});
	} else {
		getWeatherData();
	}
}

function showSearchResults(searchResults) {
	if (searchResults[0]?.woeid) {
		getWeatherData(searchResults[0].woeid);
	} else {
		searchNotFound();
	}
}

function searchNotFound() {
	mainTitle.innerHTML = `Weather data for "${searchInput.value}" not found. <br> Search again please.`;
	mainTitle.style.color = 'red';
	cardContainer.innerHTML = '';
}

function pauseSearchButton() {
	searchButton.disabled = true;

	setTimeout(() => (searchButton.disabled = false), 5000);
}
