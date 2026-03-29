import { useEffect, useState } from "react";
import { fetchFilm } from "../service/fetchFilm";

export function useFilm(filmId) {
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

    useEffect(() => {
    if (!filmId) {
      setFilm(null);
      return;
    }

    async function loadFilm() { 
      try {
        setLoading(true);
        const data = await fetchFilm(filmId);
        setFilm(data);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadFilm();
  }, [filmId]);

  return { film, loading, error };
}
