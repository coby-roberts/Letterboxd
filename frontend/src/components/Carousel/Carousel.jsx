import { useEffect, useRef } from "react";
import "./Carousel.css";
import CarouselPoster from "../CarouselPoster/CarouselPoster";

function Carousel({ data, title, setSelectedMovieId}) {
  const postersRef = useRef(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setSelectedMovieId(null);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setSelectedMovieId]);

  return (
    <>
      <div className="Carousel Modal">
        <div className="carousel-heading">
          <h1 id={title}>{title}</h1>
        </div>

        <div className="posters" ref={postersRef}>
          {data.map((item) => (
            <CarouselPoster
              key={item.id}
              item={item}
              onClick={() => setSelectedMovieId(item.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Carousel;
