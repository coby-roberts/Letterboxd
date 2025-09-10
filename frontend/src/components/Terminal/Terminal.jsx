import helpicon from "../../assets/help.svg";
import "./Terminal.css";
import { useState } from "react";
import SearchHistory from "../SearchHistory/SearchHistory";
import HelpMenu from "../HelpMenu/HelpMenu";

function Terminal({
  setActivePage,
  setAuthModal,
  username,
  setUsername,
  setLoggedIn,
  setSearchQuery,
}) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [showHelp, setShowHelp] = useState(false);

  const toggleHelp = () => setShowHelp(prev => !prev);

  const MAX_HISTORY_LENGTH = 5;

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
          setActivePage("films");
          setSearchQuery(searchQuery);
          break;
        default:
          break;
      }

      setHistory((prev) => {
        const newHistory = [...prev, input];
        return newHistory.slice(-MAX_HISTORY_LENGTH);
      });
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>{showHelp && <HelpMenu />}
      <div className="terminal">
       {/*  <SearchHistory history={history} username={username} /> */}
        <div className="searchbar">
          <span id="searchbarusername">
            {username ? username : "anonymous"}
          </span>
          <input
            id="terminalinput"
            className="search-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            tabIndex={1}
          ></input>
          <img src={helpicon} className="help-icon" alt="help" onClick={toggleHelp}></img>
        </div>
      </div>
    </>
  );
}

export default Terminal;
