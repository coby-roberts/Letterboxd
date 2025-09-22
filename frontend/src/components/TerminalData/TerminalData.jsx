import "./TerminalData.css";
import { useRef } from "react";

function TerminalData({
  searchResult,
  selectedIndex,
  setSelectedIndex,
  refs,
  onEnter,
  setSelectedMovieId,
}) {
  const scrollRef = useRef(null);

  const handleKeyDown = (e) => {
    if (!searchResult || searchResult.length === 0) return;

    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => Math.min(prev + 1, searchResult.length - 1));
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
      e.preventDefault();
    } else if (e.key === "Enter") {
      e.preventDefault();

      const selectedMovie = searchResult[selectedIndex];
      if (selectedMovie) {
        setSelectedMovieId(selectedMovie.id);
      }
      onEnter?.();

      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }
  };

  return (
    <section
      className="TerminalData"
      tabIndex={2}
      onKeyDown={handleKeyDown}
      ref={scrollRef}
    >
      <ul className="TerminalList">
        {searchResult && searchResult.length > 0 ? (
          searchResult.map((item, i) => (
            <li
              key={item.id}
              ref={(el) => (refs.current[i] = el)}
              tabIndex={0}
              className={
                i === selectedIndex
                  ? "FilmListItem SelectedFilmListItem"
                  : "FilmListitem"
              }
              onClick={() => {
                refs.current[i]?.blur();
                setSelectedIndex(i);
                setSelectedMovieId(item.id);
              }}
            >
              <time className="release-date">
                {item.release_date ? item.release_date : "****-**-**"}
              </time>{" "}
              <span className="title">{item.title}</span>
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
    </section>
  );
}
export default TerminalData;
