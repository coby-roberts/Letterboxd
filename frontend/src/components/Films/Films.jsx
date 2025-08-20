import "./Films.css";
import TmdbMovieCard from "../TmdbMovieCard/TmdbMovieCard";
import { useEffect, useState, useRef } from "react";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

function Films({ searchQuery }) {
  const [searchResult, setSearchResult] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const refs = useRef([]);

  useEffect(() => {
    console.log("Search Query:", searchQuery);
    if (!searchQuery) return;

    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      searchQuery
    )}&include_adult=false&language=en-US&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setSearchResult(json.results);
        if (json.results && json.results.length > 0) {
          setSelectedIndex(0);
        }
      })
      .catch((err) => console.error(err));
  }, [searchQuery]);

  useEffect(() => {
    if (refs.current[selectedIndex]) {
      refs.current[selectedIndex].focus();
    }
  }, [selectedIndex]);

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
    <div className="Films">
      <div id="search-results">
        {searchResult ? (
          searchResult.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => (refs.current[i] = el)}
              tabIndex={0}
              className={i === selectedIndex ? "film selected" : "film"}
              onClick={() => setSelectedIndex(i)}
              onMouseEnter={() => setSelectedIndex(i)} 
              onKeyDown={handleKeyDown}
            >
              <p className="title"><span className="date">{item.release_date} {item.title}</span>
                </p>
              
            </div>
          ))
        ) : (
          <div>
            <p>No Results</p>
          </div>
        )}
      </div>
      <TmdbMovieCard movieId={searchResult?.[selectedIndex]?.id} />
    </div>
  );
}

export default Films;