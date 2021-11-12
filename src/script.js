let cityDate = document.querySelector(".city-date");
let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

cityDate.innerHTML = `${day} ${hours}:${minutes}`;

//2
function search(event) {
  event.preventDefault();

  let searchInput = document.querySelector(".input-text");

  let h2 = document.querySelector("h2");
  h2.innerHTML = `${searchInput.value}`;
  callAPI(searchInput.value);
}

let form = document.querySelector(".form");
form.addEventListener("submit", search);

//3
let unit = "c";
const tempC = 28;

function changeUnit(event) {
  event.preventDefault();
  let temperature = document.querySelector(".unit");
  if (unit === "c") {
    temperature.innerHTML = (tempC * 9) / 5 + 32 + "°F";
    unit = "f";
  } else {
    temperature.innerHTML = tempC + "°C";
    unit = "c";
  }
}

let changeIcon = document.querySelector(".change-icon");
changeIcon.addEventListener("click", changeUnit);

let apiKey = "fc6aaa11eb87ef192ffff5b3c7cdceb9";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather";

function showTemperature(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let unit = document.querySelector(".unit");
  unit.innerHTML = `${temperature}°C`;
}

function callAPI(city) {
  axios
    .get(`${apiUrl}?appid=${apiKey}&q=${city}&units=metric`)
    .then(showTemperature);
}

function showTempAndCity(response) {
  showTemperature(response);
  let h2 = document.querySelector("h2");
  h2.innerHTML = response.data.name;
}

function showPosition(position) {
  axios
    .get(
      `${apiUrl}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`
    )
    .then(showTempAndCity);
}

function currentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let geolocation = document.querySelector("#geolocation");
geolocation.addEventListener("click", currentLocation);
