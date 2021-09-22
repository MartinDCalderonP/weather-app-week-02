const searchInput = document.getElementById('searchInput');
const suggestionsList = document.getElementById('suggestions');
let suggestions = undefined;

searchInput.addEventListener('keyup', getSuggestions);

function getSuggestions(e) {
	suggestionsList.innerHTML = '';

	let queryUrl = `https://api.allorigins.win/raw?url=https://www.metaweather.com/api/location/search/?query=`;

	if (searchInput.value.length > 0) {
		fetch(queryUrl + searchInput.value)
			.then((data) => data.json())
			.then((data) => {
				suggestions = data;
				showSuggestions();
			});
	}
}

function showSuggestions() {
	for (let i = 0; i < 5; i++) {
		let item = suggestions[i];

		if (item) {
			suggestionsList.innerHTML += `<li>${item.title}</li>`;
		}
	}
}
