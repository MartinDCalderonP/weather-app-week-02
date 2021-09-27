import {
	searchInput,
	searchInputDiv,
	suggestionsList,
} from './commonVariables.js';
import { searchLocation } from './search.js';
import { getLocationsData, debounce } from './helperFunctions.js';

searchInput.addEventListener('keyup', debounce(getSuggestions, 500));
suggestionsList.addEventListener('click', searchBySuggested);
document.addEventListener('click', clickOutsideSuggestionsList);

function getSuggestions() {
	if (searchInput.value) {
		getLocationsData(showSuggestionsList);
	} else {
		hideSuggestionsList();
	}
}

function showSuggestionsList(suggestions) {
	if (suggestions.length > 0) {
		suggestionsList.innerHTML = '';
		suggestionsList.style.display = 'block';
		searchInputDiv.style.borderRadius = '25px 25px 0px 0px';

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
	searchInputDiv.style.borderRadius = '25px';
}

function searchBySuggested(e) {
	if (e.target.matches('li')) {
		searchInput.value = e.target.textContent;
		searchLocation();
		hideSuggestionsList();
	}
}

function clickOutsideSuggestionsList(e) {
	if (!e.target.matches('li') && !e.target.matches('ul')) {
		hideSuggestionsList();
	}
}
