import React, { useState, useEffect } from 'react';
import SpeciesDisplay from './SpeciesDisplay';

const SpeciesFetcher = () => {
  const [speciesData, setSpeciesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpeciesData = async () => {
      try {
        // Your GBIF Occurrence API call with specified parameters
        const apiUrl = 'https://api.gbif.org/v1/occurrence/search/?decimalLongitude=-71,-70.5&decimalLatitude=42,42.5&limit=30&coordinateUncertaintyInMeters=0,50';

        const occurrenceResponse = await fetch(apiUrl);  
        

        if (!occurrenceResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const occurrenceData = await occurrenceResponse.json();
        

        // Process each occurrence to fetch additional data
        const processedData = await Promise.all(occurrenceData.results.map(async (occurrence) => {
          try{
            // Fetch vernacular names if taxonKey exists
            let englishName = 'No English name available';
            let isnative = "";
            if (occurrence.speciesKey) {
              const vernacularResponse = await fetch(`https://api.gbif.org/v1/species/${occurrence.speciesKey}/vernacularNames`);
              const vernacularData = await vernacularResponse.json();
              englishName = vernacularData.results.find(name => name.language === 'eng')?.vernacularName || 'No English name available';
             
              const vernacularResponsesecond = await fetch(`https://api.gbif.org/v1/species/${occurrence.speciesKey}/distributions`);
              const vernacularDatasecond = await vernacularResponsesecond.json();

              vernacularDatasecond.results.forEach(element => {
                if('establishmentMeans' in element){
                  isnative = element.establishmentMeans;
                }
              });
              console.log(isnative);
            }


            return {
              key: occurrence.key,
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
          } catch (vernacularError) {
            console.error("Error fetching vernacular names: ", vernacularError);
            return { // Return the occurrence data with default vernacular name on error
              key: occurrence.key,
              scientificName: occurrence.scientificName,
              kingdom: occurrence.kingdom,
              phylum: occurrence.phylum,
              class: occurrence.class,
              imageUrl: occurrence.media && occurrence.media.length > 0 ? occurrence.media[0]?.identifier : null,
              vernacularName: 'Error fetching name',
              decimalLatitude: occurrence.decimalLatitude,
              decimalLongitude: occurrence.decimalLongitude,
              country: occurrence.country
            };
          }
        }));

        setSpeciesData(processedData);
        setLoading(false);
      } catch (error) {
        setError('Error fetching species data');
        setLoading(false);
      }
    };

    fetchSpeciesData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return <SpeciesDisplay species={speciesData} />;
};

export default SpeciesFetcher;


