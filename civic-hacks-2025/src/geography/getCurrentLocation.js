import React from 'react'

const getLocation = async () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitudeRange = {
            lat1: Math.round(position.coords.latitude * 10) / 10,
            lat2: Math.round(position.coords.latitude * 10) / 10 + 0.5
          };

          const longitudeRange = {
            lon1: Math.round(position.coords.longitude * 10) / 10,
            lon2: Math.round(position.coords.longitude * 10) / 10 + 0.5
          };

          console.log("Latitude Range: ", latitudeRange, "Longitude Range: ", longitudeRange);
          resolve({ lat: latitudeRange, lon: longitudeRange }); 
        },
        (error) => {
          reject(error); 
        }
      );
    } else {
      reject(new Error("Location not available"));
    }
  });
};

export default getLocation;
