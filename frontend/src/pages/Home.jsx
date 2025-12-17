import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  // --- 1. SLIDER DATA ---
  const heroSlides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80", 
      title: "Holiday Season Readings",
      subtitle: "Cozy up this winter with our magical collection of holiday stories."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      title: "Discover Your Next Favorite Book",
      subtitle: "From bestsellers to rare classics, find everything you need."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      title: "A Community of Readers",
      subtitle: "Join events, book clubs, and meet authors from around the world."
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // --- 2. STATE ---
  // Search state u hoq sepse nuk nevojitet me
  const [selectedBook, setSelectedBook] = useState(null); // Për Modalin

  // --- 3. MOCK DATA (12 LIBRA) ---
  const allBooks = [
    { 
      id: 1, 
      title: "The Great Gatsby", 
      author: "F. Scott Fitzgerald", 
      isbn: "9780743273565",
      category: "Classic",
      status: "Available",       
      shelf: "Floor 2, Row A",   
      description: "A novel set in the Jazz Age that tells the story of Jay Gatsby's unrequited love for Daisy Buchanan.",
      img: "https://covers.openlibrary.org/b/id/7222246-L.jpg" 
    },
    { 
      id: 2, 
      title: "To Kill a Mockingbird", 
      author: "Harper Lee", 
      isbn: "9780061120084",
      category: "Classic",
      status: "Checked Out",     
      shelf: "Floor 2, Row C",
      description: "A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice.",
      img: "https://covers.openlibrary.org/b/id/1261770-L.jpg" 
    },
    { 
      id: 3, 
      title: "1984", 
      author: "George Orwell", 
      isbn: "9780451524935",
      category: "Dystopian",
      status: "Available",
      shelf: "Floor 3, Row B",
      description: "Among the seminal texts of the 20th century, Nineteen Eighty-Four is a rare work that grows more haunting as its futuristic purgatory becomes more real.",
      img: "https://covers.openlibrary.org/b/id/1533559-L.jpg" 
    },
    { 
      id: 4, 
      title: "Harry Potter", 
      author: "J.K. Rowling", 
      isbn: "9780590353427",
      category: "Fantasy",
      status: "Available",
      shelf: "Kids Section, Row H",
      description: "Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive.",
      img: "https://covers.openlibrary.org/b/id/10522199-L.jpg" 
    },
    { 
      id: 5, 
      title: "Pride and Prejudice", 
      author: "Jane Austen", 
      isbn: "9780141439518",
      category: "Romance",
      status: "Available",
      shelf: "Floor 1, Row D",
      description: "Elizabeth Bennet refuses to conform to society's expectations regarding marriage, until she meets the brooding Mr. Darcy.",
      img: "https://covers.openlibrary.org/b/id/8225291-L.jpg" 
    },
    { 
      id: 6, 
      title: "The Hobbit", 
      author: "J.R.R. Tolkien", 
      isbn: "9780547928227",
      category: "Fantasy",
      status: "Checked Out",
      shelf: "Floor 3, Row K",
      description: "Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely travelling further than the pantry of his hobbit-hole.",
      img: "https://covers.openlibrary.org/b/id/8406786-L.jpg" 
    },
    { 
      id: 7, 
      title: "The Catcher in the Rye", 
      author: "J.D. Salinger", 
      isbn: "9780316769488",
      category: "Classic",
      status: "Available",
      shelf: "Floor 2, Row B",
      description: "The hero-narrator of The Catcher in the Rye is an ancient child of sixteen, a native New Yorker named Holden Caufield.",
      img: "https://covers.openlibrary.org/b/id/8225266-L.jpg" 
    },
    { 
      id: 8, 
      title: "The Alchemist", 
      author: "Paulo Coelho", 
      isbn: "9780062315007",
      category: "Fiction",
      status: "Available",
      shelf: "Floor 1, Row F",
      description: "A magical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure.",
      img: "https://covers.openlibrary.org/b/id/12556515-L.jpg" 
    },
    { 
      id: 9, 
      title: "The Da Vinci Code", 
      author: "Dan Brown", 
      isbn: "9780307474278",
      category: "Thriller",
      status: "Checked Out",
      shelf: "Floor 1, Row M",
      description: "While in Paris, Harvard symbologist Robert Langdon is awakened by a phone call in the dead of the night.",
      img: "https://covers.openlibrary.org/b/id/12604262-L.jpg" 
    },
    { 
      id: 10, 
      title: "Sapiens", 
      author: "Yuval Noah Harari", 
      isbn: "9780062316097",
      category: "Non-Fiction",
      status: "Available",
      shelf: "Floor 4, Row S",
      description: "From a renowned historian comes a groundbreaking narrative of humanity’s creation and evolution.",
      img: "https://covers.openlibrary.org/b/id/10515712-L.jpg" 
    },
    { 
      id: 11, 
      title: "Dune", 
      author: "Frank Herbert", 
      isbn: "9780441172719",
      category: "Sci-Fi",
      status: "Available",
      shelf: "Floor 3, Row X",
      description: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world.",
      img: "https://covers.openlibrary.org/b/id/10582068-L.jpg" 
    },
    { 
      id: 12, 
      title: "Thinking, Fast and Slow", 
      author: "Daniel Kahneman", 
      isbn: "9780374275631",
      category: "Psychology",
      status: "Available",
      shelf: "Floor 4, Row P",
      description: "The major New York Times bestseller that has changed the way we think about thinking.",
      img: "https://covers.openlibrary.org/b/id/7222262-L.jpg" 
    }
  ];

  // Blog Posts
  const blogPosts = [
    { id: 1, title: "Top 10 Holiday Reads", date: "Dec 14, 2025", img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80" },
    { id: 2, title: "Interview with J.K. Rowling", date: "Nov 05, 2025", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80" },
    { id: 3, title: "The Future of Digital Libraries", date: "Dec 01, 2025", img: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=600&q=80" },
  ];

  // --- 4. LOGJIKA ---
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(slideInterval);
  }, [heroSlides.length]);

  const nextSlide = () => setCurrentSlide(currentSlide === heroSlides.length - 1 ? 0 : currentSlide + 1);
  const prevSlide = () => setCurrentSlide(currentSlide === 0 ? heroSlides.length - 1 : currentSlide - 1);

  // Open Modal Logic
  const openDetails = (book) => {
    setSelectedBook(book);
  };

  const closeDetails = () => setSelectedBook(null);

  return (
    <div className="home-wrapper">
      
      {/* HERO SECTION */}
      <section className="hero-section" style={{ backgroundImage: `url("${heroSlides[currentSlide].image}")` }}>
        <div className="hero-overlay"></div>
        <div className="slider-arrow arrow-left" onClick={prevSlide}>❮</div>
        <div className="slider-arrow arrow-right" onClick={nextSlide}>❯</div>
        <div className="hero-content">
          <span className="hero-tag">WELCOME TO UNIVERSAL LIBRARY</span>
          <h1>{heroSlides[currentSlide].title}</h1>
          <p>{heroSlides[currentSlide].subtitle}</p>
          <div className="hero-buttons">
            <Link to="/books"><button className="btn-orange">Browse Collection</button></Link>
            <Link to="/login"><button className="btn-transparent">Join Now</button></Link>
          </div>
        </div>
        <div className="slider-dots">
          {heroSlides.map((slide, index) => (
            <span key={slide.id} className={`dot ${index === currentSlide ? 'active' : ''}`} onClick={() => setCurrentSlide(index)}></span>
          ))}
        </div>
      </section>

      {/* FEATURES MINI CARDS */}
      <section className="features-overlap">
        <div className="features-container">
          <div className="feature-card"><div className="f-icon">📖</div><h3>Wide Selection</h3><p>Books for everyone</p></div>
          <div className="feature-card"><div className="f-icon">⚡</div><h3>Fast Process</h3><p>Quick borrowing</p></div>
          <div className="feature-card"><div className="f-icon">📅</div><h3>Extend Time</h3><p>Renew online</p></div>
          <div className="feature-card"><div className="f-icon">📚</div><h3>Huge Collection</h3><p>Over 50k titles</p></div>
        </div>
      </section>

      {/* BOOKS SECTION */}
      <section className="section-container" style={{paddingTop: '20px'}}>
        
        {/* --- KËTU ËSHTË NDRYSHIMI: Search Bar u zëvendësua me Titullin --- */}
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '40px', marginTop: '40px' }}>
          <h2 style={{ fontSize: '2.5rem', color: '#2c3e50', marginBottom: '10px' }}>Most Popular Books</h2>
          <div className="header-line" style={{ margin: '0 auto 15px auto', width: '60px', height: '3px', backgroundColor: '#e67e22' }}></div>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>Discover our top reads for this week</p>
        </div>
        
        {/* BOOKS GRID - Direkt allBooks (pa filter) */}
        <div className="books-grid">
          {allBooks.map(book => (
            // Kur klikon kudo te karta, hapet modali
            <div key={book.id} className="book-card" onClick={() => openDetails(book)}>
              <div className="card-image">
                <img src={book.img} alt={book.title} />
                <div className="hover-overlay">
                  {/* BUTTON CLICK FIX - e.stopPropagation() e ndalon klikimin e dyfishte */}
                  <button className="btn-view" onClick={(e) => { 
                    e.stopPropagation(); 
                    openDetails(book); 
                  }}>
                    View Details
                  </button>
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

        {/* --- BUTTON "VIEW ALL BOOKS" --- */}
        <div className="view-all-container">
          <Link to="/books">
            <button className="btn-view-all">View All Books →</button>
          </Link>
        </div>

      </section>

      {/* CATEGORIES */}
      <section className="categories-block-section">
         <div className="cat-block large" style={{backgroundImage: "url('https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80')"}}>
          <div className="cat-content"><h3>History & Culture</h3><Link to="/books">Explore &rarr;</Link></div>
        </div>
        <div className="cat-block-column">
           <div className="cat-block small" style={{backgroundImage: "url('https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80')"}}><div className="cat-content"><h3>Science Fiction</h3></div></div>
           <div className="cat-block small" style={{backgroundImage: "url('https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80')"}}><div className="cat-content"><h3>Biographies</h3></div></div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="quote-section">
        <div className="quote-overlay">
          <h2>"A room without books is like a body without a soul."</h2>
          <p>— Marcus Tullius Cicero</p>
        </div>
      </section>

      {/* BLOG */}
      <section className="section-container">
        <div className="section-header"><h2>Latest News & Articles</h2><div className="header-line"></div></div>
        <div className="blog-grid">
          {blogPosts.map(post => (
            <div key={post.id} className="blog-card">
              <div className="blog-img"><img src={post.img} alt={post.title} /><span className="blog-date">{post.date}</span></div>
              <div className="blog-info"><h3>{post.title}</h3><p>Discover the latest insights...</p><button className="read-more">Read More</button></div>
            </div>
          ))}
        </div>
      </section>
      
      {/* NEWSLETTER */}
      <section className="newsletter-full">
        <div className="newsletter-container">
           <h2>Subscribe To Our Newsletter</h2>
           <p>Get weekly updates.</p>
           <div className="input-row"><input type="email" placeholder="Email..." /><button>SUBSCRIBE</button></div>
        </div>
      </section>

      {/* --- MODAL (POPUP) --- */}
      {selectedBook && (
        <div className="modal-backdrop" onClick={closeDetails}>
          <div className="modal-content-box" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={closeDetails}>&times;</span>
            <div className="modal-body">
              <div className="modal-img">
                <img src={selectedBook.img} alt={selectedBook.title} />
              </div>
              <div className="modal-info">
                <h2>{selectedBook.title}</h2>
                <h4 className="text-highlight">{selectedBook.author}</h4>
                <p className="modal-desc">{selectedBook.description}</p>
                <div className="modal-meta">
                  <p><strong>Category:</strong> {selectedBook.category}</p>
                  <p><strong>ISBN:</strong> {selectedBook.isbn}</p>
                  <p><strong>Location:</strong> {selectedBook.shelf}</p>
                  <p><strong>Status:</strong> <span className={`status-badge ${selectedBook.status === 'Available' ? 'available' : 'out'}`}>{selectedBook.status}</span></p>
                </div>
                <div className="modal-actions">
                  <button className="btn-orange" disabled={selectedBook.status !== 'Available'}>{selectedBook.status === 'Available' ? 'Borrow Book' : 'Join Waitlist'}</button>
                  <button className="btn-transparent" style={{color: '#333', borderColor: '#333'}}>Preview Pages</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Home;