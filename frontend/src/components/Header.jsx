import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  // 1. Marrim të dhënat e përdoruesit dhe ROLIN nga kujtesa
  const user = JSON.parse(localStorage.getItem('user'));
  const role = localStorage.getItem('role'); 

  // 2. Përcaktojmë nëse është Admin (pranojmë edhe 'Admin' edhe 'admin')
  const isAdmin = user && (role === 'Admin' || role === 'admin');

  // 3. Funksioni për të dalë (Logout)
  const handleLogout = () => {
    localStorage.clear(); // Fshin gjithçka (token, user, role)
    navigate('/login'); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* --- LOGOJA --- */}
        {/* Nëse je Admin të çon te Paneli, përndryshe te Home */}
        <Link to={isAdmin ? "/admin-dashboard" : "/"} className="navbar-logo">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/3389/3389081.png" 
            alt="Logo" 
            className="logo-image" 
          />
          Universal Library
        </Link>

        {/* --- MENUJA KRYESORE --- */}
        <ul className="nav-menu">
          
          {/* 
             LOGJIKA E FSHEHJES:
             Këto linqe shfaqen VETËM nëse NUK je Admin (!isAdmin).
          */}
          {!isAdmin && (
            <>
              <li><NavLink to="/" className="nav-links">HOME</NavLink></li>
              <li><NavLink to="/about" className="nav-links">ABOUT US</NavLink></li>
              <li className="dropdown mega-dropdown">
                <NavLink to="/books" className="nav-links">BOOKS</NavLink>
                <div className="mega-menu">
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
          {/* --- MENUTË SIPAS ROLIT --- */}
          
          {/* RASTI 1: Nëse është ADMIN, shfaq VETËM butonin Admin Panel */}
          {isAdmin && (
             <li>
               <NavLink to="/admin-dashboard" className="nav-links" style={{ color: '#f1c40f', fontWeight: 'bold', fontSize: '1.1rem', borderBottom: '2px solid #f1c40f' }}>
                 🛡️ ADMIN PANEL
               </NavLink>
             </li>
          )}

          {/* RASTI 2: Nëse është MEMBER (jo admin), shfaq My Loans */}
          {user && !isAdmin && (
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