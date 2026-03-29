const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export async function fetchFilm(filmId, signal) {
  if (!filmId) return;

      const URL = `https://api.themoviedb.org/3/movie/${filmId}?language=en-US`;
      const OPTIONS = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        signal,
      };

  const res = await fetch(URL, OPTIONS);
  if (!res.ok) throw new Error("TMDB request failed");

  const json = await res.json();
  console.log(json);
  return json;
}