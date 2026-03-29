const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export async function searchMovies(query) {
  if (!query) return [];

  const URL = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
    query
  )}&include_adult=false&language=en-US&page=1`;

  const OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  const res = await fetch(URL, OPTIONS);
  if (!res.ok) throw new Error("TMDB request failed");

  const json = await res.json();
  console.log(json);
  return json.results;
}
