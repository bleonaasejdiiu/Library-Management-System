import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  // 1. Marrim të dhënat e përdoruesit dhe ROLIN nga kujtesa
  const user = JSON.parse(localStorage.getItem('user'));
  const role = localStorage.getItem('role'); // <--- KJO NA DUHEJ

  // 2. Funksioni për të dalë (Logout)
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('user');  
    localStorage.removeItem('role'); // Fshijmë edhe rolin
    navigate('/login'); 
    window.location.reload(); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* --- LOGOJA --- */}
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
          
          {/* PJESA E LIBRAVE (MEGA DROPDOWN) */}
          <li className="dropdown mega-dropdown">
            <NavLink to="/books" className="nav-links">BOOKS</NavLink>
            <div className="mega-menu">
              <div className="mega-column">
                <h4>Literature</h4>
                <NavLink to="/books?category=art">Art</NavLink>
                <NavLink to="/books?category=romance">Romance</NavLink>
                <NavLink to="/books?category=adolescence">Adolescence</NavLink>
              </div>
              <div className="mega-column">
                <h4>Science & Business</h4>
                <NavLink to="/books?category=science">Science</NavLink>
                <NavLink to="/books?category=business">Business</NavLink>
              </div>
              <div className="mega-column">
                <h4>Special collections</h4>
                <NavLink to="/books?category=history">History</NavLink>
                <NavLink to="/books?category=technology">Technology</NavLink>
                <NavLink to="/books">All Categories →</NavLink>
              </div>
            </div>
          </li>

          <li><NavLink to="/authors" className="nav-links">AUTHORS</NavLink></li>

          {/* --- MENUTË SIPAS ROLIT (PJESA E RE) --- */}
          
          {/* Nëse është ADMIN, shfaq butonin Dashboard */}
          {user && role === 'admin' && (
             <li>
               <NavLink to="/admin-dashboard" className="nav-links" style={{ color: '#f1c40f', fontWeight: 'bold' }}>
                 ADMIN PANEL
               </NavLink>
             </li>
          )}

          {/* Nëse është MEMBER, shfaq butonin My Profile */}
          {user && role === 'member' && (
             <li>
               <NavLink to="/user-dashboard" className="nav-links" style={{ color: '#3498db', fontWeight: 'bold' }}>
                 MY LOANS
               </NavLink>
             </li>
          )}

        </ul>

        {/* --- LOGIN / LOGOUT --- */}
        <div className="nav-auth">
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ color: '#ccc', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.9rem' }}>
                HI, {user.name}
              </span>
              <button 
                onClick={handleLogout} 
                className="btn-login" 
                style={{ backgroundColor: '#c0392b', border: 'none' }} 
              >
                LOGOUT
              </button>
            </div>
          ) : (
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