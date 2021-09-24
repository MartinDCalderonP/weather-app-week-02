import { showWeatherData } from './script.js';

const allOriginsAPIUrl = `https://api.allorigins.win/raw?url=`;
const metaWeatherAPIUrl = `https://www.metaweather.com/api/location/`;
const defaultId = `2487956`;

export function getWeatherData(receivedId) {
	let locationId = receivedId || defaultId;

	fetch(allOriginsAPIUrl + metaWeatherAPIUrl + locationId)
		.then((data) => data.json())
		.then(showWeatherData)
		.catch((err) => {
			console.log(err);
		});
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
