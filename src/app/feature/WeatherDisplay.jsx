import { useGetWeather } from "@utils/api";
import { motion, spring } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: spring,
      stiffness: 100,
      damping: 12,
    },
  },
  hover: {
    scale: 1.05,
    rotate: "1deg",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    borderColor: "#16a34a",
  },
  tap: {
    scale: 0.98,
  },
};

const loadingVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
    },
  },
};

const iconVariants = {
  visible: {
    x: 0,
    rotate: 0,
  },
  hover: {
    x: [-2, 2, -2, 2, 0],
    rotate: [-5, 5, -5, 5, 0],
    transition: {
      duration: 0.5,
    },
  },
  tap: {
    x: [-2, 2, -2, 2, 0],
    rotate: [-5, 5, -5, 5, 0],
    transition: {
      duration: 0.5,
    },
  },
};

const WeatherDisplay = ({ latitude, longitude }) => {
  const {
    data: weatherData,
    isPending,
    error,
  } = useGetWeather(latitude, longitude);

  const formatTime = (timestamp, timezoneOffset) => {
    const date = new Date((timestamp + timezoneOffset) * 1000);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    });
  };

  const formatDate = (timestamp, timezoneOffset) => {
    const date = new Date((timestamp + timezoneOffset) * 1000);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
  };

  const getPodIcon = (pod) => {
    return pod === "d" ? "🌞" : "🌛";
  };

  const getWeatherIcon = (main) => {
    const icons = {
      Rain: "🌧️",
      Clear: "☀️",
      Clouds: "🌥️",
      Snow: "❄️",
    };
    return icons[main] || "🃏";
  };

  if (isPending) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Weather Predictions
        </h2>

        <div className="flex flex-col items-center justify-center py-12">
          <motion.div
            className="rounded-full h-16 w-16 border-b-2 border-blue-500 mb-4"
            variants={loadingVariants}
            animate="animate"
          />
          <motion.p
            className="text-gray-600 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Loading weather data...
          </motion.p>
          <motion.p
            className="text-gray-500 text-sm mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Please wait while we fetch the latest predictions
          </motion.p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg shadow-lg text-center flex flex-col">
        <motion.div
          className="mb-4 self-center-safe"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
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
        </motion.div>
        <motion.h2
          className="text-xl font-semibold text-gray-800 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Unable to Load Weather Data
        </motion.h2>
        <motion.p
          className="text-gray-600 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          We couldn't fetch the weather information. Please check your
          connection and try again.
        </motion.p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl !mx-auto !p-6 bg-gradient-to-br from-blue-50 to-indigo-100 border rounded-lg shadow-lg min-h-0 max-h-[60vh] overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Weather Predictions
      </h2>

      <motion.div
        className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {weatherData.data.list.map((forecast, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg border-1 transition-shadow"
            variants={cardVariants}
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            transition={{
              duration: 0.3,
              ease: "easeInOut",
              boxShadow: { duration: 0.2 },
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-gray-600">
                <div className="font-semibold">
                  {formatDate(forecast.dt, weatherData.data.city.timezone)}
                </div>
                <div>
                  {formatTime(forecast.dt, weatherData.data.city.timezone)}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <motion.span className="text-lg" variants={iconVariants}>
                  {getPodIcon(forecast.sys.pod)}
                </motion.span>
                <motion.span className="text-2xl" variants={iconVariants}>
                  {getWeatherIcon(forecast.weather[0].main)}
                </motion.span>
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
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default WeatherDisplay;
