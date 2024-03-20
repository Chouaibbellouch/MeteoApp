import React, { useState } from 'react';
import WeatherSearch from './WeatherSearch';
import WeatherDisplay from './WeatherDisplay';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [weatherData, setWeatherData] = useState(null);

    const handleSearch = async (location) => {
      try {
          const response = await fetch(`http://localhost:3001/weather?city=${location}`);
          if (!response.ok) {
              throw new Error('Erreur réseau');
          }
          const data = await response.json();
          setWeatherData(data);
      } catch (error) {
          console.error("Erreur lors de la récupération des données météo", error);
      }
    };
  

    return (
        <div>
            <WeatherSearch onSearch={handleSearch} />
            <WeatherDisplay weatherData={weatherData} />
        </div>
    );
};

export default App;
