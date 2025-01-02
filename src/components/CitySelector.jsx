import React, { useState, useEffect } from "react";

const CitySelector = ({ onCitySelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    // Şehir listesini JSON dosyasından yükle
    const loadCities = async () => {
      try {
        const response = await fetch("/assets/city.list.json");
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Şehir verileri yüklenemedi:", error);
      }
    };

    loadCities();
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length > 2) {
      const filteredCities = cities
        .filter((city) =>
          city.name.toLowerCase().includes(term.toLowerCase())
        )
        .slice(0, 10); // Maksimum 10 öneri
      setSuggestions(filteredCities);
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
      <input
        type="text"
        placeholder="Şehir ara..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="form-control"
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((city, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(city)}
              className="suggestion-item"
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CitySelector;

