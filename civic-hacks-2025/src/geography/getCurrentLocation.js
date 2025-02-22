import React from 'react'

const getLocation = () => {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(retrieveCoordinates)
  } else {
  console.error("location not available")
  }

}

const retrieveCoordinates = (position) => {

  const latitudeRange = {
    lat1: Math.round(position.coords.latitude * 10)/10,
    lat2: Math.round(position.coords.latitude * 10)/10 + 0.5
  }

  const longitudeRange = {
    lon1: Math.round(position.coords.longitude * 10)/10,
    lon2: Math.round(position.coords.longitude * 10)/10 + 0.5
  }
  
  console.log(latitudeRange, longitudeRange)
  return latitudeRange, longitudeRange
}

export default getLocation