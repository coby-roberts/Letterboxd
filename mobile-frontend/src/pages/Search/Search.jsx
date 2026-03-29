import "./Search.css";
import { useState } from "react";
import { useAuth } from "../../AuthContext";
import { useTmdbSearch } from "../../hooks/useTmdbSearch";
import FilmSearchCard from "../../components/FilmSearchCard/FilmSearchCard";
import { Settings2 } from 'lucide-react';

function Search() {
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const { results, loading } = useTmdbSearch(query);

  return (
    <main className="Search">
      <div className="Content">
        {/* <div className="Box"> */}
        <input
          id="searchbar"
          placeholder="Search"
          name="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {/* </div> */}
        <div className="SearchToolBar">
          <button className="NavButton">Films</button>
          {user && <button className="NavButton">Friends</button>}
          {/* TODO: make icon fill entire button area, shrink div to only be a sqaure */}
          <button className="NavButton icon-button">
            <Settings2 />
          </button>
        </div>
        {results.length > 0 && (
          <div className="SearchResults Box">
            {loading && <p>Loading...</p>}
            <ul className="SearchResults">
              {!loading &&
                results.map((movie) => (
                  <FilmSearchCard key={movie.id} movie={movie} />
                ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}

export default Search;
