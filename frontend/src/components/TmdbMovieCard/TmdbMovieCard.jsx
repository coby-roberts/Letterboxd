import { useEffect, useState, forwardRef } from "react";
import "./TmdbMovieCard.css";
import AddWatchedEntry from "../AddWatchedEntry/AddWatchedEntry";
import AddDiaryEntry from "../AddDiaryEntry/AddDiaryEntry";

import fallbackImg from "../../assets/1280x720.webp";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const TmdbMovieCard = forwardRef(
  ({ selectedMovieId, setSelectedMovieId, username }, ref) => {
    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
      if (!selectedMovieId) return;

      const url = `https://api.themoviedb.org/3/movie/${selectedMovieId}?language=en-US`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      };

      fetch(url, options)
        .then((res) => res.json())
        .then((json) => setMovieDetails(json))
        .catch((err) => console.log(err));
    }, [selectedMovieId]);

    useEffect(() => {
      const handleEsc = (e) => {
        if (e.key === "Escape") {
          setSelectedMovieId(null);
        }
      };
      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
    }, [setSelectedMovieId]);

    if (!selectedMovieId) return <></>;
    if (!movieDetails) return <></>;

    const backdropUrl = movieDetails.backdrop_path
      ? `https://image.tmdb.org/t/p/w1280/${movieDetails.backdrop_path}`
      : fallbackImg;

    return (
      <div className="TmdbMovieCard Modal" tabIndex={3} ref={ref}>
        <img src={backdropUrl} alt={movieDetails.title} className="TmdbMovieCardImg" />
        <h1>{movieDetails.title}</h1>
        <div>
          <AddWatchedEntry movieDetails={movieDetails} username={username} />
          <AddDiaryEntry movieDetails={movieDetails} username={username} />
        </div>
        <section>
          <h2>RATING:</h2>
          <div>
            <span>{movieDetails.vote_average.toFixed(1)}/10</span>
            <div>
              {Array.from({
                length: Math.round(movieDetails.vote_average),
              }).map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
          </div>
        </section>
        <section>
          <h2>GENRES:</h2>
          <div>
            {movieDetails.genres.map((genre, i) => (
              <span key={genre.id}>
                {genre.name}
                {i < movieDetails.genres.length - 1 ? " | " : ""}
              </span>
            ))}
          </div>
        </section>
        <div>
          {movieDetails.release_date} | {movieDetails.runtime}min |{" "}
          {movieDetails.original_language.toUpperCase()}
        </div>
        <section>
          <h2>OVERVIEW:</h2>
          <p>{movieDetails.overview}</p>
        </section>
        <section>
          <h2>ORIGIN_COUNTRY:</h2>
          <p>{movieDetails.origin_country.join(", ")}</p>
        </section>
        <section>
          <h2>PRODUCTION:</h2>
          <div>
            {movieDetails.production_companies.slice(0, 2).map((company, i) => (
              <span key={company.id}>
                {company.name}
                {i < Math.min(movieDetails.production_companies.length, 2) - 1
                  ? " | "
                  : ""}
              </span>
            ))}
          </div>
        </section>

        {/* Cast */}
        <section>
          <h2>CAST:</h2>
        </section>

        {/* Crew */}
        <section>
          <h2>CREW:</h2>
        </section>
      </div>
    );
  }
);

export default TmdbMovieCard;
