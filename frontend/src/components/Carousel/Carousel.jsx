import { useEffect, useState, useRef } from "react";
import "./Carousel.css";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

function Carousel({ data, title }) {
  const [page, setPage] = useState(0);
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
            <div className="poster" key={item.id}>
              {/* {item.title} */}
              <img
                src={`https://image.tmdb.org/t/p/w185/${item.poster_path}`}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Carousel;
