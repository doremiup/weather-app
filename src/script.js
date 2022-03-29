//current time
let currentTime = document.querySelector("#current-time-date");
let today = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  let hour = date.getHours();
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = "0" + minute;
  }
  let amPm = "";
  if (hour < 12) {
    amPm = "AM";
  } else {
    amPm = "PM";
  }
  return `${day}, ${hour}:${minute} ${amPm}`;
}

currentTime.innerHTML = formatDate(today);

// ***** geolocation and search engine

function showWeather(response) {
  let todayTemp = response.data.main.temp;

  let todayTempEl = document.querySelector("#degree");
  let cityEl = document.querySelector("#current-city");
  let todayDescEl = document.querySelector("#today-desc");

  todayDescEl.innerHTML = response.data.weather[0].description;
  todayTempEl.innerHTML = Math.round(todayTemp);
  cityEl.innerHTML = response.data.name;
}
let apiKey = "672cd353a0673f84df74e3b81351ed80";

function handlePosition(position) {
  let apiKey = "672cd353a0673f84df74e3b81351ed80";

  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

let locatingBtn = document.querySelector("#locating-btn");
locatingBtn.addEventListener(
  "click",
  navigator.geolocation.getCurrentPosition(handlePosition)
);

//city search

let formEl = document.querySelector("form");

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#form-input");
  let apiKey = "672cd353a0673f84df74e3b81351ed80";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}

formEl.addEventListener("submit", searchCity);
