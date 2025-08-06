import "./App.css";

import { useState, useEffect } from "react";

import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Settings from "./components/Settings/Settings";
import Me from "./components/Me/Me";
import Films from "./components/Films/Films";
import Signup from "./components/Signup/Signup";
import Terminal from "./components/Terminal/Terminal";

function App() {

const [activePage, setActivePage] = useState("dashboard");
const [authModal, setAuthModal] = useState(null);
const [username, setUsername] = useState(localStorage.getItem("username") || null);
const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
const [searchQuery, setSearchQuery] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setUsername(username);
    }
  }, []);

  return (
  <>
    {/* Main screen */}
    {activePage === "dashboard" && <Dashboard loggedIn={loggedIn} />}
    {activePage === "films" && <Films searchQuery={searchQuery} />}
    {activePage === "settings" && loggedIn && <Settings />}
    {activePage === "me" && loggedIn && <Me />}


    {/* Auth modals */}
    {authModal === "login" && (
      <Login
        onClose={() => setAuthModal(null)}
        setLoggedIn={setLoggedIn}
        setUsername={setUsername}
      />
    )}
    {authModal === "signup" && (
      <Signup
        onClose={() => setAuthModal(null)}
        setLoggedIn={setLoggedIn}
        setUsername={setUsername}
      />
    )}

    {/* Terminal always available */}
    <Terminal
      setActivePage={setActivePage}
      setAuthModal={setAuthModal}
      username={username}
      setUsername={setUsername}
      loggedIn={loggedIn}
      setLoggedIn={setLoggedIn}
      setSearchQuery={setSearchQuery}
    />
  </>
  );
}

export default App;
