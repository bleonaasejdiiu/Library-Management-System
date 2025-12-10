import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Header() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* LOGOJA DHE EMRI I RI */}
        <Link to="/" className="navbar-logo">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/3389/3389081.png" 
            alt="Logo" 
            className="logo-image" 
          />
          Universal Library
        </Link>

        {/* MENUJA */}
        <ul className="nav-menu">
          <li><NavLink to="/" className="nav-links">HOME</NavLink></li>
          <li><NavLink to="/about" className="nav-links">ABOUT US</NavLink></li>
          <li><NavLink to="/books" className="nav-links">BOOKS</NavLink></li>
          <li><NavLink to="/authors" className="nav-links">AUTHORS</NavLink></li>
        </ul>

        {/* BUTONI LOGIN */}
        <Link to="/login">
            <button className="btn-login">LOGIN</button>
        </Link>

      </div>
    </nav>
  );
}

export default Header;