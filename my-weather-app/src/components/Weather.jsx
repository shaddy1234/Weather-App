import React, { useState, useEffect } from 'react';
import './Weather.css';

const Weather = () => {
  const [city, setCity] = useState('Eldoret');
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d83435ff68a1ba653c852c0cc2ae13d1`);
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
      } else {
        console.error('Error fetching weather data:', data.message);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const getWeatherIcon = (weatherCondition) => {
    switch (weatherCondition) {
      case 'Rain':
        return '🌧️'; // Replace with rain icon image URL or SVG
      case 'Clear':
        return '☀️'; // Replace with sun icon image URL or SVG
      default:
        return '🌥️'; // Placeholder for other weather conditions
    }
  };

  return (
    <div className="weather-card">
      <div className="search-area">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {weatherData && (
        <div className="card">
          <div className="weather-icon">
            {getWeatherIcon(weatherData.weather[0].main)}
          </div>
          <h2>{Math.round(weatherData.main.temp - 273.15)}°C</h2>
          <h3>{weatherData.name}</h3>
          <div className="additional-info">
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} knots</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
