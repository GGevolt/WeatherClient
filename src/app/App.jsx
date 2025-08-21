import { useState, useEffect, useCallback } from "react";
import { AutoComplete } from "./feature/AutoComplete";
import { Map, Marker, NavigationControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import pin from "@assets/location-pin.png";
import WeatherDisplay from "./feature/WeatherDisplay";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const myApiKey = import.meta.env.VITE_GEOAPIFY_KEY;
  const [viewState, setViewState] = useState({
    longitude: 108.2772,
    latitude: 14.0583,
    zoom: 2,
  });
  const [location, setLocation] = useState(null);
  const handlePlaceSelect = useCallback((value) => {
    setLocation(value);
  }, []);

  useEffect(() => {
    if (location?.properties) {
      setViewState({
        longitude: location.properties.lon,
        latitude: location.properties.lat,
        zoom: 10,
      });
    }
  }, [location]);

  return (
    <>
      <div className="App">
        <div
          className="absolute top-[5%] left-[3%] border-1 rounded-sm bg-white z-10 w-4/5 md:w-[38%] focus-within:scale-[1.02] focus-within:border-lime-600 transition-transform duration-600"
        >
          <AutoComplete onPlaceSelect={handlePlaceSelect} />
        </div>
        <Map
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          style={{ width: "100%", height: "100vh" }}
          mapStyle={`https://maps.geoapify.com/v1/styles/osm-liberty/style.json?apiKey=${myApiKey}`}
        >
          <NavigationControl position="top-right" />
          {location?.properties && (
            <Marker
              longitude={location.properties.lon}
              latitude={location.properties.lat}
              anchor="bottom"
              pitchAlignment="auto"
              rotationAlignment="auto"
            >
              <img src={pin} alt="marker" />
            </Marker>
          )}
        </Map>
      </div>
      <AnimatePresence initial={false}>
        {location?.properties && (
          <motion.div
            className="absolute bottom-2 w-full "
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
          >
            <WeatherDisplay
              latitude={location.properties.lat}
              longitude={location.properties.lon}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
