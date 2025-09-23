import "./Films.css";

import { useEffect, useState } from "react";

import CarouselPoster from "../CarouselPoster/CarouselPoster";
function Films({ setSelectedMovieId, username }) {
  const [films, setFilms] = useState([]);

  const URL = `${import.meta.env.VITE_API_URL}/users/${username}/films`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  useEffect(() => {
    fetch(URL, options)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setFilms(json);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <section className="Films">
      <h1>Films</h1>
      <div className="UserFilmList">
        {films && films.length > 0 ? (
          films.map((item) => (
            <CarouselPoster
              key={item.watched_id}
              item={item.film}
              className={"UserFilmListItem"}
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
