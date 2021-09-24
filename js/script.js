'use strict';

import './suggestions.js';
import './search.js';
import { mainTitle, cardContainer } from './commonVariables.js';
import { getWeatherData, getDayName } from './helperFunctions.js';

getWeatherData();

export function showWeatherData(weatherData) {
	mainTitle.innerHTML = `5 Day Weather - ${weatherData.title}`;
	cardContainer.innerHTML = '';

	for (let i = 0; i < weatherData.consolidated_weather.length - 1; i++) {
		let item = weatherData.consolidated_weather[i];
		let imageUrl = `https://www.metaweather.com/static/img/weather/${item.weather_state_abbr}.svg`;

		cardContainer.innerHTML += `<div class="card-container__card">
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
}
