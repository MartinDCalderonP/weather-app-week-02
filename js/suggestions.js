import {
	searchInput,
	searchInputDiv,
	suggestionsList,
} from './commonVariables.js';
import { searchLocation } from './search.js';
import { getLocationsData, debounce } from './helperFunctions.js';

searchInput.addEventListener('keyup', debounce(getSuggestions, 500));
searchInput.addEventListener('keydown', keyNavigation);
suggestionsList.addEventListener('click', searchBySuggested);
document.addEventListener('click', clickOutsideSuggestionsList);

let suggestionsItems = suggestionsList.children;
let current = 0;

function getSuggestions(e) {
	if (!searchInput.value) {
		hideSuggestionsList();
		return;
	}

	let regex = /^[a-zA-Z]+$/;

	if (searchInput.value.match(regex)) {
		getLocationsData(showSuggestionsList);
	}
}

function showSuggestionsList(suggestions) {
	if (suggestions.length > 0) {
		suggestionsList.innerHTML = '';
		suggestionsList.style.display = 'block';
		searchInputDiv.style.borderRadius = '25px 25px 0px 0px';

		addItemsToSuggestionsList(suggestions);

		suggestionsItems[0].style.backgroundColor = '#eeeeee';
		current = 0;
	} else {
		hideSuggestionsList();
	}
}

function addItemsToSuggestionsList(suggestions) {
	for (let i = 0; i < 5; i++) {
		let item = suggestions[i];

		if (item) {
			suggestionsList.innerHTML += `<li>${item.title}</li>`;
		}
	}
}

function hideSuggestionsList() {
	suggestionsList.style.display = 'none';
	searchInputDiv.style.borderRadius = '25px';
}

function keyNavigation(e) {
	if (suggestionsItems.length > 1 && searchInput.value) {
		if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
			downAndUpArrows(e.key);
		}
	}
}

function downAndUpArrows(key) {
	suggestionsItems[current].style.backgroundColor = 'transparent';

	if (key === 'ArrowDown' && current < 4) {
		++current;
	}

	if (key === 'ArrowUp' && current > 0) {
		--current;
	}

	searchInput.value = suggestionsItems[current].textContent;

	suggestionsItems[current].style.backgroundColor = '#eeeeee';
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
