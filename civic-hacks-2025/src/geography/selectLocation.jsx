import React, { useState, useRef } from 'react';
import { GoogleMap, Marker, useJsApiLoader, Autocomplete } from '@react-google-maps/api';

// Google Maps API key from environment variables
const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const libraries = ["places"];

const mapContainerStyle = {
  width: "80vw",
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

const SelectLocation = ({updatePosition}) => {
  const [position, setPosition] = useState({ lat: 37.7749, lng: -122.4194 }); // default san francisco
  const [autocomplete, setAutocomplete] = useState(null);
  const mapRef = useRef(null);  // Keep a ref for the map


  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries,
  });

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        const lat1 = Math.round(lat * 10) / 10;
        const lon1 = Math.round(lng * 10) / 10;
        const lat2 = Math.round((lat1 + 0.5) * 10) / 10;
        const lon2 = Math.round((lon1 + 0.5) * 10) / 10;

        setPosition({ lat: lat1, lng: lon1 });
        updatePosition({ lat: lat1, lng: lon1, lat1, lat2, lon1, lon2 });
        if (mapRef.current) {
          mapRef.current.panTo({ lat: lat1, lng: lon1 });  // Smoothly pan to the new position
        }
      }
    }
  };

  const center = position;

  if (!isLoaded) return <p>Loading map...</p>;

  else {
    return (
      <div>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={13}
            options={mapOptions}
            onClick={(e) => {
              const lat = e.latLng.lat();
              const lng = e.latLng.lng();
    
              const lat1 = Math.round(lat * 10) / 10;
              const lon1 = Math.round(lng * 10) / 10;
              const lat2 = Math.round((lat1 + 0.5) * 10) / 10;
              const lon2 = Math.round((lon1 + 0.5) * 10) / 10;
    
              setPosition({ lat: lat1, lng: lon1 });
              updatePosition({ lat: lat1, lng: lon1, lat1, lat2, lon1, lon2 });
            }}
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
