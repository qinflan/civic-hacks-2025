import React, { useState, useEffect } from "react";
import getOccurrenceByGeo from "../API/getOccurrenceByGeo.js";


const SearchPage = () => {
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
  }, [query]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  // Function to handle click, update URL hash, and scroll to section
  const handleSelect = (name, event) => {
    event.preventDefault();
    setQuery(name);
    const encodedName = encodeURIComponent(name);
    window.history.pushState(null, null, `/#${encodedName}`);
    scrollToSection(encodedName);
  };
  
  
  return (
    <div>
      {/* Embedded CSS inside <style> tag */}
      <style>
       {`
         /* Search Container */
         .search-container {
           max-width: 350px;
           margin: 0 auto;
           padding: 20px;
           border-radius: 12px;
           position: relative;
           display: flex;
           flex-direction: column;
           align-items: center;
         }


         /* Search Box */
         .search-box {
           position: relative;
           width: 100%;
         }


         /* Search Input */
         .search-input {
           width: 100%;
           padding: 12px 45px 12px 15px;
           border: 2px solid #ddd;
           border-radius: 30px;
           outline: none;
           font-size: 16px;
           transition: all 0.3s ease;
           box-sizing: border-box;
           background-color: #FFECDB;
         }


         .search-input:focus {
           border-color: #9BCB60;
           box-shadow: 0 0 8px rgba(0, 123, 255, 0.2);
         }


         /* Dropdown */
         .dropdown {
           position: absolute;
           top: 100%;
           left: 0;
           width: 100%;
           background: white;
           border: 1px solid #ddd;
           border-radius: 8px;
           box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
           max-height: 150px;
           overflow-y: auto;
           margin-top: 5px;
           z-index: 10;
         }


         /* Dropdown Item */
         .dropdown-item {
           display: block;
           width: 100%;
           padding: 10px;
           border: none;
           background: white;
           text-align: left;
           font-size: 16px;
           cursor: pointer;
           transition: background 0.3s ease;
         }


         .dropdown-item:hover {
           background: #f1f1f1;
         }
       `}
     </style>



      <div className="search-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />

          {/* Dropdown Menu */}
          {filteredData.length > 0 && (
            <div className="dropdown">
              {filteredData.map((item, index) => (
                <button
                  key={index}
                  className="dropdown-item"
                  onClick={(e) => handleSelect(item, e)}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;