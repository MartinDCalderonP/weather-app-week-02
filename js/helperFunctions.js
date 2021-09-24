import { showWeatherData } from './script.js';
import {
	searchInput,
	weatherAPIUrl,
	searchInWeatherAPIUrl,
	defaultId,
} from './commonVariables.js';

export function getWeatherData(receivedId) {
	let locationId = receivedId || defaultId;
	let fetchUrl = weatherAPIUrl + locationId;

	fetch(fetchUrl)
		.then((data) => data.json())
		.then(showWeatherData)
		.catch((err) => {
			console.log(err);
		});
}

export function getLocationsData(successPromiseFunction, emptyStringFunction) {
	if (searchInput.value.length > 0) {
		let fetchUrl = weatherAPIUrl + searchInWeatherAPIUrl + searchInput.value;

		fetch(fetchUrl)
			.then((data) => data.json())
			.then(successPromiseFunction)
			.catch((err) => {
				alert(err);
			});
	} else {
		emptyStringFunction;
	}
}

export function getDayName(date) {
	let numberDate = new Date(date);

	const options = { weekday: 'long' };

	return numberDate.toLocaleDateString('en-us', options);
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
