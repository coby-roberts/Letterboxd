const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
};

export const fetchTrending = async () => {
  const response = await fetch(url, options);

  if (!response.ok)
    throw new Error(`TMDB error: ${response.status} ${response.statusText}`);

  return await response.json();
};
