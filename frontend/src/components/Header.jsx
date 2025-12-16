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
      <h4>Literature</h4>
      <NavLink to="/books?category=art">Art</NavLink>
      <NavLink to="/books?category=romance">Romance</NavLink>
      <NavLink to="/books?category=adolescence">Adolescence</NavLink>
      <NavLink to="/books?category=language">Language & Linguistics</NavLink>
    </div>

    <div className="mega-column">
      <h4>Science & Business</h4>
      <NavLink to="/books?category=science">Science</NavLink>
      <NavLink to="/books?category=business">Business</NavLink>
      <NavLink to="/books?category=leadership">Leadership</NavLink>
      <NavLink to="/books?category=law">Law</NavLink>
    </div>

    <div className="mega-column">
      <h4>Special collections</h4>
      <NavLink to="/books?category=history">History</NavLink>
      <NavLink to="/books?category=psychology">Psychology</NavLink>
      <NavLink to="/books?category=technology">Technology</NavLink>
      <NavLink to="/books">All Categories →</NavLink>
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