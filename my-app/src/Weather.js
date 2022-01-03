import React, { useState } from "react";
import axios from "axios";

export default function Weather(){
    const [city, setCity] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [weather, setWeather] = useState({});
    

    function displayWeather(response) {
        setLoaded(true);
        setWeather({
          temperature: response.data.main.temp,
          wind: response.data.wind.speed,
          humidity: response.data.main.humidity,
          icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon()}@2x.png`,
          description: response.data.weather[0].description
        });
      }

      function handleSubmit(event) {
        event.preventDefault();
    
        let apiKey = "85a6a002dde6a2ba9ef1aec1f5d8fcc6";
        let apiUrl = `http://api.openweathermap.org/data/2.5/weather?id=${city}&appid=${apiKey}&units`;
        axios.get(apiUrl).then(displayWeather);
      }

      function updateCity(event) {
        setCity(event.target.value);
      }

      let form = (
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Enter a city..."
            onChange={updateCity}
          />
          <button type="Submit">Search</button>
        </form>
      );
    
      if (loaded) {
        return (
          <div>
            {form}
            <ul>
              <li>Temperature: {Math.round(weather.temperature)}°C</li>
              <li>Description: {weather.description}°C</li>
              <li>Humidity {weather.humidity}</li>
              <li>Wind {weather.wind} km/h</li>
              <li>
                <img src={weather.icon} alt={weather.description} />
              </li>
            </ul>
          </div>
        );
      } else {
        return form;
      }   
}