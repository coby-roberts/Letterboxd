import "./CarouselPoster.css";
import { useNavigate } from "react-router-dom";

function CarouselPoster({ film }) {
  const navigate = useNavigate();
  return (
    <div
      className="CarouselPoster"
      onClick={() => navigate(`/film/${film.id}`)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w185/${film.poster_path}`}
        alt={film.title}
      />
    </div>
  );
}

export default CarouselPoster;
