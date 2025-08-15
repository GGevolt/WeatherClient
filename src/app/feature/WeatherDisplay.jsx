import React, { useEffect, useState, useCallback } from "react";
import { useGetWeather } from "@utils/api";

const WeatherDisplay = ({ latitude, longitude }) => {
  const {
    data: weatherData,
    isPending,
    error,
  } = useGetWeather(latitude, longitude);
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const getPodIcon = (pod) => {
    return pod === "d" ? "☀️" : "🌙";
  };

  const getWeatherIcon = (main) => {
    const icons = {
      Rain: "🌧️",
      Clear: "☀️",
      Clouds: "☁️",
      Snow: "❄️",
      Thunderstorm: "⛈️",
      Drizzle: "🌦️",
      Mist: "🌫️",
      Fog: "🌫️",
    };
    return icons[main] || "🌤️";
  };

  if (isPending) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Weather Predictions
        </h2>

        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600 text-lg">Loading weather data...</p>
          <p className="text-gray-500 text-sm mt-2">
            Please wait while we fetch the latest predictions
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg shadow-lg text-center flex flex-col">
        <div className="mb-4 self-center-safe">
          <svg
            className="w-16 h-16 text-red-500 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Unable to Load Weather Data
        </h2>
        <p className="text-gray-600 mb-6">
          We couldn't fetch the weather information. Please check your
          connection and try again.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl !mx-auto !p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg shadow-lg min-h-0 max-h-[60vh] overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Weather Predictions
      </h2>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {weatherData.data.list.map((forecast, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-gray-600">
                <div className="font-semibold">
                  {formatDate(forecast.dt_txt)}
                </div>
                <div>{formatTime(forecast.dt_txt)}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">{getPodIcon(forecast.sys.pod)}</span>
                <span className="text-2xl">
                  {getWeatherIcon(forecast.weather[0].main)}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">
                  {Math.round(forecast.main.temp)}°C
                </div>
                <div className="text-sm text-gray-600 capitalize">
                  {forecast.weather[0].description}
                </div>
                <div className="text-xs text-gray-500">
                  Feels like {Math.round(forecast.main.feels_like)}°C
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mt-3">
                <div className="flex justify-between">
                  <span>Min:</span>
                  <span>{Math.round(forecast.main.temp_min)}°C</span>
                </div>
                <div className="flex justify-between">
                  <span>Max:</span>
                  <span>{Math.round(forecast.main.temp_max)}°C</span>
                </div>
                <div className="flex justify-between">
                  <span>Humidity:</span>
                  <span>{forecast.main.humidity}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Clouds:</span>
                  <span>{forecast.clouds.all}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Wind:</span>
                  <span>{forecast.wind.speed} m/s</span>
                </div>
                <div className="flex justify-between">
                  <span>Visibility:</span>
                  <span>{forecast.visibility / 1000} km</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDisplay;
