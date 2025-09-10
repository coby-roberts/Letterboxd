import { useEffect, useState, useRef } from "react";
import "./Carousel.css";
import CarouselPoster from "../CarouselPoster/CarouselPoster";
import TmdbMovieCard from "../TmdbMovieCard/TmdbMovieCard";

//const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

function Carousel({ data, title, setSelectedMovieId }) {

  const [page, setPage] = useState(0);

  const className = "DashBoardTmdbMovieCard";
  const itemsPerPage = 10;

  const maxPage = Math.ceil(data.length / itemsPerPage) - 1;

  const currentItems = data.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  const handleNext = () => {
    setPage((prev) => (prev >= maxPage ? 0 : prev + 1)); // loop
  };

  const handlePrev = () => {
    setPage((prev) => (prev <= 0 ? maxPage : prev - 1)); // loop
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setSelectedMovieId(null);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);


  return (
    <>
      <div className="carousel">
        <div className="carousel-heading">
          <button onClick={handlePrev}>←</button>
          <h1 id={title}>{title}</h1>
          <button onClick={handleNext}>→</button>
        </div>
        

        <div className="posters">
          {currentItems.map((item) => (
            <CarouselPoster 
              key={item.id}
              item={item}
              onClick={() => setSelectedMovieId(item.id)}/>
          ))}
        </div>
      </div>
      {/* {selectedMovieId && <TmdbMovieCard class={className} movieId={selectedMovieId} />} */}
    </>
  );
}

export default Carousel;
