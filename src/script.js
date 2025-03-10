function searchWeatherTemp(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.city;

  let temperature = document.querySelector("#weather-app-temp");
  temperature.innerHTML = Math.round(response.data.temperature.current);

  let weatherIcon = document.querySelector("#weather-app-icon");
  weatherIcon.innerHTML = `<img src="${response.data.condition.icon_url}" alt="${response.data.condition.icon}"  class="weather-app-icon"/>`;

  let skyDescription = document.querySelector("#weather-app-sky");
  skyDescription.innerHTML = response.data.condition.description;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.temperature.humidity}%`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `${response.data.wind.speed}km/h`;

  let time = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  time.innerHTML = formatDate(date); //when passing a function you don't add the backticks and currybraces you write the function as it is.

  displayForecast(response.data.city);
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  let day = days[date.getDay()];
  return day;
}

function displayForecast(city) {
  let apiKey = "5765tb49aco10f17ace1b436b0213fc4";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit=metric`;

  axios.get(apiUrl).then(getForecast);
}

function getForecast(response) {
  console.log(response.data);
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-days">
    <div class="weather-predictions-day">${formatDay(day.time)}</div>
    <div class="weather-predictions-icon">
    <img src="${day.condition.icon_url}" alt="${
          day.condition.icon
        }" class="weather-predictions-icon"/>
    </div>
    <div class="weather-predictions-temperatures">
      <div class="weather-predictions-temp"><strong>${Math.round(
        day.temperature.maximum
      )}°</strong></div>
      <div class="weather-predictions-temp">${Math.round(
        day.temperature.minimum
      )}°</div>
    </div>
  </div>`;
    }
  });

  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}

let searchInput = document.querySelector("#search-form");
searchInput.addEventListener("submit", displayWeather);

searchCity("Nairobi");
