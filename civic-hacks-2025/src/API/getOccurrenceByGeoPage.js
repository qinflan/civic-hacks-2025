import axios from "axios";

// returns the array of species based on the lat and lon
export default function getOccurrenceByGeo(lat, lon, page, setData) {
    const BASE_URL = 'https://api.gbif.org/v1/';

    axios.get(BASE_URL + 'occurrence/search/?', {
        params: {
            decimalLongitude: `${lon.lon1}, ${lon.lon2}`,
            decimalLatitude: `${lat.lat1}, ${lat.lat2}`,
            limit: 30,
            coordinateUncertaintyInMeters: "0,50",
            offset: page
        }
    }).then(
        res => {
            setData(res.data.results);
        }
    ).catch(e => {
        console.log(e);
    })
  }