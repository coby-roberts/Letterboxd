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
            tabIndex={0}
            onClick={() => setSelectedPage("diary")}
            onKeyDown={(e) => e.key === "Enter" && setSelectedPage("diary")}
          >
            Diary
          </li>
          <li
            key="films"
            className="UserNavItem"
            tabIndex={0}
            onClick={() => setSelectedPage("films")}
            onKeyDown={(e) => e.key === "Enter" && setSelectedPage("films")}
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
