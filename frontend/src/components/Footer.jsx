import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        
        {/* Kolona 1 */}
        <div className="footer-section">
          <Link to="/" className="footer-logo">
            <img 
                src="https://cdn-icons-png.flaticon.com/512/3389/3389081.png" 
                alt="Logo" 
                className="logo-image" 
             />
             <span className="text-highlight">Universal</span> Library
          </Link>
          <p>
            Your digital gateway to knowledge. Explore thousands of books, 
            manage loans, and connect with the reading community.
          </p>
        </div>

        {/* Kolona 2 */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/books">Library Catalog</Link></li>
            <li><Link to="/login">Member Login</Link></li>
          </ul>
        </div>

        {/* Kolona 3 */}
        <div className="footer-section">
          <h3>Contact Info</h3>
          <p>📍 Address:Sali Qeku</p>
          <p>📞 +383 45 356 678</p>
          <p>✉️ info@universallibrary.com</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Universal Library System. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;