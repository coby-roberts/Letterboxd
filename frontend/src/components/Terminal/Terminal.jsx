import helpicon from "../../assets/help.svg";
import "./Terminal.css";
import { useState, useRef, useEffect } from "react";
import HelpMenu from "../HelpMenu/HelpMenu";
import TerminalData from "../TerminalData/TerminalData";
import TmdbMovieCard from "../TmdbMovieCard/TmdbMovieCard";

function Terminal({
  setActivePage,
  setAuthModal,
  username,
  setUsername,
  setLoggedIn,
  setSelectedMovieId,
  selectedMovieId,
}) {
  const [input, setInput] = useState("");
  const [showHelp, setShowHelp] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const refs = useRef([]);
  const movieCardRef = useRef(null);

  const toggleHelp = () => setShowHelp((prev) => !prev);

  const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

  useEffect(() => {
    if (searchResult && searchResult.length > 0) {
      refs.current[0].focus();
    }
  }, [searchResult]);

  const handleSubmit = () => {
    if (input != "") {
      let formattedInput = input.toLowerCase().trim();

      const values = formattedInput.split(" ");

      const searchQuery = values.slice(1);

      switch (values[0]) {
        case "login":
          setAuthModal("login");
          break;
        case "signup":
          setAuthModal("signup");
          break;
        case "logout":
          localStorage.clear();
          setUsername(null);
          setLoggedIn(false);
          setActivePage("dashboard");
          break;
        case "dashboard":
          setActivePage("dashboard");
          break;
        case "settings":
          setActivePage("settings");
          break;
        case "me":
          setActivePage("me");
          break;
        case "films":
          const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            searchQuery
          )}&include_adult=false&language=en-US&page=1`;
          const options = {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${TOKEN}`,
            },
          };

          fetch(url, options)
            .then((res) => res.json())
            .then((json) => {
              console.log(json);
              setSearchResult(json.results);
              if (json.results && json.results.length > 0) {
                setSelectedIndex(0);
              }
            })
            .catch((err) => console.error(err));

          break;
        default:
          break;
      }
      setInput("");
    }
  };

  const handleSearchEnter = () => {
    if (
      searchResult &&
      searchResult.length > 0 &&
      searchResult[selectedIndex]
    ) {
      setSelectedMovieId(searchResult[selectedIndex].id);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      {showHelp && <HelpMenu />}
      <nav className="Terminal Modal">
        <TerminalData
          refs={refs}
          searchResult={searchResult}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          onEnter={handleSearchEnter}
          setSelectedMovieId={setSelectedMovieId}
        />
        <div className="searchbar">
          <span id="searchbarusername">
            {username ? username : "anonymous"} {">"}
          </span>
          <input
            id="terminalinput"
            className="search-input"
            type="text"
            autoComplete="off"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            tabIndex={1}
          ></input>
          <img
            src={helpicon}
            className="help-icon"
            alt="help"
            onClick={toggleHelp}
          ></img>
        </div>
      </nav>
      {selectedMovieId && (
        <TmdbMovieCard
          ref={movieCardRef}
          selectedMovieId={selectedMovieId}
          setSelectedMovieId={setSelectedMovieId}
          username={username}
        />
      )}
    </>
  );
}

export default Terminal;
