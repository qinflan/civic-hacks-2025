import { useState, useEffect, useRef, useCallback } from 'react';
import SpeciesDisplay from './SpeciesDisplay';
import Modal from 'react-modal';
import getLocation from '../geography/getCurrentLocation';
import SelectLocation from '../geography/selectLocation';
import DensityMap from '../densityMap/DensityMap';

const SpeciesFetcher = () => {
  const [speciesData, setSpeciesData] = useState([]);
  const [position, setPosition] = useState({ 
    lat1: 37.5, lat2: 38.0, // GBIF
    lon1: -122.7, lon2: -122.2, // GBIF
    mapLat: 37.7749, mapLng: -122.4194, // Google Maps
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSpecies, setSelectedSpecies] = useState(null);

  const openModal = (species) => {
    setSelectedSpecies(species);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedSpecies(null);
  };
  
  const hasLocationChangedRef = useRef(false);
  const prevPositionRef = useRef(position);

  // Update species data when position changes
  useEffect(() => {
    const fetchSpeciesData = async () => {
      if (!position.lat1 || !position.lon1) return; // Don't fetch until position is set

      setLoading(true);
      setError(null);

      try {
        const apiUrl = `https://api.gbif.org/v1/occurrence/search/?decimalLongitude=${position.lon1},${position.lon2}&decimalLatitude=${position.lat1},${position.lat2}&limit=30&coordinateUncertaintyInMeters=0,50`;
        const occurrenceResponse = await fetch(apiUrl);

        if (!occurrenceResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const occurrenceData = await occurrenceResponse.json();
        const processedData = await Promise.all(occurrenceData.results.map(async (occurrence) => {
          let englishName = 'No English name available';
          let isnative = '';
          if (occurrence.speciesKey) {
            const vernacularResponse = await fetch(`https://api.gbif.org/v1/species/${occurrence.speciesKey}/vernacularNames`);
            const vernacularData = await vernacularResponse.json();
            englishName = vernacularData.results.find(name => name.language === 'eng')?.vernacularName || 'No English name available';
            
            const vernacularResponsesecond = await fetch(`https://api.gbif.org/v1/species/${occurrence.speciesKey}/distributions`);
            const vernacularDatasecond = await vernacularResponsesecond.json();

            vernacularDatasecond.results.forEach(element => {
              if ('establishmentMeans' in element) {
                isnative = element.establishmentMeans;
              }
            });
          }

          return {
            key: occurrence.key,
            taxonKey: occurrence.taxonKey,
            scientificName: occurrence.scientificName,
            genericName: occurrence.genericName,
            kingdom: occurrence.kingdom,
            phylum: occurrence.phylum,
            class: occurrence.class,
            imageUrl: occurrence.media && occurrence.media.length > 0 ? occurrence.media[0]?.identifier : null,
            vernacularName: englishName,
            decimalLatitude: occurrence.decimalLatitude,
            decimalLongitude: occurrence.decimalLongitude,
            country: occurrence.country,
            establishment: isnative
          };
        }));

        setSpeciesData(processedData);
        setLoading(false);
      } catch (error) {
        setError('Error fetching species data');
        setLoading(false);
      }
    };

    // Only fetch species data if the position has changed
    const hasPositionChanged =
      prevPositionRef.current.lat1 !== position.lat1 ||
      prevPositionRef.current.lat2 !== position.lat2 ||
      prevPositionRef.current.lon1 !== position.lon1 ||
      prevPositionRef.current.lon2 !== position.lon2;

    if (hasPositionChanged) {
      prevPositionRef.current = position;
      fetchSpeciesData();
    }
  }, [position]);

  const handleLocationChange = useCallback((newPosition) => {
    setPosition((prevPosition) => ({
      ...prevPosition,
      lat1: newPosition.lat1,
      lat2: newPosition.lat2,
      lon1: newPosition.lon1,
      lon2: newPosition.lon2,
      mapLat: newPosition.mapLat,
      mapLng: newPosition.mapLng
    }));
  }, []);

  const fetchInitialLocation = useEffect(() => {
    const initializePosition = async () => {
      try {
        const { lat1, lat2, lon1, lon2 } = await getLocation();
        setPosition({
          lat1,
          lat2,
          lon1,
          lon2,
          mapLat: 37.7749, // default for map
          mapLng: -122.4194 // default for map
        });
      } catch (err) {
        setError('Unable to fetch location.');
        setLoading(false);
      }
    };
    initializePosition();
  }, []);

  return (
    <div>
      <SelectLocation updatePosition={handleLocationChange} mapPosition={{ lat: position.mapLat, lng: position.mapLng }} />
      {loading ? <div>Loading...</div> : error ? <div>{error}</div> : <SpeciesDisplay species={speciesData} />}
    </div>
  );
};

export default SpeciesFetcher;
