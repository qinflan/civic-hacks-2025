import styled from "styled-components";

const SpeciesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  background-color: #ebdecb;
`;

const SpeciesCard = styled.div`
  border: 1px solid #CBC1B1;
  border-radius: 14px;
  padding: 16px;
  margin: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  &:hover {
    transform: scale(1.03);
    cursor: pointer; 
    transition: all 0.3s ease-in-out;
  }
  background-color: #f5e9d8;
  width: 300px;
  cursor: pointer;
`;

const SpeciesImage = styled.img`
  max-width: 200px;
  max-height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const SpeciesName = styled.h2`
  color: #333;
  margin-bottom: 8px;
  text-align: center;
`;

const SpeciesInfo = styled.p`
  color: #666;
  margin: 4px 0;
`;

const AdditionalInfo = styled.div`
  margin-top: 12px;
  font-style: italic;
`;

const SpeciesDisplay = ({ species }) => {
  return (
    <div>
    <SpeciesGrid>
      {species.map((s) => (
        <SpeciesCard key={s.key} id={s.genericName}>
          {s.imageUrl && <SpeciesImage src={s.imageUrl} alt={s.scientificName} />}
          <SpeciesName>{s.scientificName}</SpeciesName>
          <SpeciesInfo>Common Name: {s.vernacularName}</SpeciesInfo>
          <SpeciesInfo>Kingdom: {s.kingdom}</SpeciesInfo>
          <SpeciesInfo>Phylum: {s.phylum}</SpeciesInfo>
          <SpeciesInfo>Class: {s.class}</SpeciesInfo>
          <SpeciesInfo>Establisment Means: 
            {s.establishment == "INTRODUCED" ? " INVASIVE": " NATIVE" }
          </SpeciesInfo>
          <AdditionalInfo>
            <p>Location: {s.decimalLatitude}, {s.decimalLongitude}</p>
            <p>Country: {s.country}</p>
          </AdditionalInfo>
        </SpeciesCard>
      ))}
    </SpeciesGrid>
    </div>
  );
};

export default SpeciesDisplay;


