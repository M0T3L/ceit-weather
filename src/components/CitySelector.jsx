import React, { useState, useEffect } from "react";

const CitySelector = ({ onCitySelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchChange = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length > 2) {
      setLoading(true);
      try {
        const API_KEY = import.meta.env.VITE_API_KEY;
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/find?q=${term}&type=like&sort=population&cnt=10&appid=${API_KEY}`
        );

        const data = await response.json();
        
        if (data.list) {
          setSuggestions(data.list);
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

  const handleSuggestionClick = (city) => {
    setSearchTerm(city.name);
    setSuggestions([]);
    onCitySelect(city);
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
