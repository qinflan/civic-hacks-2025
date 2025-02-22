import React from 'react'
import { MapContainer } from 'react-leaflet'

const selectLocation = () => {
  return (
    <div>
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>

        </MapContainer>
    </div>
  )
}

export default selectLocation