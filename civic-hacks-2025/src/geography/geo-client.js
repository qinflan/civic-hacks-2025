import React from 'react'

const getLocation = () => {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(retrieveCoordinates)
  } else {
  console.error("location not available")
  }

}

const retrieveCoordinates = (position) => {
  console.log(position.coords.latitude + ", " + position.coords.longitude )
}

export default getLocation