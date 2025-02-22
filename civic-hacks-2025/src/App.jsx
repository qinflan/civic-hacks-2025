import './App.css'
import getLocation from './geography/getCurrentLocation'
import selectLocation from './geography/selectLocation'
import { MapContainer } from 'react-leaflet'

function App() {

  getLocation()
  return (
    selectLocation()
  )

}

export default App
