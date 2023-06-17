import React, { useState, useEffect } from 'react';
import './meteo.css';

const Weather = () => {
  // Créer un état pour stocker les données météorologiques
  const [weatherData, setWeatherData] = useState(null);
  // Créer un état pour stocker la ville dont nous voulons afficher les données météorologiques
  const [city, setCity] = useState('');

  const API_KEY = "74a053a640c313120c0b5e4127ebfadb"; // Remplacer par votre propre clé API

  const getFrenchDescription = (description) => {
    switch (description) {
      case 'clear sky':
        return 'Ciel dégagé';
      case 'few clouds':
        return 'Quelques nuages';
      case 'scattered clouds':
        return 'Nuages épars';
      case 'broken clouds':
        return 'Nuages ​​brisés';
      case 'overcast clouds':
        return 'Nuages couverts';
      case 'light rain':
        return 'Pluie légère';
      case 'moderate rain':
        return 'Pluie modérée';
      case 'heavy intensity rain':
        return 'Pluie forte';
      case 'very heavy rain':
        return 'Très forte pluie';
      case 'extreme rain':
        return 'Pluie extrême';
      case 'freezing rain':
        return 'Pluie verglaçante';
      case 'light intensity shower rain':
        return 'Pluie légère';
      case 'shower rain':
        return 'Averses de pluie';
      case 'heavy intensity shower rain':
        return 'Averses de pluie forte';
      case 'ragged shower rain':
        return 'Averses de pluie';
      case 'snow':
        return 'Neige';
      case 'light snow':
        return 'Petite neige';
      case 'heavy snow':
        return 'Forte neige';
      case 'sleet':
        return 'Pluie verglaçante/neige fondue';
      case 'shower sleet':
        return 'Averses de pluie verglaçante/neige fondue';
      case 'light rain and snow':
        return 'Pluie et neige légères';
      case 'rain and snow':
        return 'Pluie et neige';
      case 'light shower snow':
        return 'Légères averses de neige';
      case 'shower snow':
        return 'Averses de neige';
      case 'heavy shower snow':
        return 'Fortes averses de neige';
      case 'mist':
        return 'Brume';
      case 'smoke':
        return 'Fumée';
      case 'haze':
        return 'Brume sèche';
      case 'dust':
        return 'Poussière';
      case 'fog':
        return 'Brouillard';
      case 'sand':
        return 'Sable';
      case 'ash':
        return 'Cendres';
      case 'squall':
        return 'Rafale';
      case 'tornado':
        return 'Tornade';
      default:
        return description;
    }
  };

  // Utiliser l'effet de useEffect pour envoyer une requête à l'API OpenWeather chaque fois que la ville change
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},FR&appid=${API_KEY}&units=metric`);
        if (response.ok) {
          const data = await response.json();
          setWeatherData(data);
        } else {
          throw new Error('ERREUR');
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [city]); // La dépendance du useEffect est la ville sélectionnée

  // Fonction pour gérer le changement de la ville saisie
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  // Rendre le composant
  return (
    <div className='app-weather'>
        <h1 className='weather-title'>Météo</h1>
        <div class="content-container">
          <div className='weather-input'>
          <label htmlFor="city">Entrez le nom de la ville :</label>
          <input type="text" id="city" value={city} onChange={handleCityChange} />
          </div>
        {weatherData && ( // Vérifier si les données météorologiques existent
          <div className='weather-card'>
            <h2>{weatherData.name}</h2>
            <div className='weather-info'>
              <p>{getFrenchDescription(weatherData.weather[0].description)}</p>
              <p>Température: {weatherData.main.temp} °C</p> 
              <p className='weather-humidity'>Humidité: {weatherData.main.humidity} %</p>
            </div>
          </div>
        )}
        </div>
    </div>
  );
};

export default Weather;
