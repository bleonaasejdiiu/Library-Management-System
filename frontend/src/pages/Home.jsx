import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  // Mock Data
  const trendingBooks = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", img: "https://covers.openlibrary.org/b/id/7222246-L.jpg" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", img: "https://covers.openlibrary.org/b/id/1261770-L.jpg" },
    { id: 3, title: "1984", author: "George Orwell", img: "https://covers.openlibrary.org/b/id/1533559-L.jpg" },
    { id: 4, title: "Harry Potter", author: "J.K. Rowling", img: "https://covers.openlibrary.org/b/id/10522199-L.jpg" },
  ];

  const blogPosts = [
    { id: 1, title: "Top 10 Must-Read Classics", date: "Oct 12, 2025", img: "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?auto=format&fit=crop&w=600&q=80" },
    { id: 2, title: "Interview with J.K. Rowling", date: "Nov 05, 2025", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80" },
    { id: 3, title: "The Future of Digital Libraries", date: "Dec 01, 2025", img: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=600&q=80" },
  ];

  return (
    <div className="home-wrapper">
      
      {/* 1. HERO MASSIVE */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="slider-arrow arrow-left">❮</div>
        <div className="slider-arrow arrow-right">❯</div>
        
        <div className="hero-content">
          <span className="hero-tag">WELCOME TO UNIVERSAL LIBRARY</span>
          <h1>Access To Thousands Of Free Ebooks</h1>
          <p>Read, Download, and Discover your next favorite book completely free.</p>
          <div className="hero-buttons">
            <Link to="/books"><button className="btn-orange">Browse Library</button></Link>
            <Link to="/login"><button className="btn-transparent">Join Now</button></Link>
          </div>
        </div>
        
        {/* Slider Dots */}
        <div className="slider-dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </section>

      {/* 2. INFO STRIP (Karakteristikat) */}
      <section className="info-strip">
        <div className="info-item">
          <span className="info-icon">📱</span>
          <div className="info-text">
            <h4>Mobile Friendly</h4>
            <p>Read on any device</p>
          </div>
        </div>
        <div className="info-item">
          <span className="info-icon">⚡</span>
          <div className="info-text">
            <h4>Instant Access</h4>
            <p>No waiting times</p>
          </div>
        </div>
        <div className="info-item">
          <span className="info-icon">🛡️</span>
          <div className="info-text">
            <h4>100% Secure</h4>
            <p>Safe downloads</p>
          </div>
        </div>
        <div className="info-item">
          <span className="info-icon">📚</span>
          <div className="info-text">
            <h4>Huge Collection</h4>
            <p>Over 50k titles</p>
          </div>
        </div>
      </section>

      {/* 3. TRENDING BOOKS */}
      <section className="section-container">
        <div className="section-header">
          <h2>Trending This Week</h2>
          <div className="header-line"></div>
        </div>
        <div className="books-grid">
          {trendingBooks.map(book => (
            <div key={book.id} className="book-card">
              <div className="card-image">
                <img src={book.img} alt={book.title} />
                <div className="hover-overlay">
                  <button className="btn-view">View Details</button>
                </div>
              </div>
              <div className="card-info">
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <div className="rating">⭐⭐⭐⭐☆</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. VISUAL CATEGORIES (BLLOKA TE MEDHENJ) */}
      <section className="categories-block-section">
        <div className="cat-block large" style={{backgroundImage: "url('https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80')"}}>
          <div className="cat-content">
            <h3>History & Culture</h3>
            <Link to="/books">Explore &rarr;</Link>
          </div>
        </div>
        <div className="cat-block-column">
           <div className="cat-block small" style={{backgroundImage: "url('https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80')"}}>
              <div className="cat-content">
                <h3>Science Fiction</h3>
              </div>
           </div>
           <div className="cat-block small" style={{backgroundImage: "url('https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80')"}}>
              <div className="cat-content">
                <h3>Biographies</h3>
              </div>
           </div>
        </div>
      </section>

      {/* 5. PARALLAX QUOTE SECTION */}
      <section className="quote-section">
        <div className="quote-overlay">
          <h2>"A room without books is like a body without a soul."</h2>
          <p>— Marcus Tullius Cicero</p>
        </div>
      </section>

      {/* 6. LATEST FROM BLOG */}
      <section className="section-container">
        <div className="section-header">
          <h2>Latest News & Articles</h2>
          <div className="header-line"></div>
        </div>
        <div className="blog-grid">
          {blogPosts.map(post => (
            <div key={post.id} className="blog-card">
              <div className="blog-img">
                <img src={post.img} alt={post.title} />
                <span className="blog-date">{post.date}</span>
              </div>
              <div className="blog-info">
                <h3>{post.title}</h3>
                <p>Discover the latest insights from our curators...</p>
                <button className="read-more">Read More</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. NEWSLETTER */}
      <section className="newsletter-full">
        <div className="newsletter-container">
          <h2>Subscribe To Our Newsletter</h2>
          <p>Get weekly updates on new arrivals and exclusive recommendations.</p>
          <div className="input-row">
            <input type="email" placeholder="Enter your email address..." />
            <button>SUBSCRIBE</button>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;