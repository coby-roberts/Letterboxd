import "./Films.css";
import CarouselPoster from "../../CarouselPoster/CarouselPoster";
import { useUserFilmsQuery } from "../../../hooks/useUserFilmsQuery";
function Films({ username }) {
  const { data: films, isLoading, isError, error} = useUserFilmsQuery(username);

  return (
    <section className="Films">
      <h1>Films</h1>
      <div className="UserFilmList">
        {films && films.length > 0 ? (
          films.map((item) => (
            <CarouselPoster
              key={item.watched_id}
              item={item.film}
              onClick={() => setSelectedMovieId(item.film.id)}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </section>
  );
}
export default Films;
