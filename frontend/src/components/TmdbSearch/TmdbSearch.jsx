import React from 'react';
import './TmdbSearch.css';

function TmdbSearch({ searchResult, selectedIndex, setSelectedIndex, refs }) {

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => Math.min(prev + 1, searchResult.length - 1));
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
      e.preventDefault();
    } else if (e.key === "Enter") {
      console.log("Selected:", searchResult[selectedIndex]);
    }
  };

  return (
      <div className="TmdbSearch side-by-side">
        {searchResult ? (
          searchResult.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => (refs.current[i] = el)}
              tabIndex={0}
              className={i === selectedIndex ? "film selected" : "film"}
              onClick={() => setSelectedIndex(i)}
              onKeyDown={handleKeyDown}
            >
              {" "}
              <p className="title">
                {item.title} <span className="date">{item.release_date}</span>{" "}
              </p>{" "}
            </div>
          ))
        ) : (
          <div>
            {" "}
            <p>No Results</p>{" "}
          </div>
        )}{" "}
      </div>
  );
}

export default TmdbSearch;