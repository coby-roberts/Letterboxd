import { useEffect, useState, useRef } from "react";
import "./Carousel.css";
import CarouselPoster from "../CarouselPoster/CarouselPoster";

function Carousel({ data, title, setSelectedMovieId }) {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const postersRef = useRef(null);

  const className = "DashBoardTmdbMovieCard";
  
  // Calculate items per page based on container width
  const calculateItemsPerPage = () => {
    if (postersRef.current) {
      const containerWidth = postersRef.current.offsetWidth - 32;
      const minItemWidth = 150 + 16;
      const itemsPerRow = Math.floor(containerWidth / minItemWidth);
      
      setItemsPerPage(Math.max(itemsPerRow, 1));
    }
  };

  useEffect(() => {
    calculateItemsPerPage();
    
    const handleResize = () => {
      calculateItemsPerPage();
      setPage(0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxPage = Math.ceil(data.length / itemsPerPage) - 1;

  const currentItems = data.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  const handleNext = () => {
    setPage((prev) => (prev >= maxPage ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setPage((prev) => (prev <= 0 ? maxPage : prev - 1));
  };

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
      <div className="carousel">
        <div className="carousel-heading">
          <button onClick={handlePrev}>←</button>
          <h1 id={title}>{title}</h1>
          <button onClick={handleNext}>→</button>
        </div>
        
        <div className="posters" ref={postersRef}>
          {currentItems.map((item) => (
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