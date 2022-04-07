import React, { useState } from "react";
import WeatherInfo from "./WeatherInfo.js";
import axios from "axios";
import "./Weather.css";


export default function Weather(props) {
const [weatherData, setWeatherData] = useState({ready: false});
const [city, setCity] = useState(props.defaultCity);
function handleResponse(response) {
  setWeatherData({
    ready: true,
    temperature: response.data.main.temp,
    description: response.data.weather[0].description,
    icon: response.data.weather[0].icon,
    humidity: response.data.main.humidity,
    wind: response.data.wind.speed,
    city: response.data.name,
    date: new Date(response.data.dt * 1000),
  
  });

}
function handleSubmit(event) {
  event.preventDefault();
}

function handleCityChange(event) {
setCity(event.target.value);
search();
}

function search() {
  const apiKey = `b3e1522d82584110f6073765cb9a8c79`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(handleResponse);
}

if (weatherData.ready) {
return (
  <div className="Weather">
    <form onSubmit={handleSubmit}>
    <div className="row">
      <div className="col-9">
      <input type="search" 
      placeholder="Enter a city..."
      className="form-control"
      autoFocus="on"
      onChange={handleCityChange}
      />
    </div>
    <div className="col-3">
    <input 
    type="submit" value="search" className="btn btn-primary w-100"/>
</div>
</div>
</form>
<WeatherInfo data={weatherData} />
  </div>
);
} else {
  search();
 return "Loading..."
}
}
