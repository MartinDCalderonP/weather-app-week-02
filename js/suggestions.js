import { searchInput, suggestionsList } from './commonVariables.js';
import { getLocationsData, debounce } from './helperFunctions.js';

searchInput.addEventListener('keyup', debounce(getSuggestions, 500));

function getSuggestions() {
	getLocationsData(showSuggestionsList, hideSuggestionsList);
}

function showSuggestionsList(suggestions) {
	if (suggestions.length > 0) {
		suggestionsList.innerHTML = '';
		suggestionsList.style.display = 'block';
		searchInput.parentElement.style.borderRadius = '25px 25px 0px 0px';

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
	searchInput.parentElement.style.borderRadius = '25px';
}
