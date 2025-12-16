import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="about-page-extended">
      
      {/* 1. HERO HEADER (Dukagjini Style - Me Foto Sfondi) */}
      <div className="about-hero-image">
        <div className="about-hero-overlay"></div> {/* Shtresa e errët për lexim */}
        <div className="container relative-content">
          <span className="subtitle-hero">ESTABLISHED 1995</span>
          <h1>More Than Just A Library</h1>
          <p>We are a cultural hub designed to inspire, educate, and connect communities through the power of stories.</p>
          <div className="header-line-center orange-line"></div>
        </div>
      </div>

      {/* 2. MAIN SECTION (ZIG-ZAG LAYOUT ME HAPESIRE TE MADHE) */}
      <section className="mv-section-library">
        <div className="mv-container">
          
          {/* --- MISSION (Ikona e Flamurit/Goal) --- */}
          <div className="mv-row">
            <div className="mv-text">
              <h4 className="mv-label">OUR PURPOSE</h4>
              <h2 className="mv-title">Our Mission</h2>
              <p>
                To democratize knowledge. We aim to provide free, unlimited, and immediate access 
                to books for everyone. We believe that education is a right, not a privilege, 
                and our mission is to remove every barrier—financial, geographical, or physical—between 
                a reader and a book.
              </p>
            </div>
            <div className="mv-graphic">
              {/* NEW ICON: MOUNTAIN FLAG (Goal/Achievement) */}
              <svg viewBox="0 0 24 24" className="graphic-icon-lib">
                 <path fill="currentColor" d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" opacity="1"/>
                 <path fill="currentColor" d="M5 21h14v2H5z" opacity="0.3"/> 
              </svg>
            </div>
          </div>

          {/* --- VISION --- */}
          <div className="mv-row reverse">
            <div className="mv-text">
              <h4 className="mv-label">OUR FUTURE</h4>
              <h2 className="mv-title">Our Vision</h2>
              <p>
                We envision a future where every individual has a personal library in their pocket. 
                By combining the curation of traditional archives with modern technology, 
                we strive to build a global community of critical thinkers, dreamers, and lifelong learners.
              </p>
            </div>
            <div className="mv-graphic">
              {/* EYE ICON */}
              <svg viewBox="0 0 24 24" className="graphic-icon-lib">
                <path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                <path fill="currentColor" d="M2 2h2v2H2V2zm18 0h2v2h-2V2zM2 20h2v2H2v-2zm18 0h2v2h-2v-2z" opacity="0.4"/>
              </svg>
            </div>
          </div>

          {/* --- VALUES --- */}
          <div className="mv-row">
            <div className="mv-text">
              <h4 className="mv-label">WHAT WE BELIEVE</h4>
              <h2 className="mv-title">Our Values</h2>
              <p>
                Our readers are at the heart of everything we do. We deeply value the trust 
                they place in us. Before expanding our collection, we take the time to 
                understand our community's unique needs. We are dedicated to giving our 
                clients exactly what they need to succeed.
              </p>
            </div>
            <div className="mv-graphic">
              {/* DIAMOND ICON */}
              <svg viewBox="0 0 24 24" className="graphic-icon-lib">
                <path fill="currentColor" d="M19 3H5l-2 3.5L12 21l9-14.5L19 3zm-7 15.5L5.6 7h12.8L12 18.5zM12 5l2.5 2h-5L12 5z" opacity="0.8"/>
                <path fill="currentColor" d="M11.5 22c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2s-2 .9-2 2v1H8V9c0-1.1-.9-2-2-2s-2 .9-2 2v11c0 1.1.9 2 2 2h5.5z" opacity="0.3"/> 
              </svg>
            </div>
          </div>

          {/* --- STORY --- */}
          <div className="mv-row reverse">
            <div className="mv-text">
              <h4 className="mv-label">OUR HISTORY</h4>
              <h2 className="mv-title">Our Story</h2>
              <p>
                Universal Library was born from the combined strength of diverse skills 
                and a shared desire to create something new. Our team consists of individuals 
                who were once employees at various companies, tired of the status quo. 
                We decided to build something together where passion drives success.
              </p>
            </div>
            <div className="mv-graphic">
              {/* SCROLL / DOCUMENT ICON */}
              <svg viewBox="0 0 24 24" className="graphic-icon-lib">
                <path fill="currentColor" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                <circle cx="16" cy="16" r="6" fill="currentColor" opacity="0.2"/>
              </svg>
            </div>
          </div>

          {/* --- TEAM --- */}
          <div className="mv-row">
            <div className="mv-text">
              <h4 className="mv-label">WHO WE ARE</h4>
              <h2 className="mv-title">Meet Our Team</h2>
              <p>
                Our team is made up of passionate professionals who bring their unique talents 
                to each project. With expertise in technology, strategy, and design, we work 
                together to deliver exceptional results. We value creativity, collaboration, 
                and a deep commitment to understanding our clients' needs.
              </p>
            </div>
            <div className="mv-graphic">
              {/* TEAM HANDS ICON */}
              <svg viewBox="0 0 24 24" className="graphic-icon-lib">
                <path fill="currentColor" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                <circle cx="12" cy="12" r="8" fill="currentColor" opacity="0.2"/>
              </svg>
            </div>
          </div>

          {/* --- WHY CHOOSE US --- */}
          <div className="mv-row reverse">
            <div className="mv-text">
              <h4 className="mv-label">THE DIFFERENCE</h4>
              <h2 className="mv-title">Why Choose Us</h2>
              <p>
                With a reader-first approach and a commitment to excellence, Universal Library 
                stands out for its vast collection, exceptional user experience, and proven 
                track record of helping students succeed. Whether you're a casual reader 
                or a dedicated researcher, we are here to help you grow.
              </p>
            </div>
            <div className="mv-graphic">
              {/* LIGHTBULB / QUESTION ICON */}
              <svg viewBox="0 0 24 24" className="graphic-icon-lib">
                <path fill="currentColor" d="M9 21c0 .5.5 1 1 1h4c.5 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.5 1 1 1h6c.5 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z"/>
                <circle cx="16" cy="8" r="4" fill="currentColor" opacity="0.4"/>
                <text x="14" y="10" fontSize="5" fill="white" fontWeight="bold">?</text>
              </svg>
            </div>
          </div>

        </div>
      </section>

      {/* 3. STATS (STRIP) */}
      <section className="stats-strip-modern">
        <div className="stat-modern">
          <h3>50k+</h3>
          <p>Books</p>
        </div>
        <div className="stat-modern">
          <h3>15k+</h3>
          <p>Members</p>
        </div>
        <div className="stat-modern">
          <h3>30</h3>
          <p>Years</p>
        </div>
        <div className="stat-modern">
          <h3>100%</h3>
          <p>Free</p>
        </div>
      </section>

      {/* 4. CTA FINAL */}
      <section className="about-cta-final">
        <h2>Start Your Journey Today</h2>
        <p>Join the library and get access to our entire collection instantly.</p>
        <div className="cta-group">
          <Link to="/books"><button className="btn-orange">Browse Library</button></Link>
          <Link to="/login"><button className="btn-outline">Join Now</button></Link>
        </div>
      </section>

    </div>
  );
}

export default About;