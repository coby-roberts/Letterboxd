import "./Me.css";
import Profile from "../Profile/Profile";
import Diary from "../Diary/Diary";
import Films from "../Films/Films";
import { useEffect, useState } from "react";

function Me({ username, setSelectedMovieId }) {
  const [selectedPage, setSelectedPage] = useState("diary");

  return (
    <section className={"Me Modal"}>
      <Profile username={username} />
      {/* <Diary /> */}
      <nav className="Nav">
        <ul className="UserNav">
          <li
            key="diary"
            className="UserNavItem"
            onClick={() => setSelectedPage("diary")}
          >
            Diary
          </li>
          <li
            key="films"
            className="UserNavItem"
            onClick={() => setSelectedPage("films")}
          >
            Films
          </li>
        </ul>
      </nav>
      {selectedPage == "diary" && <Diary username={username} />}
      {selectedPage == "films" && (
        <Films username={username} setSelectedMovieId={setSelectedMovieId} />
      )}
    </section>
  );
}

export default Me;
