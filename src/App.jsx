import React, { useState } from 'react';
import WeatherDisplay from './components/WeatherDisplay';
import Loader from './components/Loader';

const API_KEY = import.meta.env.VITE_API_KEY;

export default function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeatherData(data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to fetch weather!');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeather();
    }
  };

  return (
    <div className="min-h-screen bg-white font-poppins flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Weather App</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter city name"
          className="border border-gray-300 rounded-xl px-4 py-2 w-64 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <button
          onClick={fetchWeather}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl shadow-md transition-all duration-200"
        >
          Search
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        weatherData && <WeatherDisplay weatherData={weatherData} />
      )}
    </div>
  );
}
