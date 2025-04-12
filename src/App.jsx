import React, { useState, useEffect } from "react";
import WeatherDisplay from "./components/WeatherDisplay";
import { FiSearch, FiMapPin } from "react-icons/fi";
import { motion } from "framer-motion";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  const fetchWeather = async (cityName) => {
    if (!cityName) return;
    setLoading(true);
    try {
      const response = await fetch(
        `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${cityName}`
      );
      const data = await response.json();

      if (data.success === false) {
        setError(data.error.info);
        setWeatherData(null);
      } else {
        setWeatherData(data);
        setError(null);
        updateSearchHistory(cityName);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch weather data.");
    }
    setLoading(false);
  };

  const fetchCurrentLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        setLoading(true);
        try {
          const response = await fetch(
            `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${latitude},${longitude}`
          );
          const data = await response.json();

          if (data.success === false) {
            setError(data.error.info);
            setWeatherData(null);
          } else {
            setWeatherData(data);
            setError(null);
            updateSearchHistory(data.location.name);
          }
        } catch (error) {
          console.error(error);
          setError("Failed to fetch weather data.");
        }
        setLoading(false);
      });
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  const updateSearchHistory = (cityName) => {
    const updatedHistory = [
      cityName,
      ...searchHistory.filter((c) => c !== cityName),
    ];
    setSearchHistory(updatedHistory);
    localStorage.setItem(
      "weather_search_history",
      JSON.stringify(updatedHistory)
    );
  };

  useEffect(() => {
    const storedHistory = JSON.parse(
      localStorage.getItem("weather_search_history")
    );
    if (storedHistory) {
      setSearchHistory(storedHistory);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-10 bg-white font-poppins">
      <motion.h1
        className="text-3xl md:text-5xl font-bold text-gray-800 mb-8 text-center px-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🌤️ Weather App
      </motion.h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 w-11/12 max-w-md mb-8 px-4"
      >
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search city..."
          className="w-full p-3 rounded-lg shadow-md border border-gray-200 focus:ring-2 focus:ring-blue-400 transition"
        />
        <div className="flex gap-3 flex-col sm:flex-row w-full">
          <button
            type="submit"
            className="flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition w-full"
          >
            <FiSearch size={20} /> Search
          </button>
          <button
            type="button"
            onClick={fetchCurrentLocationWeather}
            className="flex justify-center items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition w-full"
          >
            <FiMapPin size={20} /> Current
          </button>
        </div>
      </form>

      {loading && (
        <div className="flex justify-center items-center mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-800 px-4 py-2 rounded mb-4 shadow-md w-11/12 max-w-md text-center">
          {error}
        </div>
      )}

      <WeatherDisplay weatherData={weatherData} loading={loading} />

      {searchHistory.length > 0 && (
        <motion.div
          className="mt-10 w-11/12 max-w-md px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Search History:
          </h3>
          <ul className="space-y-2">
            {searchHistory.map((city, idx) => (
              <li
                key={idx}
                className="cursor-pointer text-blue-600 hover:underline"
                onClick={() => fetchWeather(city)}
              >
                {city}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default App;
