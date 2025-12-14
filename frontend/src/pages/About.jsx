import React from 'react';

function About() {
  return (
    <div className="about-page">
      {/* Hero i About */}
      <section className="about-hero">
        <h1>About Universal Library</h1>
        <p>Empowering minds through the access of knowledge since 1995.</p>
      </section>

      {/* Seksioni i Misionit */}
      <section className="mission-section">
        <div className="mission-content">
          <div className="mission-text">
            <h2>Our Mission</h2>
            <p>
              Our goal is to provide comprehensive access to information resources 
              that support the academic and research needs of our community. 
              We believe in the power of books to change lives and build futures.
            </p>
            <p>
              Whether you are a student, a researcher, or a casual reader, 
              Universal Library is your home for discovery.
            </p>
          </div>
          <div className="mission-img">
            <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Library Interior" />
          </div>
        </div>
      </section>

      {/* Seksioni i Statistikave */}
      <section className="stats-section">
        <div className="stat-box">
          <h3>50k+</h3>
          <p>Books Available</p>
        </div>
        <div className="stat-box">
          <h3>10k+</h3>
          <p>Active Members</p>
        </div>
        <div className="stat-box">
          <h3>24/7</h3>
          <p>Online Access</p>
        </div>
        <div className="stat-box">
          <h3>100+</h3>
          <p>Daily Events</p>
        </div>
      </section>
    </div>
  );
}

export default About;