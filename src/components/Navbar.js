import React, { useState } from "react";
import "./Navbar.css";
import logo from "../assets/nav.png";
import lightIcon from "../assets/sun.png"; // Placeholder image for light mode
import darkIcon from "../assets/moon.png";   // Placeholder image for dark mode

const Navbar = ({ setPage, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  const toggleTheme = () => {
    setIsLightMode((prevMode) => !prevMode);
    document.body.classList.toggle("light-mode");
  };

  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" className="logo" />

      {/* Theme toggle */}
      <div className="theme-toggle">
        <label className="switch">
          <input
            type="checkbox"
            checked={isLightMode}
            onChange={toggleTheme}
          />
          <span className="slider"></span>
        </label>
        <img
          src={isLightMode ? lightIcon : darkIcon}
          alt={isLightMode ? "Light Mode" : "Dark Mode"}
          className="theme-icon"
        />
      </div>

      {/* Hamburger menu */}
      <button
        className="hamburger-menu"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        &#9776;
      </button>

      <div className={`dropdown-menu ${isOpen ? "open" : ""}`}>
        <a
          href="#$GEMS"
          onClick={(e) => setPage("gems", e)}
          className={currentPage === "gems" ? "active" : ""}
        >
          - $BDEN
        </a>
        <a
          href="#gemini"
          onClick={(e) => setPage("gpt", e)}
          className={currentPage === "gpt" ? "active" : ""}
        >
          - Stake $BDEN
        </a>
        <a
          href="#chad"
          onClick={(e) => setPage("chad", e)}
          className={currentPage === "chad" ? "active" : ""}
        >
          - $BDEN Ranks
        </a>
        <a
          href="#moon"
          onClick={(e) => setPage("moon", e)}
          className={currentPage === "moon" ? "active" : ""}
        >
          - MC Goals
        </a>
        <a
          href="#learn"
          onClick={(e) => setPage("learn", e)}
          className={currentPage === "learn" ? "active" : ""}
        >
          - Learn More
        </a>
        <a
          href="#all"
          onClick={(e) => setPage("all", e)}
          className={currentPage === "all" ? "active" : ""}
        >
          - All Listings
        </a>
        <a
          href="#community"
          onClick={(e) => setPage("community", e)}
          className={currentPage === "community" ? "active" : ""}
        >
          - Rankings
        </a>
        <a
          href="#featured"
          onClick={(e) => setPage("featured", e)}
          className={currentPage === "featured" ? "active" : ""}
        >
          - Den List
        </a>
        <a
          href="https://x.com/basegems_io"
          target="_blank"
          rel="noopener noreferrer"
        >
          - Twitter / X
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
