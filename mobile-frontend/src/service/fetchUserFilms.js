export const fetchUserFilms = async (username) => {
  const URL = `${import.meta.env.VITE_API_URL}/users/${username}/watchedFilms`;
  const OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  const response = await fetch(URL, OPTIONS);

  if (!response.ok) {
    console.log(response.status);
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
};
