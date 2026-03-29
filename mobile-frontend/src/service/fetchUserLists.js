//TODO: Depenant on finishing list endpoint

export const fetchUserList = async (username) => {
  const URL = `${import.meta.env.VITE_API_URL}/users/${username}/list/S{listId}`;
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
