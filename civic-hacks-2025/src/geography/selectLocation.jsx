import React, { useState, useEffect } from 'react';
import getLocation from './getCurrentLocation';
import { GoogleMap, Marker, useJsApiLoader, Autocomplete } from '@react-google-maps/api';

// Google Maps API key from environment variables
const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const libraries = ["places"];

const mapContainerStyle = {
  width: "400px",
  height: "400px",
  position: "relative",
  borderRadius: "15px",
  overflow: "hidden",
  margin: "0 auto"
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  styles: [
    { featureType: "poi", stylers: [{ visibility: "off" }] },
    { featureType: "transit", stylers: [{ visibility: "off" }] },
    { featureType: "road", stylers: [{ visibility: "simplified" }] },
    { featureType: "administrative", stylers: [{ visibility: "off" }] }
  ],
};

const SelectLocation = () => {
  const [position, setPosition] = useState({ lat: 37.7749, lng: -122.4194 }); // default san francisco
  const [autocomplete, setAutocomplete] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries,
  });

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const { lat, lon } = await getLocation();
        setPosition({ lat: lat.lat1, lng: lon.lon1 });
        console.log("Initial Location: ", lat.lat1, lon.lon1);
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    fetchLocation();
  }, []);

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const lat1 = place.geometry.location.lat();
        const lng1 = place.geometry.location.lng();

        // Round to the nearest tenth
        const roundedLat1 = Math.round(lat1 * 10) / 10;
        const roundedLng1 = Math.round(lng1 * 10) / 10;
        const roundedLat2 = Math.round((roundedLat1 + 0.5) * 10) / 10;
        const roundedLng2 = Math.round((roundedLng1 + 0.5) * 10) / 10;

        // Update state
        setPosition({
          lat: roundedLat1,
          lng: roundedLng1,
          lat2: roundedLat2,
          lng2: roundedLng2
        });

        console.log("Updated Position:", {
          lat1: roundedLat1,
          lng1: roundedLng1,
          lat2: roundedLat2,
          lng2: roundedLng2
        });
      }
    }
  };

  if (!isLoaded) return <p>Loading map...</p>;

  else {
    return (
      <div>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={position || { lat: 37.7749, lng: -122.4194 }} // default san francisco
            zoom={13}
            options={mapOptions}
            onClick={(e) => setPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() })}
          >
            {position && <Marker position={position} />}
            <Autocomplete onLoad={setAutocomplete} onPlaceChanged={onPlaceChanged}>
                <input
                  type="text"
                  placeholder="Search location..."
                  style={{
                    position: "relative",
                    width: "300px",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    outline: "none",
                    marginTop: "5px",
                    marginLeft: "40px"
                  }}
                />
            </Autocomplete>
          </GoogleMap>
        </div>
    );
  };
}

export default SelectLocation;
