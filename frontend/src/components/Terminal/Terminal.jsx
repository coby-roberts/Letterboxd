import helpicon from "../../assets/help.svg";
import "./Terminal.css";
import { useState } from "react";

import SearchHistory from "../SearchHistory/SearchHistory";

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
    <>{showHelp && (
      <div className="help">
        <p>This is the help Screen</p>
        <p>dashboard</p>
        <p>profile</p>
        <p>login / logout</p>
        <p>signup</p>
        <p>films 'search-query'</p>
      </div>
    )}
      <div className="terminal">
        <SearchHistory history={history} username={username} />
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
          ></input>
          <img src={helpicon} className="help-icon" alt="help" onClick={toggleHelp}></img>
        </div>
      </div>
    </>
  );
}

export default Terminal;