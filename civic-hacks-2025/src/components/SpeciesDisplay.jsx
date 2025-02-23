import React from "react";
import styled from "styled-components";

const SpeciesCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  background-color: #f9f9f9;
`;

const SpeciesName = styled.h2`
  color: #333;
  margin-bottom: 8px;
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
      {species.map((s) => (
        <SpeciesCard key={s.key}>
          <SpeciesName>{s.scientificName}</SpeciesName>
          <SpeciesInfo>Kingdom: {s.kingdom}</SpeciesInfo>
          <SpeciesInfo>Phylum: {s.phylum}</SpeciesInfo>
          <SpeciesInfo>Class: {s.class}</SpeciesInfo>
          <AdditionalInfo>
            <p>Conservation Status: {s.iucnRedListCategory || 'Unknown'}</p>
            <p>Habitat: {s.habitats?.join(', ') || 'Not specified'}</p>
            <p>Last Updated: {new Date(s.modified).toLocaleDateString()}</p>
          </AdditionalInfo>
        </SpeciesCard>
      ))}
    </div>
  );
};

export default SpeciesDisplay;

