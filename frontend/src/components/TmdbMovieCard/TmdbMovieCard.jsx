import { useEffect, useState, forwardRef } from "react";
import "./TmdbMovieCard.css";

import fallbackImg from "../../assets/1280x720.webp";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const TmdbMovieCard = forwardRef(({ movieId }, ref) => {
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
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
  }, [movieId]);

  if (!movieId) return <p>Select a movie.</p>;
  if (!movieDetails) return <p>Loading...</p>;

  const backdropUrl = movieDetails.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280/${movieDetails.backdrop_path}`
    : fallbackImg;

  return (
    <div
      className="TmdbMovieCard side-by-side"
      style={{ fontFamily: "monospace", color: "#9AE6B4" }}
      tabIndex={0}
      ref={ref}
    >
      {/* Backdrop */}
      <div style={{ position: "relative" }}>
        {backdropUrl && (
          <img
            src={backdropUrl}
            alt={movieDetails.title}
            style={{ width: "100%", display: "block", objectFit: "cover" }}
          />
        )}

        {/* Scanlines overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34,197,94,0.03) 2px, rgba(34,197,94,0.03) 4px)",
          }}
        ></div>

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.8), transparent 50%, rgba(0,0,0,0.6))",
          }}
        >
          {/* Top-left info */}
          <div
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              backgroundColor: "rgba(0,0,0,0.8)",
              padding: 8,
              border: "1px solid #22c55e",
            }}
          >
            <div
              style={{ fontSize: "10px", color: "#68D391", marginBottom: 4 }}
            >
              ► STATUS: [ACTIVE]
            </div>
            <div style={{ fontSize: "10px", color: "#E6FFFA" }}>
              {movieDetails.release_date} | {movieDetails.runtime}min |{" "}
              {movieDetails.original_language.toUpperCase()}
            </div>
          </div>

          {/* Top-right rating */}
          <div
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              backgroundColor: "rgba(0,0,0,0.8)",
              padding: 8,
              border: "1px solid #22c55e",
            }}
          >
            <div
              style={{ fontSize: "10px", color: "#68D391", marginBottom: 4 }}
            >
              ► RATING:
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ color: "#E6FFFA", fontSize: "10px" }}>
                {movieDetails.vote_average.toFixed(1)}/10
              </span>
              <div>
                {Array.from({
                  length: Math.floor(movieDetails.vote_average),
                }).map((_, i) => (
                  <span key={i} style={{ fontSize: "10px", color: "#A7F3D0" }}>
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom-left: Title & Genres */}
          <div
            style={{
              position: "absolute",
              bottom: 16,
              left: 16,
              backgroundColor: "rgba(0,0,0,0.9)",
              padding: 16,
              border: "1px solid #22c55e",
              maxWidth: 400,
            }}
          >
            <div
              style={{ fontSize: "10px", color: "#68D391", marginBottom: 4 }}
            >
              ► TITLE:
            </div>
            <h1 style={{ fontSize: "20px", marginBottom: 8, color: "#E6FFFA" }}>
              {movieDetails.title}
            </h1>

            <div
              style={{ fontSize: "10px", color: "#68D391", marginBottom: 2 }}
            >
              ► GENRES:
            </div>
            <div style={{ fontSize: "12px", color: "#E6FFFA" }}>
              {movieDetails.genres.map((genre, i) => (
                <span key={genre.id}>
                  {genre.name}
                  {i < movieDetails.genres.length - 1 ? " | " : ""}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom-right system status */}
          <div
            style={{
              position: "absolute",
              bottom: 16,
              right: 16,
              backgroundColor: "rgba(0,0,0,0.8)",
              padding: 8,
              border: "1px solid #22c55e",
              fontSize: "10px",
            }}
          >
            <div style={{ color: "#68D391" }}>[IMG_LOADED]</div>
            <div style={{ color: "#047857" }}>SYS: ONLINE</div>
          </div>
        </div>
      </div>

      {/* Detailed info below */}
      <div style={{ padding: 24 }}>
        {/* Overview */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ color: "#68D391", marginBottom: 4 }}>► OVERVIEW:</div>
          <div
            style={{
              color: "#E6FFFA",
              borderLeft: "2px solid #22c55e",
              paddingLeft: 8,
            }}
          >
            {movieDetails.overview}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
          }}
        >
          {/* Origin Country */}
          <div>
            <div style={{ color: "#68D391", marginBottom: 4 }}>
              ► ORIGIN_COUNTRY:
            </div>
            <div>{movieDetails.origin_country.join(", ")}</div>
          </div>

          {/* Production Companies */}
          <div>
            <div style={{ color: "#68D391", marginBottom: 4 }}>
              ► PRODUCTION:
            </div>
            <div>
              {movieDetails.production_companies
                .slice(0, 2)
                .map((company, i) => (
                  <span key={company.id}>
                    {company.name}
                    {i <
                    Math.min(movieDetails.production_companies.length, 2) - 1
                      ? " | "
                      : ""}
                  </span>
                ))}
            </div>
          </div>

          {/* Cast */}
          <div>
            <div style={{ color: "#68D391", marginBottom: 4 }}>► CAST:</div>
          </div>

          {/* Crew */}
          <div>
            <div style={{ color: "#68D391", marginBottom: 4 }}>► CREW:</div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default TmdbMovieCard;
