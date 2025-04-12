import React from 'react';
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiFog } from 'react-icons/wi';

function getWeatherIcon(weather) {
  if (!weather || weather.length === 0) return <WiDaySunny size={80} />;
  
  const description = weather[0].description.toLowerCase();
  
  if (description.includes('cloud')) return <WiCloud size={80} />;
  if (description.includes('rain')) return <WiRain size={80} />;
  if (description.includes('snow')) return <WiSnow size={80} />;
  if (description.includes('fog') || description.includes('mist')) return <WiFog size={80} />;
  
  return <WiDaySunny size={80} />;
}

export default function WeatherDisplay({ weatherData }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center transition-all duration-300 ease-in-out">
      {getWeatherIcon(weatherData.weather)}
      <h2 className="text-3xl font-bold mt-4">{weatherData.name}</h2>
      <p className="text-xl text-gray-600">{Math.round(weatherData.main.temp)}°C</p>
      <p className="capitalize text-gray-500">{weatherData.weather[0].description}</p>
    </div>
  );
}
