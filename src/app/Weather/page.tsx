"use client";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";

const API_KEY = "0befd0741674404b845133654252702";


interface WeatherData {
    location: {
      name: string;
      country: string;
    };
    current: {
      temp_c: number;
      condition: {
        text: string;
        icon: string;
      };
      humidity: number;
      wind_kph: number;
    };
  }
  
  const Index = () => {
    const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
    const [loading, setLoading] = useState(false);
  
    const searchWeather = async (city: string) => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no`
        );
  
        if (!response.ok) {
          throw new Error("City not found");
        }
  
        const data = await response.json();
  
        // Check if the city is already in the array to prevent duplicates
        if (!weatherData.some((entry) => entry.location.name === data.location.name)) {
          setWeatherData((prevData) => [data, ...prevData]); // Add new city at the beginning
        }
      } catch (error) {
        console.error("Error fetching weather:", error);
      } finally {
        setLoading(false);
      }
    };
  
    const removeCard = (cityName: string) => {
      setWeatherData((prevData) => prevData.filter((entry) => entry.location.name !== cityName));
    };
  
    return (
        <div className="min-h-[120vh] p-4 sm:p-6 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-2">Weather Explorer</h1>
          <p className="text-gray-500 text-center mb-8">Discover the weather in any city</p>
  
          <SearchBar onSearch={searchWeather} />
  
          {loading && (
            <div className="text-center mt-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-gray-900"></div>
            </div>
          )}
  
          {/* Render weather cards in a flex grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20">
            {weatherData.map((data) => (
              <WeatherCard key={data.location.name} data={data} onRemove={() => removeCard(data.location.name)} />
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default Index;