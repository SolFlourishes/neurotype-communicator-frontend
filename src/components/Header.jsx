import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  // NOTE: A more advanced dropdown would use state, but we'll use a CSS-only approach for simplicity.
  return (
    <header className="app-header">
      <div className="header-content">
        <NavLink to="/" className="logo">
          Neurotype Communicator
        </NavLink>
        <nav className="main-nav">
          <div className="dropdown">
            <button className="dropdown-button">More</button>
            <div className="dropdown-content">
              <NavLink to="/how-to-use">How to Use</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/roadmap">Roadmap</NavLink>
              <NavLink to="/enhancements">Enhancements</NavLink>
              <NavLink to="/changelog">Change Log</NavLink>
              <NavLink to="/credits">Credits</NavLink>
              <NavLink to="/contact">Contact Us</NavLink>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;