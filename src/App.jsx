import React, { useState } from "react";
import CitySelector from "./components/CitySelector";
import WeatherDisplay from "./components/WeatherDisplay";
import About from "./components/About";
import "./index.css";

const App = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [showAbout, setShowAbout] = useState(false);

  const cities = ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Adana"];
  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

  const handleCitySelect = (city) => {
    setSelectedCity(city.name);
    fetchWeatherData(city.name);
  };

  const fetchWeatherData = async (city) => {
    try {
      const response = await fetch(
        `${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Hava durumu verisi alınamadı.");
      }
      const data = await response.json();
      const weatherInfo = {
        city: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
      };
      setWeatherData(weatherInfo);
    } catch (error) {
      console.error(error);
      setWeatherData(null);
    }
  };

  const getBackgroundImage = () => {
    if (!weatherData) return "url('/assets/backgrounds/default.jpg')";

    const description = weatherData.description.toLowerCase();
    if (description.includes("sun") || description.includes("clear")) {
      return "url('/assets/backgrounds/sunny.jpg')";
    } else if (description.includes("rain")) {
      return "url('/assets/backgrounds/rainy.jpg')";
    } else if (description.includes("snow")) {
      return "url('/assets/backgrounds/snowy.jpg')";
    } else if (description.includes("cloud")) {
      return "url('/assets/backgrounds/cloudy.jpg')";
    }
    return "url('/assets/backgrounds/default.jpg')";
  };

  return (
    <div
      className="app"
      style={{
        backgroundImage: getBackgroundImage(),
      }}
    >
      <div className="city-info">
        {weatherData ? (
          <>
            <h1>{weatherData.city}</h1>
            <p>{weatherData.temperature}°C - {weatherData.description}</p>
          </>
        ) : (
          <h1>Şehir Seçin</h1>
        )}
      </div>
      <div className="search-bar">
        <CitySelector cities={cities} onCitySelect={handleCitySelect} />
      </div>
    </div>
  );
};

export default App;

