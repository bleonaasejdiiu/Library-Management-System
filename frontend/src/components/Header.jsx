import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBooksOpen, setIsBooksOpen] = useState(false); // toggle mega-dropdown mobile

  const user = JSON.parse(localStorage.getItem('user'));
  const role = localStorage.getItem('role'); 
  const isAdmin = user && (role === 'Admin' || role === 'admin');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleBooks = () => setIsBooksOpen(!isBooksOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* LOGO */}
        <Link to={isAdmin ? "/admin-dashboard" : "/"} className="navbar-logo">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/3389/3389081.png" 
            alt="Logo" 
            className="logo-image" 
          />
          Universal Library
        </Link>

        {/* Hamburger button për mobile */}
        <div className="hamburger" onClick={toggleMenu}>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
        </div>

        {/* Menuja kryesore */}
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {!isAdmin && (
            <>
              <li><NavLink to="/" className="nav-links">HOME</NavLink></li>
              <li><NavLink to="/about" className="nav-links">ABOUT US</NavLink></li>

              <li className="dropdown mega-dropdown">
                <NavLink 
                  to="/books" 
                  className="nav-links" 
                  onClick={(e) => { if(window.innerWidth < 992) { e.preventDefault(); toggleBooks(); } }}
                >
                  BOOKS
                </NavLink>
                <div className={`mega-menu ${isBooksOpen ? 'active' : ''}`}>
                  <div className="mega-column">
                    <h4>Literature</h4>
                    <NavLink to="/books?category=art">Art</NavLink>
                    <NavLink to="/books?category=romance">Romance</NavLink>
                    <NavLink to="/books?category=adolescence">Adolescence</NavLink>
                    <NavLink to="/books?category=language">Language</NavLink>
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
                    <NavLink to="/books?category=technology">Technology</NavLink>
                    <NavLink to="/books?category=psychology">Psychology</NavLink>
                    <NavLink to="/books">All Categories →</NavLink>
                  </div>
                </div>
              </li>

              <li><NavLink to="/authors" className="nav-links">AUTHORS</NavLink></li>
            </>
          )}

          {isAdmin && (
            <li>
              <NavLink to="/admin-dashboard" className="nav-links" style={{ color: '#f1c40f', fontWeight: 'bold', fontSize: '1.1rem', borderBottom: '2px solid #f1c40f' }}>
                🛡️ ADMIN PANEL
              </NavLink>
            </li>
          )}

          {user && !isAdmin && (
            <li>
              <NavLink to="/user-dashboard" className="nav-links" style={{ color: '#3498db', fontWeight: 'bold' }}>
                MY LOANS
              </NavLink>
            </li>
          )}

          {/* Login / Logout për mobile */}
          <li className="mobile-auth">
            {user ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span style={{ color: '#ccc', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  HI, {user.name}
                </span>
                <button onClick={handleLogout} className="btn-login" style={{ backgroundColor: '#c0392b', border: 'none' }}>
                  LOGOUT
                </button>
              </div>
            ) : (
              <Link to="/login">
                <button className="btn-login">LOGIN</button>
              </Link>
            )}
          </li>
        </ul>

        {/* Desktop Login / Logout */}
        {user && (
          <div className="nav-auth">
            <span style={{ color: '#ccc', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.9rem', marginRight: '15px' }}>
              HI, {user.name}
            </span>
            <button onClick={handleLogout} className="btn-login" style={{ backgroundColor: '#c0392b', border: 'none' }}>
              LOGOUT
            </button>
          </div>
        )}
        {!user && (
          <div className="nav-auth">
            <Link to="/login">
              <button className="btn-login">LOGIN</button>
            </Link>
          </div>
        )}

      </div>
    </nav>
  );
}

export default Header;
