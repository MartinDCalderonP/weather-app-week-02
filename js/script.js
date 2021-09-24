'use strict';

import './suggestions.js';
import './search.js';
import './eventListeners.js';
import { mainTitle, cardContainer } from './commonVariables.js';
import { getWeatherData, getDayName } from './helperFunctions.js';

getLastOrDefaultData();

function getLastOrDefaultData() {
	let lastId = localStorage.getItem('lastId');

	if (lastId > 0) {
		getWeatherData(lastId);
	} else {
		getWeatherData();
	}
}

export function showWeatherData(weatherData) {
	mainTitle.innerHTML = `${weatherData.title}`;
	let cards = '';

	for (let i = 0; i < weatherData.consolidated_weather.length - 1; i++) {
		let item = weatherData.consolidated_weather[i];
		let imageUrl = `https://www.metaweather.com/static/img/weather/${item.weather_state_abbr}.svg`;

		if (i === 0) {
			setFavicon(item.weather_state_abbr);
		}

		cards += `<div class="card-container__card appear-card-${[i + 1]}">
					<h2>${getDayName(item.applicable_date)}</h2>
					<img
						class="card-container__card__weather-icon"
						src="${imageUrl}"
						alt="${item.weather_state_name}"
					/>
					<div>
						<h3>${Math.round(item.the_temp)}°C</h3>
						<p>${item.weather_state_name}</p>
					</div>
					<div>
						<p>Min: ${Math.round(item.min_temp)}°C</p>
						<p>Max: ${Math.round(item.max_temp)}°C</p>
					</div>
				</div>`;
	}

	cardContainer.innerHTML = cards;
}

function setFavicon(ico) {
	let favicon = document.querySelector("link[rel='icon']");
	let icoUrl = `https://www.metaweather.com/static/img/weather/ico/${ico}.ico`;

	if (!favicon) {
		favicon = document.createElement('link');
		favicon.rel = 'icon';
		document.getElementsByTagName('head')[0].appendChild(favicon);
	}

	favicon.href = icoUrl;
}
