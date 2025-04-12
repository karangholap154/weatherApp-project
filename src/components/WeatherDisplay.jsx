import React from "react";
import { WiDaySunny, WiCloud, WiRain, WiSnow } from "react-icons/wi";

const WeatherDisplay = ({ weatherData, loading }) => {
  if (loading) {
    // Show Skeleton while loading
    return (
      <div className="w-11/12 max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg animate-pulse mt-4">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-10 bg-gray-200 rounded w-2/3 mb-6"></div>
        <div className="h-20 bg-gray-200 rounded mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (!weatherData) {
    return null;
  }

  const { location, current } = weatherData;

  const getWeatherIcon = () => {
    const description = current.weather_descriptions[0]?.toLowerCase();
    if (description.includes("cloud")) return <WiCloud size={64} />;
    if (description.includes("rain")) return <WiRain size={64} />;
    if (description.includes("snow")) return <WiSnow size={64} />;
    return <WiDaySunny size={64} />;
  };

  return (
    <div className="w-11/12 max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg text-center transition-all">
      <div className="flex justify-center mb-4">{getWeatherIcon()}</div>
      <h2 className="text-2xl font-semibold text-gray-700">{location.name}, {location.country}</h2>
      <p className="text-gray-500 mb-2">{current.weather_descriptions[0]}</p>
      <h1 className="text-5xl font-bold text-blue-500 mb-4">{current.temperature}°C</h1>
      <div className="flex justify-between text-sm text-gray-600 mt-4">
        <div>
          <p>Humidity</p>
          <p>{current.humidity}%</p>
        </div>
        <div>
          <p>Wind Speed</p>
          <p>{current.wind_speed} km/h</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
