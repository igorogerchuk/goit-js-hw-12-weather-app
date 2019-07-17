import './styles.css';
import getCurrentPosition from './getGeoPosition';
import fetchWeather from './fetchWeather';

const refs = {
  icon: document.querySelector('.icon'),
  location: document.querySelector('span[data-field="location"]'),
  temperature: document.querySelector('span[data-field="temp"]'),
  humidity: document.querySelector('span[data-field="humidity"]'),
  wind: document.querySelector('span[data-field="wind"]'),
  conditions: document.querySelector('span[data-field="conditions"]'),
};

getCurrentPosition()
  .then(location => {
    console.log(location);
  })
  .catch(error => {
    console.log(error);
  });

fetchWeather('винница')
  .then(response => response.json())
  .then(weather => {
    displayWeather(weather);
    console.log(weather);
  });

function displayWeather(weather) {
  refs.icon.src = 'http:' + weather.current.condition.icon;
  refs.location.textContent = weather.location.name;
  refs.temperature.textContent = weather.current.temp_c + '\u2103';
  refs.humidity.textContent = weather.current.humidity + '%';
  refs.wind.textContent = weather.current.wind_kph + 'kph';
  refs.conditions.textContent = weather.current.condition.text;
}
