import React from "react";

const WeatherDisplay = ({ weather }) => {
  if (!weather) {
    return <div>Henüz bir şehir seçilmedi...</div>;
  }

  return (
    <div className="weather-display">
      <h2>{weather.city}</h2>
      <p>Sıcaklık: {weather.temperature}°C</p>
      <p>Durum: {weather.description}</p>
    </div>
  );
};

export default WeatherDisplay;

