import React from 'react'

const getLocation = async () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat1 = Math.round(position.coords.latitude * 10) / 10
            const lat2 = Math.round(position.coords.latitude * 10) / 10 + 0.5
            const lon1 = Math.round(position.coords.longitude * 10) / 10
            const lon2 = Math.round(position.coords.longitude * 10) / 10 + 0.5
          console.log(lat1, lat2, lon1, lon2);
          resolve({ lat1, lat2, lon1, lon2}); 
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
