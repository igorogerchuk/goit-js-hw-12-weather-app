export default function fetchWeather(query) {
  const base = 'http://api.apixu.com/v1/';
  const resource = 'current.json';
  const requestParameters = `?key=1f404656e7ff496abf1220436191707&q=${query}`;
  return fetch(base + resource + requestParameters);
}
