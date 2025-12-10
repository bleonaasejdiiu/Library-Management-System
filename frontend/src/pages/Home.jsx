import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  // Krijojmë disa të dhëna "fake" që të duket si katalog plot
  const books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Classic", img: "https://covers.openlibrary.org/b/id/7222246-L.jpg", status: "Available" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", category: "Classic", img: "https://covers.openlibrary.org/b/id/1261770-L.jpg", status: "Available" },
    { id: 3, title: "1984", author: "George Orwell", category: "Dystopian", img: "https://covers.openlibrary.org/b/id/1533559-L.jpg", status: "Loaned" },
    { id: 4, title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", category: "Fantasy", img: "https://covers.openlibrary.org/b/id/10522199-L.jpg", status: "Available" },
    { id: 5, title: "The Hobbit", author: "J.R.R. Tolkien", category: "Fantasy", img: "https://covers.openlibrary.org/b/id/12003823-L.jpg", status: "Available" },
    { id: 6, title: "The Da Vinci Code", author: "Dan Brown", category: "Thriller", img: "https://covers.openlibrary.org/b/id/10595085-L.jpg", status: "Available" },
    { id: 7, title: "Sapiens: A Brief History", author: "Yuval Noah Harari", category: "History", img: "https://covers.openlibrary.org/b/id/8381666-L.jpg", status: "Available" },
    { id: 8, title: "Atomic Habits", author: "James Clear", category: "Self-Help", img: "https://covers.openlibrary.org/b/id/12833543-L.jpg", status: "Loaned" },
     { id: 9, title: "A Brief History", author: "Yuval Noah Harari", category: "History", img: "https://covers.openlibrary.org/b/id/8381666-L.jpg", status: "Available" },
    { id: 10, title: "Atomic Habits", author: "James Clear", category: "Self-Help", img: "https://covers.openlibrary.org/b/id/12833543-L.jpg", status: "Loaned" },
  ];

  return (
    <div className="home-container">
      
      {/* 1. HERO SEARCH (Stil Biblioteke Kombetare) */}
      <section className="hero-search-section">
        <h1>Welcome to National Library System</h1>
        <div className="search-bar-container">
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search by title, author, or ISBN..." 
          />
          <button className="search-btn">Search</button>
        </div>
      </section>

      {/* 2. CATALOG SECTION - NEW ARRIVALS */}
      <section className="catalog-section">
        <div className="section-header">
          <h2>📚 New Arrivals</h2>
          <Link to="/books" className="view-all">View All &rarr;</Link>
        </div>

        {/* GRIDI ME SHUME LIBRA */}
        <div className="books-grid">
          {books.slice(0, 10).map((book) => (
            <div key={book.id} className="book-card">
              <div className="card-image">
                <img src={book.img} alt={book.title} />
              </div>
              <div className="card-info">
                <span className="card-category">{book.category}</span>
                <h3 className="card-title">{book.title}</h3>
                <p className="card-author">{book.author}</p>
                
                <div className="card-footer">
                  <span className={`status ${book.status.toLowerCase()}`}>
                    {book.status === 'Available' ? '● Available' : '● Loaned'}
                  </span>
                  {book.status === 'Available' && (
                    <button className="btn-rent">Borrow</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CATALOG SECTION - BESTSELLERS */}
      <section className="catalog-section">
        <div className="section-header">
          <h2>🔥 Top Rated</h2>
          <Link to="/books" className="view-all">View All &rarr;</Link>
        </div>
        
        {/* Po përdorim të njëjtat libra sa për shembull, por ti mund të kesh listë tjetër */}
        <div className="books-grid">
          {books.slice(0, 4).map((book) => (
            <div key={book.id + "_top"} className="book-card">
              <div className="card-image">
                <img src={book.img} alt={book.title} />
              </div>
              <div className="card-info">
                <span className="card-category">{book.category}</span>
                <h3 className="card-title">{book.title}</h3>
                <div className="card-footer">
                   <button className="btn-rent" style={{width: '100%'}}>View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Home;