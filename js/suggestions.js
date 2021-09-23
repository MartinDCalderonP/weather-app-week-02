const searchInput = document.getElementById('searchInput');
const suggestionsList = document.getElementById('suggestionsList');
let suggestions = undefined;

searchInput.addEventListener('keyup', getSuggestions);

function getSuggestions() {
	let queryUrl = `https://api.allorigins.win/raw?url=https://www.metaweather.com/api/location/search/?query=`;

	if (searchInput.value.length > 0) {
		fetch(queryUrl + searchInput.value)
			.then((data) => data.json())
			.then((data) => {
				suggestions = data;
				showSuggestionsList();
			})
			.catch((err) => {
				console.log(err);
			});
	} else {
		hideSuggestionsList();
	}
}

function showSuggestionsList() {
	if (suggestions.length > 0) {
		suggestionsList.innerHTML = '';
		suggestionsList.style.display = 'block';

		for (let i = 0; i < 5; i++) {
			let item = suggestions[i];

			if (item) {
				suggestionsList.innerHTML += `<li>${item.title}</li>`;
			}
		}
	} else {
		hideSuggestionsList();
	}
}

function hideSuggestionsList() {
	suggestionsList.style.display = 'none';
}
