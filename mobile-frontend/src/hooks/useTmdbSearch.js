import { useEffect, useState } from "react";
import { searchMovies } from "../service/tmdbSearch";

export function useTmdbSearch(query) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

    useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const data = await searchMovies(query);
        setResults(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [query]);

  return { results, loading };
}
