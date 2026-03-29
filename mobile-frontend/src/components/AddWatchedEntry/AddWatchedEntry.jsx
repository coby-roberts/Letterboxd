import "./AddWatchedEntry.css";
import { useEffect, useState } from "react";

function AddWatchedEntry({ movieDetails, username }) {
  const [watched, setWatched] = useState(false);
  const [rating, setRating] = useState(0);

  const URL = `${import.meta.env.VITE_API_URL}/users/${username}/watched?filmId=${movieDetails.id}`;
  const OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  useEffect(() => {
    fetch(URL, OPTIONS)
      .then((res) => {
        if (res.status === 404) {
          setWatched(false);
          return null;
        }
        if (!res.ok) {
          throw new Error("bad network response");
        }
        return res.json();
      })
      .then((json) => {
        if (json) {
          setRating(json.rating);
          setWatched(true);
        }
      })
      .catch((err) => {
        setWatched(false);
        console.log(err);
      });
  }, [movieDetails]);

  return (
    <div className="AddWatchedEntry">
      <button>{ watched ? "Watched" : "Not Watched"}</button>
    </div>
  );
}

export default AddWatchedEntry;
