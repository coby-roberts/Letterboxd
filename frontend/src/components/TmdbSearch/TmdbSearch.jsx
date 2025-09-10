import { useEffect } from 'react';
import './TmdbSearch.css';

function TmdbSearch({ searchResult, selectedIndex, setSelectedIndex, refs, onEnter }) {


  const handleKeyDown = (e) => {

    if (!searchResult || searchResult.length === 0) return;

    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => Math.min(prev + 1, searchResult.length - 1));
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
      e.preventDefault();
    } else if (e.key === "Enter") {
      e.preventDefault();
      onEnter?.();
    }
  };

  useEffect(() => {
    
  })

  return (
      <div
        className="TmdbSearch side-by-side"              
        tabIndex={2}
        onKeyDown={handleKeyDown}>
      <ul className="TmdbSearchResults">
        {searchResult && searchResult.length > 0 ? (
          searchResult.map((item, i) => (
            <li
              key={item.id}
              ref={(el) => (refs.current[i] = el)}
              tabIndex={-1}
              className={i === selectedIndex ? "FilmListItem SelectedFilmListItem" : "FilmListitem"}
              onClick={() => setSelectedIndex(i)}
            >{item.release_date} {item.title}</li>
          ))
        ) : (
          <li>No Results
          </li>
          )}
      </ul>
      </div>
  );
}

export default TmdbSearch;
