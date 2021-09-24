import {
	searchInput,
	searchInputDiv,
	searchButton,
} from './commonVariables.js';

searchInput.addEventListener('focusin', inputFocusIn);
searchInput.addEventListener('focusout', inputFocusOut);

function inputFocusIn() {
	searchInputDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
	searchInputDiv.style.borderColor = 'darkblue';
	searchButton.style.color = 'darkblue';
}

function inputFocusOut() {
	searchInputDiv.style.boxShadow = 'none';
	searchInputDiv.style.borderColor = 'var(--lightblue)';
	searchButton.style.color = 'var(--lightblue)';
}
