import {
	mainTitle,
	cardContainer,
	searchInput,
	searchButton,
} from './commonVariables.js';
import {
	getWeatherData,
	getLocationsData,
	throttle,
} from './helperFunctions.js';

searchButton.addEventListener('click', throttle(searchLocation, 500));

function searchLocation(e) {
	e.preventDefault();
	pauseSearchButton();
	getLocationsData(showSearchResults, getWeatherData);
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
