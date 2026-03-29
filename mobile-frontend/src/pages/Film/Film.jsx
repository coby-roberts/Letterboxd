import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { useFilm } from "../../hooks/useFilm";
import "./Film.css";
import { useAuth } from "../../AuthContext";

import FilmInfo from "../../components/FilmInfo/FilmInfo";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

function Film() {
  const { filmId } = useParams();
  const { user } = useAuth();
  const { film, loading, error } = useFilm(filmId);

  if (!film) return null;

  return (
    <>
      {error && (
        <main className="Film">
          <div className="Content">
            <p>Error: {error}</p>
            <p>{film}</p>
          </div>
        </main>
      )}
      {loading && (
        <main className="Film">
          <div className="Content">
            <p>Loading...</p>
          </div>
        </main>
      )}
      {film && <FilmInfo film={film} />}
    </>
  );
}

export default Film;
