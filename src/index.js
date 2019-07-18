import PNotify from 'pnotify/dist/es/PNotify.js';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons.js';
import PNotifyStyleMaterial from 'pnotify/dist/es/PNotifyStyleMaterial.js';
import getGeoPosition from './getGeoPosition';
import fetchWeather from './fetchWeather';
import 'pnotify/dist/PNotifyBrightTheme.css';
import 'material-design-icons/iconfont/material-icons.css';
import './styles.css';

PNotify.defaults.styling = 'material';
PNotify.defaults.icons = 'material';

const refs = {
  weatherSection: document.querySelector('#weather'),
  icon: document.querySelector('.icon'),
  location: document.querySelector('span[data-field="location"]'),
  temperature: document.querySelector('span[data-field="temp"]'),
  humidity: document.querySelector('span[data-field="humidity"]'),
  wind: document.querySelector('span[data-field="wind"]'),
  conditions: document.querySelector('span[data-field="conditions"]'),
  searchForm: document.querySelector('#search-form'),
};

getGeoPosition()
  .then(location => {
    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;
    const query = `${latitude},${longitude}`;

    if (query) {
      PNotify.success({
        text: 'Показана погода в вашем регионе.',
      });
      fetchWeather(query)
        .then(response => response.json())
        .then(weather => {
          refs.weatherSection.classList.remove('is-hidden');
          displayWeather(weather);
        });
    }
  })
  .catch(error => {
    PNotify.error({
      text: 'Нет прав доступа к геопозиции, используйте поиск по имени города.',
    });
  });

refs.searchForm.addEventListener('submit', searchFormHandler);

function searchFormHandler(e) {
  e.preventDefault();
  const city = e.currentTarget.elements.city.value;
  fetchWeather(city)
    .then(response => response.json())
    .then(weather => {
      refs.weatherSection.classList.remove('is-hidden');
      displayWeather(weather);
    })
    .catch(error => {
      PNotify.error({
        text: 'Города с таким названием не найдено.',
      });
    });
}

function displayWeather(weather) {
  refs.icon.src = 'https:' + weather.current.condition.icon;
  refs.location.textContent = weather.location.name;
  refs.temperature.textContent = weather.current.temp_c + '\u2103';
  refs.humidity.textContent = weather.current.humidity + '%';
  refs.wind.textContent = weather.current.wind_kph + 'kph';
  refs.conditions.textContent = weather.current.condition.text;
}
