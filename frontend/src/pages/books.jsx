import React, { useState, useMemo } from "react";
import BookCard from "../components/bookCard1";
import "./books.css";

const Books = () => {
  /* ================= SEARCH STATE ================= */
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  /* ================= BOOKS DATA ================= */
  const books = [
    { id: 1, title: "Art of Design", author: "J. Brown", category: "Art" },
    { id: 2, title: "Modern Painting", author: "L. Smith", category: "Art" },
    { id: 3, title: "Teen Psychology", author: "A. Miller", category: "Psychology" },
    { id: 4, title: "Business 101", author: "R. Allen", category: "Business" },
    { id: 5, title: "Leadership Power", author: "J. Maxwell", category: "Leadership" },
    { id: 6, title: "Law Basics", author: "M. Johnson", category: "Law" },
    { id: 7, title: "Science Explained", author: "N. Tyson", category: "Science" },
    { id: 8, title: "Forever Yours", author: "N. Sparks", category: "Romance" },
    { id: 9, title: "English Grammar", author: "M. Swan", category: "Language" }
  ];

  const categories = ["All", "Art", "Psychology", "Business", "Leadership", "Law", "Science", "Romance", "Language"];

  /* ================= FILTERED BOOKS ================= */
  const filteredBooks = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    let result = books.filter(book =>
      (book.title.toLowerCase().includes(normalizedSearch) ||
      book.author.toLowerCase().includes(normalizedSearch) ||
      book.category.toLowerCase().includes(normalizedSearch))
      && (selectedCategory === "All" || book.category === selectedCategory)
    );

    return result;
  }, [searchTerm, selectedCategory, books]);

  return (
    <div className="books-page">

      {/* ================= HERO ================= */}
      <div className="books-hero">
        <h1>Books Collection</h1>
        <p>Explore our library and find your next favorite read</p>

        {/* 🔍 SEARCH BAR */}
        <div className="hero-search">
          <input
            type="text"
            placeholder="Search by title, author or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* ================= CATEGORY FILTER ================= */}
        <div className="category-filter">
          {categories.map(cat => (
            <button
              key={cat}
              className={selectedCategory === cat ? "category-chip active" : "category-chip"}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ================= BOOKS GRID ================= */}
      <div className="books-grid">
        {filteredBooks.length > 0 ? (
          filteredBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))
        ) : (
          <p className="no-results">No books found</p>
        )}
      </div>

    </div>
  );
};

export default Books;
