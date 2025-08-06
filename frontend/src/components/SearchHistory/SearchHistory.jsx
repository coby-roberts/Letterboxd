import "./SearchHistory.css";

function SearchHistory({ history, username }) {
  return (
    <div className={history.length > 0 ? "history padded" : "history"}>
      {history.map((line, index) => {
        return (
          <p className="history-line" key={index}>
            <span className={username ? "username loggedIn" : "username loggedOut"} id="username">{username ? username : "anonymous"}</span>
            {line}
          </p>
        );
      })}
    </div>
  );
}

export default SearchHistory;
