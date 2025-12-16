import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  // --- 1. KONFIGURIMI I SLIDERIT ---
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

  // --- 2. STATE PER KERKIM DHE DETAJE ---
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("title"); // title, author, isbn, category
  const [selectedBook, setSelectedBook] = useState(null); // Për Modal-in

  // --- 3. MOCK DATA (Librat me Status dhe Lokacion) ---
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
  ];

  const blogPosts = [
    { id: 1, title: "Top 10 Holiday Reads", date: "Dec 14, 2025", img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80" },
    { id: 2, title: "Interview with J.K. Rowling", date: "Nov 05, 2025", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80" },
    { id: 3, title: "The Future of Digital Libraries", date: "Dec 01, 2025", img: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=600&q=80" },
  ];

  // --- 4. LOGJIKA E SLIDERIT ---
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(slideInterval);
  }, [heroSlides.length]);

  const nextSlide = () => setCurrentSlide(currentSlide === heroSlides.length - 1 ? 0 : currentSlide + 1);
  const prevSlide = () => setCurrentSlide(currentSlide === 0 ? heroSlides.length - 1 : currentSlide - 1);

  // --- 5. LOGJIKA E KERKIMIT (FILTER) ---
  const filteredBooks = allBooks.filter(book => {
    if (searchTerm === "") return true;
    const term = searchTerm.toLowerCase();
    
    if (searchCategory === "title") return book.title.toLowerCase().includes(term);
    if (searchCategory === "author") return book.author.toLowerCase().includes(term);
    if (searchCategory === "isbn") return book.isbn.includes(term);
    if (searchCategory === "category") return book.category.toLowerCase().includes(term);
    return false;
  });

  // Funksionet për Modal
  const openDetails = (book) => setSelectedBook(book);
  const closeDetails = () => setSelectedBook(null);

  return (
    <div className="home-wrapper">
      
      {/* --- HERO SECTION (Pa Search) --- */}
      <section 
        className="hero-section" 
        style={{ backgroundImage: `url("${heroSlides[currentSlide].image}")` }}
      >
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

      {/* --- INFO STRIP --- */}
      <section className="info-strip">
        <div className="info-item"><span className="info-icon">📖</span><div className="info-text"><h4>Wide Selection</h4><p>Books for everyone</p></div></div>
        <div className="info-item"><span className="info-icon">⚡</span><div className="info-text"><h4>Fast Process</h4><p>Quick borrowing</p></div></div>
        <div className="info-item"><span className="info-icon">📅</span><div className="info-text"><h4>Extend Time</h4><p>Renew online</p></div></div>
        <div className="info-item"><span className="info-icon">📚</span><div className="info-text"><h4>Huge Collection</h4><p>Over 50k titles</p></div></div>
      </section>

      {/* --- BOOKS GRID WITH SEARCH HEADER --- */}
      <section className="section-container" style={{paddingTop: '40px'}}>
        
        {/* Këtu është SEARCH BAR që zëvendëson titullin */}
        <div className="search-header-container">
           <div className="main-search-bar">
            <select 
              className="search-select" 
              value={searchCategory} 
              onChange={(e) => setSearchCategory(e.target.value)}
            >
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="isbn">ISBN</option>
              <option value="category">Category</option>
            </select>
            <input 
              type="text" 
              className="search-input" 
              placeholder={`Search books by ${searchCategory}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-btn">
              <span style={{fontSize: '1.2rem'}}>🔍</span>
            </button>
          </div>
        </div>
        
        {/* Rezultatet e Librave */}
        {filteredBooks.length > 0 ? (
          <div className="books-grid">
            {filteredBooks.map(book => (
              <div key={book.id} className="book-card" onClick={() => openDetails(book)}>
                <div className="card-image">
                  <img src={book.img} alt={book.title} />
                  <div className="hover-overlay">
                    <button className="btn-view" onClick={(e) => { e.stopPropagation(); openDetails(book); }}>View Details</button>
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
        ) : (
          <div className="no-results">
            <p>No books found matching "{searchTerm}".</p>
          </div>
        )}
      </section>

      {/* --- CATEGORIES --- */}
      <section className="categories-block-section">
         <div className="cat-block large" style={{backgroundImage: "url('https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80')"}}>
          <div className="cat-content"><h3>History & Culture</h3><Link to="/books">Explore &rarr;</Link></div>
        </div>
        <div className="cat-block-column">
           <div className="cat-block small" style={{backgroundImage: "url('https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80')"}}><div className="cat-content"><h3>Science Fiction</h3></div></div>
           <div className="cat-block small" style={{backgroundImage: "url('https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80')"}}><div className="cat-content"><h3>Biographies</h3></div></div>
        </div>
      </section>

      {/* --- QUOTE --- */}
      <section className="quote-section">
        <div className="quote-overlay">
          <h2>"A room without books is like a body without a soul."</h2>
          <p>— Marcus Tullius Cicero</p>
        </div>
      </section>

      {/* --- BLOG --- */}
      <section className="section-container">
        <div className="section-header">
          <h2>Latest News & Articles</h2>
          <div className="header-line"></div>
        </div>
        <div className="blog-grid">
          {blogPosts.map(post => (
            <div key={post.id} className="blog-card">
              <div className="blog-img"><img src={post.img} alt={post.title} /><span className="blog-date">{post.date}</span></div>
              <div className="blog-info"><h3>{post.title}</h3><p>Discover the latest insights from our curators...</p><button className="read-more">Read More</button></div>
            </div>
          ))}
        </div>
      </section>
      
      {/* --- NEWSLETTER --- */}
      <section className="newsletter-full">
        <div className="newsletter-container">
           <h2>Subscribe To Our Newsletter</h2>
           <p>Get weekly updates.</p>
           <div className="input-row"><input type="email" placeholder="Email..." /><button>SUBSCRIBE</button></div>
        </div>
      </section>

      {/* --- MODAL (POPUP) PER LIBRIN --- */}
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
                
                {/* Informata Bibliotekare */}
                <div className="modal-meta">
                  <p><strong>Category:</strong> {selectedBook.category}</p>
                  <p><strong>ISBN:</strong> {selectedBook.isbn}</p>
                  <p><strong>Location:</strong> {selectedBook.shelf}</p>
                  
                  {/* Statusi me ngjyra */}
                  <p><strong>Status:</strong> 
                    <span className={`status-badge ${selectedBook.status === 'Available' ? 'available' : 'out'}`}>
                      {selectedBook.status}
                    </span>
                  </p>
                </div>

                <div className="modal-actions">
                  {/* Butoni ndryshon nese libri nuk eshte i qasshem */}
                  <button className="btn-orange" disabled={selectedBook.status !== 'Available'}>
                    {selectedBook.status === 'Available' ? 'Borrow Book' : 'Join Waitlist'}
                  </button>
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