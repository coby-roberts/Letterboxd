import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer"
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Search from "./pages/Search/Search";
import Film from "./pages/Film/Film";
import Auth from "./pages/Auth/Auth";
import Settings from './pages/Settings/Settings';
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <Nav />
        <Routes>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="profile/:username" element={<Profile />} />
          <Route path="film/:filmId" element={<Film />} />
          <Route path="settings" element={<Settings />} />
          <Route path="auth" element={<Auth />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
