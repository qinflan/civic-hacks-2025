import { useState, useEffect } from 'react';
import SpeciesDisplay from './SpeciesDisplay';

const SpeciesFetcher = () => {
  const [species, setSpecies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const response = await fetch('https://api.gbif.org/v1/species/search?limit=10');
        if (!response.ok) {
          throw new Error('Network did not respond!');
        }
        const data = await response.json();
        setSpecies(data.results);
        setLoading(false);
      } catch (error) {
        setError('Error fetching species data');
        setLoading(false);
      }
    };

    fetchSpecies();
  }, []);

  if (loading){
    return <div>Loading...</div>;
  }
  if (error){
    return <div>{error}</div>;
  }
  return <SpeciesDisplay species={species} />;
};

export default SpeciesFetcher;
