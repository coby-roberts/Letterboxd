import "./Dashboard.css";
import Carousel from "./Carousel/Carousel";
import Friends from "./Friends/Friends";

import { useEffect, useState } from "react";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;


function Dashboard({ loggedIn }) {
  const [data, setData] = useState([]);

  const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  useEffect(() => {
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setData(json.results);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      <Carousel data={data} title={"Trending"} />
      {/* {loggedIn && <Carousel />} */}
    </>
  );
}

export default Dashboard;
