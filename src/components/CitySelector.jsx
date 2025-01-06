import React, { useState, useEffect } from "react";

const CitySelector = ({ onCitySelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Şehir arama fonksiyonu
  const handleSearchChange = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length > 2) { // Arama terimi en az 3 karakter olmalı
      setLoading(true);
      try {
        const API_KEY = import.meta.env.VITE_API_KEY; // .env dosyasındaki API_KEY
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/find?q=${term}&type=like&sort=population&cnt=10&appid=${API_KEY}`
        );

        const data = await response.json();
        
        if (data.list) {
          setSuggestions(data.list); // API'den gelen şehirleri öneri olarak göster
        }
      } catch (error) {
        console.error("Şehir verileri yüklenemedi:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  };

  // Öneri üzerine tıklanıldığında şehir seçme
  const handleSuggestionClick = (city) => {
    setSearchTerm(city.name); // Şehri inputa yaz
    setSuggestions([]); // Öneri listesini sıfırla
    onCitySelect(city); // Seçilen şehri üst bileşene ilet
  };

  return (
    <div className="city-selector">
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Şehir ara..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="form-control"
        />
      </div>
      {loading && <p>Yükleniyor...</p>}
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((city, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(city)}
              className="suggestion-item"
            >
              {city.name}, {city.sys.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CitySelector;
