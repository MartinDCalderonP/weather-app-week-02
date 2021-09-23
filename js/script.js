'use strict';

import './suggestions.js';

let weatherData = undefined;

getWeatherData();

function getWeatherData() {
	fetch(
		'https://api.allorigins.win/raw?url=https://www.metaweather.com/api/location/2487956/'
	)
		.then((data) => data.json())
		.then((data) => {
			weatherData = data;
			updater();
		})
		.catch((err) => {
			console.log(err);
		});
}

function updater() {
	showMainTitle();
	showCards();
}

function showMainTitle() {
	const mainTitle = document.getElementById('mainTitle');

	mainTitle.innerHTML += `5 Day Weather - ${weatherData.title}`;
}

function showCards() {
	const cardContainer = document.getElementById('cardContainer');

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
										<h3>${Math.round(item.the_temp)}°C</h3>
										<p>${item.weather_state_name}</p>
										<p>Min: ${Math.round(item.min_temp)}°C</p>
										<p>Max: ${Math.round(item.max_temp)}°C</p>
									</div>`;
	}
}

function getDayName(date) {
	let numberDate = new Date(date);

	const options = { weekday: 'long' };

	return numberDate.toLocaleDateString('en-us', options);
}
