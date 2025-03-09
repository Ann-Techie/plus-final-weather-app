function searchWeatherTemp(response) {
  console.log(response.data);

  let city = document.querySelector("#city");
  city.innerHTML = response.data.city;

  let temperature = document.querySelector("#weather-app-temp");
  temperature.innerHTML = Math.round(response.data.temperature.current);

  let weatherIcon = document.querySelector("#weather-app-icon");
  weatherIcon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;

  let skyDescription = document.querySelector("#weather-app-sky");
  skyDescription.innerHTML = response.data.condition.description;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.temperature.humidity}%`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `${response.data.wind.speed}km/h`;

  let time = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  time.innerHTML = formatDate(date); //when passing a function you don't add the backticks and currybraces you write the function as it is.
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    return `0${minutes}`;
  }

  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "5765tb49aco10f17ace1b436b0213fc4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;

  axios.get(apiUrl).then(searchWeatherTemp);
}

function displayWeather(event) {
  event.preventDefault();

  let searchBar = document.querySelector("#city-input");

  searchCity(searchBar.value);
}

function showForecast() {
  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = `<div class="weather-forecast-days">
    <div class="weather-predictions-day">Mon</div>
    <div class="weather-predictions-icon">🌞</div>
    <div class="weather-predictions-temperatures">
      <div class="weather-predictions-temp">22°</div>
      <div class="weather-predictions-temp">24°</div>
    </div>
  </div>`;
}

let searchInput = document.querySelector("#search-form");
searchInput.addEventListener("submit", displayWeather);

searchCity("Nairobi");
showForecast();
