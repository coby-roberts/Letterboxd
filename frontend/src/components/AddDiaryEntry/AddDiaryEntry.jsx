import "./AddDiaryEntry.css";
import { FilmDto } from "../../dto/FilmDto";
import { DiaryEntryDto } from "../../dto/DiaryEntryDto";
import { useState } from "react";

function AddDiaryEntry({ movieDetails, username }) {
  const [open, setOpen] = useState(false);
  const [watchDate, setWatchDate] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const URL = `${import.meta.env.VITE_API_URL}/users/${username}/diary`;
  const token = localStorage.getItem("token");

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      diaryDto: DiaryEntryDto({
        username: username,
        film_id: movieDetails.id,
        watchDate: watchDate,
        rating: rating,
        review: review,
      }),
      filmDto: FilmDto({
        id: movieDetails.id,
        title: movieDetails.title,
        release_date: movieDetails.release_date,
        director: movieDetails.director,
        producer: movieDetails.producer,
        original_language: movieDetails.original_language,
        overview: movieDetails.overview,
        cast: movieDetails.cast,
        backdrop_path: movieDetails.backdrop_path,
        poster_path: movieDetails.poster_path,
        genre: movieDetails.genre,
      }),
    };

    const OPTIONS = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    };

    fetch(URL, OPTIONS)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      })
      .catch((err) => console.log(err));
      setWatchDate("");
      setRating(0);
      setReview("");
      setOpen(false);
  };

  return (
    <>
      <button onClick={() => setOpen(true)}>Add To Diary</button>
      {open && (
        <form onSubmit={handleSubmit}>
          <ul>
            <li>
              <label>
                Date:{" "}
                <input
                  type="date"
                  value={watchDate}
                  onChange={(e) => setWatchDate(e.target.value)}
                ></input>
              </label>
            </li>
            <li>
              <label>
                Rating:{" "}
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                ></input>
              </label>
            </li>
            <li>
              <label>
                Review
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                ></textarea>
              </label>
            </li>
          </ul>
          <div>
            <button type="button" onClick={() => setOpen(false)}>Exit</button>
            <button type="submit">Confirm</button>
          </div>
        </form>
      )}
    </>
  );
}

export default AddDiaryEntry;