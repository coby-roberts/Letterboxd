import "./Films.css";

import { useEffect, useState } from "react";
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
      <ul className="UserFilmList">
        {films && films.length > 0 ? (
          films.map((item) => (
            <li
              key={item.watched_id}
              className={"UserFilmListItem"}
              onClick={() => setSelectedMovieId(item.film.id)}
            >
            <img src={`https://image.tmdb.org/t/p/w185/${item.film.poster_path}`}/>
            <p>{item.film.title}</p>
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
    </section>
  );
}
export default Films;
