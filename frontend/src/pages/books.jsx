import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BookCard from "../components/bookCard1";
import "./books.css";

const Books = () => {
  const location = useLocation();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // 1. Merr librat nga Backendi
  useEffect(() => {
    fetch("http://localhost:5000/api/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gabim:", err);
        setLoading(false);
      });
  }, []);

  // 2. Lexo kategorinë nga URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFromUrl = params.get("category");
    if (categoryFromUrl) {
      const formatted = categoryFromUrl.charAt(0).toUpperCase() + categoryFromUrl.slice(1).toLowerCase();
      setSelectedCategory(formatted);
    } else {
      setSelectedCategory("All");
    }
  }, [location.search]);

  // 3. Logjika e filtrimit
  const filteredBooks = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase();
    return books.filter((book) => {
      const title = book.title?.toLowerCase() || "";
      const author = book.author?.toLowerCase() || "";
      const cat = book.categoryName || book.category || "";
      
      return (
        (title.includes(normalizedSearch) || author.includes(normalizedSearch)) &&
        (selectedCategory === "All" || cat === selectedCategory)
      );
    });
  }, [searchTerm, selectedCategory, books]);

  if (loading) return <div className="loading">Duke ngarkuar librat...</div>;

  return (
    <div className="books-page">
      <div className="books-hero">
        <h1>Books Collection</h1>
        <p>{selectedCategory === "All" ? "Explore our library" : `Category: ${selectedCategory}`}</p>
        <div className="hero-search">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="books-grid">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard key={book.bookId || book.id} book={book} />
          ))
        ) : (
          <p className="no-results">No books found</p>
        )}
      </div>
    </div>
  );
};

export default Books;