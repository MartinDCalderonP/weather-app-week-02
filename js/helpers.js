export function getDayName(date) {
	let numberDate = new Date(date);

	const options = { weekday: 'long' };

	return numberDate.toLocaleDateString('en-us', options);
}

export function debounce(func, time) {
	let timer;

	clearTimeout(timer);

	timer = setTimeout(func, time);
}
