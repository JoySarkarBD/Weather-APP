function getId(selector) {
  return document.querySelector(selector);
}

const key = "3371667f69747b7e6e308b2c4b826f83";

let weatherInfo = {};

// getting permission for location to user and by the location fetching data through API
if (window.navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      //   console.log(position);
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const uri = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
      fetchData(uri);
    },
    (error) => {
      const uri = `https://api.openweathermap.org/data/2.5/weather?q=Dhaka&appid=${key}`;
      fetchData(uri);
      console.log(error);
    }
  );
}

// API Fetching Function
function fetchData(uri) {
  fetch(uri)
    .then((res) => res.json())
    .then((data) =>
      // (weatherInfo = data)
      {
        const conditionIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        const cityAndCountry = data.name + ", " + data.sys.country;
        const weatherCondition = data.weather[0].main;
        const temp = data.main.temp - 273.15;
        const pressure = data.main.pressure;
        const humidity = data.main.humidity;
        weatherInfo = {
          conditionIcon,
          cityAndCountry,
          weatherCondition,
          temp,
          pressure,
          humidity,
        };
      }
    )
    .catch((error) => {
      return alert("Enter valid city name.........!")
    })
    .finally(() => {
      displayData(weatherInfo);
    });
}

// Display Data Fcuntion
function displayData({
  conditionIcon,
  cityAndCountry,
  weatherCondition,
  temp,
  pressure,
  humidity,
}) {
  getId("#condition_img").src = conditionIcon;
  getId("#cityName").innerHTML = cityAndCountry;
  getId("#condition").innerHTML = weatherCondition;
  getId("#temp").innerHTML = temp.toFixed(2);
  getId("#pressure").innerHTML = pressure;
  getId("#humidity").innerHTML = humidity;
}

// getting data on enter keypress from search button
getId("#searchBtn").addEventListener("click", function () {
  const cityName = getId("#search_inp").value;
  if (!cityName) {
    return alert("Enter A City Name First......!");
  }
  const uri = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`;
  fetchData(uri);
  getId("#search_inp").value = "";
});

// getting data on enter keypress from input field
getId("#search_inp").addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    let cityName = getId("#search_inp").value;
    if (!cityName) {
      return alert("Enter A City Name First......!");
    }
    const uri = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`;
    fetchData(uri);
    getId("#search_inp").value = "";
  }
});
