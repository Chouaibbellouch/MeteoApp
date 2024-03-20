import React, { useState, useEffect } from 'react';


const WeatherDisplay = ({ weatherData }) => {
    const [cityImageUrl, setCityImageUrl] = useState('');

    useEffect(() => {
        if (weatherData) {
            fetch(`http://localhost:3001/city-image?city=${weatherData.name}`)
                .then(response => response.json())
                .then(data => {
                    setCityImageUrl(data.imageUrl);
                })
                .catch(error => console.error("Erreur lors de la récupération de l'image de la ville", error));
        }
    }, [weatherData]);

    
    if (!weatherData) return <p>Aucune donnée météo disponible</p>;
    
    const iconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
    const tempCelsius = weatherData.main.temp - 273.15;
    return (
        <div className="container text-center mt-4">
            <h2 className="mb-3">Météo à {weatherData.name}, {weatherData.sys.country}</h2>
            {cityImageUrl && (
                <div className="mb-3">
                <img src={cityImageUrl} alt={`Vue de ${weatherData.name}`} className="img-fluid" style={{ maxWidth: '300px' }} />
                </div>
                )}
            <img src={iconUrl} alt="Icône météo" className="mb-3"/>
            <h3>Température: <span className="badge bg-primary">{tempCelsius.toFixed(0)}°C</span></h3>
            <p className="lead">Conditions: {weatherData.weather[0].description}</p>
            <p>Humidité: {weatherData.main.humidity}%</p>
            <p>Vent: {weatherData.wind.speed} m/s</p>
            <div className="mt-4">
                <p>Lever du soleil : {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
                <p>Coucher du soleil : {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
            </div>
        </div>
    );
};


export default WeatherDisplay;
