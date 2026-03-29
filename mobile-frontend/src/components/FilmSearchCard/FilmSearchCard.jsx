import "./FilmSearchCard.css"
import { useNavigate } from "react-router-dom"


function FilmSearchCard({ movie }) {
  const navigate = useNavigate();

  return (
    
    <li className="FilmSearchCard" onClick={() => navigate(`/film/${movie.id}`)}>
      <div className="FilmSearchCardPoster">
        <img src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} />
      </div>
      <div className="FilmSearchCardContent">
        <p>{movie.original_title}</p>
        <div>
          <p>{movie.release_date}</p>
          <p>{movie.original_language}</p>
        </div>
        {/* <div>
          <p>{movie.overview}</p>
        </div> */}
        <div>{movie.vote_average}</div>
      </div>
    </li>
  );
}

export default FilmSearchCard;
