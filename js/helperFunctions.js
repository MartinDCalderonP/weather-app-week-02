import { showWeatherData } from './script.js';
import {
	searchInput,
	weatherDataUrl,
	searchInWeatherDataUrl,
	defaultId,
} from './commonVariables.js';

export function getWeatherData(receivedId) {
	localStorage.setItem('lastId', receivedId);

	let locationId = receivedId || defaultId;
	let fetchUrl = weatherDataUrl + locationId;

	fetch(fetchUrl)
		.then((data) => data.json())
		.then(showWeatherData)
		.catch((err) => {
			alert('El servidor devolvió un error: ', err);
		});
}

export function getLocationsData(successPromiseFunction) {
	let fetchUrl = weatherDataUrl + searchInWeatherDataUrl + searchInput.value;

	fetch(fetchUrl)
		.then((data) => data.json())
		.then(successPromiseFunction)
		.catch((err) => {
			alert('El servidor devolvió un error: ', err);
		});
}

export function getDayName(date) {
	let numberDate = new Date(date);

	const options = { weekday: 'long', timeZone: 'UTC' };

	return numberDate.toLocaleDateString('en-US', options);
}

export function debounce(fn, delay) {
	let timeoutID;

	return function (...args) {
		if (timeoutID) {
			clearTimeout(timeoutID);
		}

		timeoutID = setTimeout(() => {
			fn(...args);
		}, delay);
	};
}

export function throttle(fn, delay) {
	let last = 0;

	return function (...args) {
		const now = new Date().getTime();

		if (now - last < delay) {
			return;
		}

		last = now;
		return fn(...args);
	};
}

export function showSpinner() {
	let spinner = `<img
						id="spinner"
						class="cards-container__spinner"
						src="./img/spinner.gif"
						alt="Loading..."
					/>`;

	mainTitle.innerHTML = '';
	cardContainer.innerHTML = spinner;
}

export function setFavicon(ico) {
	let favicon = document.querySelector("link[rel='icon']");
	let icoUrl = `https://www.metaweather.com/static/img/weather/ico/${ico}.ico`;

	if (!favicon) {
		favicon = document.createElement('link');
		favicon.rel = 'icon';
		document.getElementsByTagName('head')[0].appendChild(favicon);
	}

	favicon.href = icoUrl;
}
