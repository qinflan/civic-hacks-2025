import React, { useState, useEffect } from "react";
import getOccurrenceByGeo from "./getOccurrenceByGeo.js";

const SearchEngine = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getOccurrenceByGeo(
      { lat1: 42, lat2: 42.5 },
      { lon1: -71, lon2: -70.5 },
      setTopics
    );
  }, []);

  // Remove duplicates using Set
  const nameList = [...new Set(topics.map((topic) => topic.genericName))];

  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (query) {
      setFilteredData(
        nameList.filter((item) =>
          item.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFilteredData([]);
    }
  }, [query, nameList]);

  // Function to handle click and update URL
  const handleSelect = (name) => {
    setQuery(name);
    window.location.hash = `#${encodeURIComponent(name)}`;
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 relative">
      <h2 className="text-xl font-bold text-gray-900">🔍 Search List</h2>
      <input
        type="text"
        placeholder="Type to search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      
      {/* Dropdown Menu (Now 100% Vertical) */}
      {filteredData.length > 0 && (
        <div className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10 flex flex-col">
          {filteredData.map((item, index) => (
            <button
              key={index}
              className="block w-full text-left p-3 bg-white text-gray-700 cursor-pointer hover:bg-blue-100 border-b border-gray-200 last:border-none"
              onClick={() => handleSelect(item)}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchEngine;
