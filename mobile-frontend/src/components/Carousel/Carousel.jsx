import { useRef } from "react";
import "./Carousel.css";
import CarouselPoster from "../CarouselPoster/CarouselPoster";

const SKELETON_COUNT = 10;

function CarouselSkeleton({ title }) {
  return (
    <div className="Carousel">
      <div className="carousel-heading">
        <h1>{title}</h1>
      </div>
      <div className="posters">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <div key={i} className="SkeletonCard" />
        ))}
      </div>
    </div>
  );
}

function Carousel({ title, data, isLoading }) {
  const postersRef = useRef(null);

  if (isLoading) return <CarouselSkeleton title={title} />

  return (
      <div className="Carousel">
        <div className="carousel-heading">
          <h1 id={title}>{title}</h1>
        </div>
        <div className={`posters ${title}`} ref={postersRef}>
          {data?.map((film) => (
            <CarouselPoster key={film.id} film={film} />
          ))}
        </div>
      </div>
  );
}

export default Carousel;
