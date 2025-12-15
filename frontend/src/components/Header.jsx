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
      <li className="dropdown mega-dropdown">
  <NavLink to="/books" className="nav-links">
    BOOKS
  </NavLink>

  <div className="mega-menu">
    
    <div className="mega-column">
      <h4>Letërsi</h4>
      <NavLink to="/books?category=art">Art</NavLink>
      <NavLink to="/books?category=romance">Romancë</NavLink>
      <NavLink to="/books?category=adolescence">Adoleshent</NavLink>
      <NavLink to="/books?category=language">Gjuhësi</NavLink>
    </div>

    <div className="mega-column">
      <h4>Shkencë & Biznes</h4>
      <NavLink to="/books?category=science">Shkencë</NavLink>
      <NavLink to="/books?category=business">Biznes</NavLink>
      <NavLink to="/books?category=leadership">Leadership</NavLink>
      <NavLink to="/books?category=law">Drejtësi</NavLink>
    </div>

    <div className="mega-column">
      <h4>Të veçanta</h4>
      <NavLink to="/books?category=history">Histori</NavLink>
      <NavLink to="/books?category=psychology">Psikologji</NavLink>
      <NavLink to="/books?category=children">Për fëmijë</NavLink>
      <NavLink to="/books">Të gjitha →</NavLink>
    </div>

  </div>
</li>


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