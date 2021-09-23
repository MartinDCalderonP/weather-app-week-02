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
