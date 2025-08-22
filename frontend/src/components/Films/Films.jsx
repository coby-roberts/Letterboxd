import TmdbMovieCard from "../TmdbMovieCard/TmdbMovieCard";
import TmdbSearch from "../TmdbSearch/TmdbSearch";
import "./Films.css";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
import { useEffect, useState, useRef } from "react";
function Films({ searchQuery }) {

  const [searchResult, setSearchResult] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const refs = useRef([]);
  const movieCardRef = useRef(null);

  useEffect(() => {
    console.log("Search Query:", searchQuery);
    if (!searchQuery) return;
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      searchQuery
    )}&include_adult=false&language=en-US&page=1`;
    const options = {
      method: "GET",
      headers: { accept: "application/json", 
      Authorization: `Bearer ${TOKEN}` },
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

  useEffect(() => {
    if (searchResult && searchResult.length > 0) {
      setSelectedIndex(0);
      setTimeout(() => {
        if (refs.current[0]) {
          refs.current[0].focus();        
        }
      }, 0);
    }  
  }, [searchResult])

  const selectedMovieId =
    searchResult && searchResult[selectedIndex]
      ? searchResult[selectedIndex].id
      : null;


  const handleSearchEnter = () => {
    if (movieCardRef.current) {
      movieCardRef.current.focus();
    }
  }

  return (
    <div className="Films">
      <TmdbSearch
        refs={refs}
        searchResult={searchResult}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        onEnter={handleSearchEnter}
      />
      <TmdbMovieCard ref={movieCardRef} movieId={selectedMovieId} />
    </div>
  );
}
export default Films;
