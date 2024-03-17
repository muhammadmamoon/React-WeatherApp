import React, { useState } from "react";
import axios from "axios";
import './App.css'; 

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = "80def32776356c4d544e647577e25a28"; 
  const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      setWeatherData(null);
      setError("City not found. Please enter a valid city name.");
    }
  };

  return (
    <div className="weather-app">
      <div className="container">
        <h1>Weather App</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={city}
            onChange={handleInputChange}
            placeholder="Enter city name"
          />
          <button type="submit">Search</button>
        </form>
        {error && <p className="error">{error}</p>} 
        {weatherData && (
          <div className="weather-info">
            <h2>{weatherData.name}</h2>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Weather: {weatherData.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;
