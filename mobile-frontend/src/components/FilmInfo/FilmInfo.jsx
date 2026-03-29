import "./FilmInfo.css";
import { useMemo } from "react";
import { useAuth } from "../../AuthContext";
import { createStarRating } from "../../utils/createStarRating";
import UserFilmToolbar from "../UserFilmToolbar/UserFilmToolbar";
import fallbackImg from "../../assets/1280x720.webp";

function FilmInfo({ film }) {
  const { user } = useAuth();

  const starRating = useMemo(
    () => (film.vote_average ? createStarRating(film.vote_average) : null),
    [film.vote_average]
  );

  const genresList = useMemo(
    () =>
      film?.genres?.map((genre, i) => (
        <>
          <span className="InfoCircle" key={genre.id}>
            {genre.name}
          </span>
          {i < film.genres.length - 1 && "  "}
        </>
      )),
    [film?.genres]
  );

  const backdropUrl = film.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280/${film.backdrop_path}`
    : fallbackImg;

  return (
    <main className="Film FilmInfo">
      <div className="Content">
        <div className="FilmInfoPoster">
          <img src={backdropUrl ? backdropUrl : ""}></img>
        </div>
        <div className="Box BoxInfo FilmRating">
          <span>{film.vote_average.toFixed(1)}</span>
          <div>{starRating}</div>
        </div>
        <div className="Box BoxInfo">
          <label>Title</label>
          <div id="film-title">{film.title}</div>
        </div>
        <div className="Row">
          <div className="Box BoxInfo">
            <label>Released</label>
            <div className="InfoCircle">{film.release_date.split("-")[0]}</div>
          </div>
          <div className="Box BoxInfo">
            <label>Mins</label>
            <div className="InfoCircle">{film.runtime}</div>
          </div>
        </div>
        <div className="Box BoxInfo">
          <label>Description</label>
          <div>{film.overview}</div>
        </div>
        <div className="Row">
          <div className="Box BoxInfo">
            <label>Language</label>
            <div className="InfoCircle">
              {film.original_language?.toUpperCase()}
            </div>
          </div>
          <div className="Box BoxInfo">
            <label>Country</label>
            <div className="InfoCircle">{film.origin_country?.join(", ")}</div>
          </div>
        </div>
        <div className="Box BoxInfo">
          <label>Genres</label>
          <div>{genresList}</div>
        </div>
        <div className="Row">
          <div className="Box BoxInfo">
            <label>Cast</label>
            <div></div>
          </div>
          <div className="Box BoxInfo">
            <label>Crew</label>
            <div></div>
          </div>
        </div>
      </div>

      {user && <UserFilmToolbar />}

      <div className="Content">
        {user && (
          <>
            <div className="Box">Watched By</div>
            <div className="Box">Wants to Watch</div>
          </>
        )}
        <div className="Box">Reviews</div>
      </div>
    </main>
  );
}

export default FilmInfo;
