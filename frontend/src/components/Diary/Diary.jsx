import "./Diary.css";
import { useEffect, useState } from "react";

function Diary({ username }) {
  const [diaryEntries, setDiaryEntries] = useState([]);

  const URL = `${import.meta.env.VITE_API_URL}/users/${username}/diary`;

  const OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  useEffect(() => {
    fetch(URL, OPTIONS)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setDiaryEntries(json);
      })
      .catch((err) => console.log(err));
  }, [username]);

  return (
    <section className="Diary">
      <h1>Diary</h1>
      <ul className="UserDiaryList">
        {diaryEntries && diaryEntries.length > 0 ? (
          diaryEntries.map((entry) => (
            <li key={entry.diaryDto.entry_id} className="UserDiaryListItem">
              {/* <img></img> */}
              <time>{entry.diaryDto.watchDate}</time>
              <img src={`https://image.tmdb.org/t/p/w185/${entry.filmDto.poster_path}`} />
              <h1>{entry.filmDto.title}</h1>
              <p>{entry.diaryDto.rating}</p>
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
    </section>
  );
}

export default Diary;
