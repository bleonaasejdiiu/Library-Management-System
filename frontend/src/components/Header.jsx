import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  // 1. Marrim të dhënat e përdoruesit nga kujtesa e shfletuesit
  const user = JSON.parse(localStorage.getItem('user'));

  // 2. Funksioni për të dalë (Logout)
  const handleLogout = () => {
    localStorage.removeItem('token'); // Fshijmë çelësin e hyrjes
    localStorage.removeItem('user');  // Fshijmë të dhënat e userit
    navigate('/login'); // E çojmë te faqja e loginit
    window.location.reload(); // Rifreskojmë faqen që të zhduket emri nga menuja
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* --- LOGOJA DHE EMRI --- */}
        <Link to="/" className="navbar-logo">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/3389/3389081.png" 
            alt="Logo" 
            className="logo-image" 
          />
          Universal Library
        </Link>

        {/* --- MENUJA KRYESORE --- */}
        <ul className="nav-menu">
          <li><NavLink to="/" className="nav-links">HOME</NavLink></li>
          <li><NavLink to="/about" className="nav-links">ABOUT US</NavLink></li>
          
          {/* MEGA DROPDOWN (Pjesa e Librave) */}
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

<<<<<<< HEAD
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
=======
              <div className="mega-column">
                <h4>Science & Business</h4>
                <NavLink to="/books?category=science">Science</NavLink>
                <NavLink to="/books?category=business">Business</NavLink>
                <NavLink to="/books?category=leadership">Leadership</NavLink>
                <NavLink to="/books?category=law">Law</NavLink>
              </div>
>>>>>>> 6c0a90f1a7bfb762bf1629419201ef443299254d

              <div className="mega-column">
                <h4>Special collections</h4>
                <NavLink to="/books?category=history">History</NavLink>
                <NavLink to="/books?category=psychology">Psychology</NavLink>
                <NavLink to="/books?category=children">Technology</NavLink>
                <NavLink to="/books">All Categories →</NavLink>
              </div>
            </div>
          </li>

          <li><NavLink to="/authors" className="nav-links">AUTHORS</NavLink></li>
        </ul>

        {/* --- PJESA E LOGIN / LOGOUT (NDRYSHIMI KRYESOR) --- */}
        <div className="nav-auth">
          {user ? (
            // A. NËSE JE I KYÇUR: Shfaq emrin dhe butonin Logout
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ color: '#ccc', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.9rem' }}>
                HI, {user.name}
              </span>
              <button 
                onClick={handleLogout} 
                className="btn-login" 
                style={{ backgroundColor: '#c0392b', border: 'none' }} // Ngjyrë e kuqe për Logout
              >
                LOGOUT
              </button>
            </div>
          ) : (
            // B. NËSE NUK JE I KYÇUR: Shfaq butonin Login
            <Link to="/login">
                <button className="btn-login">LOGIN</button>
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Header;