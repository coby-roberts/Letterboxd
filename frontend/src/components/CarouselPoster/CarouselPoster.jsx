import './CarouselPoster.css';

function CarouselPoster({ item, onClick }) {
  return (
    <div className="CarouselPoster" onClick={onClick}>
      <img
        src={`https://image.tmdb.org/t/p/w185/${item.poster_path}`}
        alt={item.title}
      />
    </div>
  );
}

export default CarouselPoster;
