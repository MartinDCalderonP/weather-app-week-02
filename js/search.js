import {
	form,
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

form.addEventListener('submit', (e) => e.preventDefault());
searchButton.addEventListener('click', throttle(searchLocation, 500));

export function searchLocation(e) {
	if (e) {
		e.preventDefault();
	}

	if (searchInput.value) {
		showSpinner();
		getLocationsData(showSearchResults);
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

function showSpinner() {
	let spinner = `<img
						id="spinner"
						class="card-container__spinner"
						src="./img/spinner.gif"
						alt="Loading..."
					/>`;

	mainTitle.innerHTML = '';
	cardContainer.innerHTML = spinner;
}
