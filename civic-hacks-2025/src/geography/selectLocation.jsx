import React, { useState, useEffect } from 'react';
import getLocation from './getCurrentLocation';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

// Google Maps API key from environment variables
const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

const mapContainerStyle = {
    width: "100%",
    height: "100vh",
    position: "relative",
  };

const SelectLocation = () => {
  const [position, setPosition] = useState({lat: 37.7749, lng: -122.4194}); // default san francisco

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey, 
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

  if (!isLoaded) return <p>Loading map...</p>;

  else {
    return (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={position || { lat: 37.7749, lng: -122.4194 }}
          zoom={13}
          onClick={(e) => setPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() })} 
        >
          {position && <Marker position={position} />}
        </GoogleMap>
      );
    };
  }

export default SelectLocation;
