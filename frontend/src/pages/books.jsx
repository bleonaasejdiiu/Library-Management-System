import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BookCard from "../components/bookCard1";
import "./books.css";

const Books = () => {
  const location = useLocation();

  /* ================= SEARCH & CATEGORY STATE ================= */
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  /* ================= BOOKS DATA ================= */
  const books = [
    { id: 1, title: "The Story of Art", author: "E. H. Gombrich", category: "Art" , image: "/images/img1.jpg" },
    { id: 2, title: "The Diary of a Young Girl", author: "A. Frank", category: "Art", image: "/images/img2.jpg"},
    { id: 3, title: "The Letters of Vincent van Gogh", author: "V. v. Gogh", category: "Art", image: "/images/img3.jpg"},
    { id: 4, title: "Ways of Seeing", author: "J. Berger", category: "Art", image: "/images/img4.jpg"},
    { id: 5, title: "Thinking, Fast and Slow", author: "D. Kahneman", category: "Psychology" , image: "/images/img5.jpg"},
    { id: 6, title: "Influence: The Psychology of Persuasion", author: "R.Cialdini", category: "Psychology", image: "/images/img6.jpg" },
    { id: 7, title: "Man's Search for Meaning ", author: "V. E. Frankl", category: "Psychology",  image: "/images/img7.jpg"  },
    { id: 8, title: "The Body Keeps the Score", author: "B. van der Kolk", category: "Psychology" ,image: "/images/img8.jpg" },
    { id: 9, title: "A Brief History of Time", author: "S. Hawking", category: "Science" , image: "/images/img9.jpg"},
    { id: 10, title: "Science", author: "J. Gribbin", category: "Science" , image: "/images/img10.jpg" },
    { id: 11, title: "Pride and Prejudice", author: "J. Austen", category: "Romance" , image: "/images/img11.jpg"},
    { id: 12, title: "Jane Eyre", author: "C.  Brontë", category: "Romance", image: "/images/img12.jpg" },
    { id: 13, title: "The Notebook", author: "N. Sparks", category: "Romance", image: "/images/img13.jpg" },
    { id: 14, title: "Lingo", author: "G. Dorren", category: "Language", image: "/images/img14.jpg" },
    { id: 15, title: "The Language Instinct", author: "S .Pinker", category: "Language" , image: "/images/img15.jpg" },
    { id: 16, title: "Untangled", author: "L. Damour", category: "Adolescence", image: "/images/img18.jpg" },
    { id: 17, title: "Brainstorm", author: "D. J. Siegel", category: "Adolescence", image: "/images/img17.jpg" },
    { id: 18, title: "How Language Works", author: "D. Crystal", category: "Language", image: "/images/img16.jpg" },
    { id: 19, title: "The Lean Startup", author: "E.  Ries", category: "Business", image: "/images/img19.jpg" },
    { id: 20, title: "The 7 Habits of Highly Effective People", author: "S. R. Covey", category: "Leadership", image: "/images/img20.jpg" },
    { id: 21, title: "Leaders Eat Last", author: "S.Sinek", category: "Leadership", image: "/images/img21.jpg" },
    { id: 22, title: "About Law", author: "T. Honorék", category: "Law", image: "/images/img22.jpg" },
    { id: 23, title: "Sapiens ", author: "Y.N.Harari", category: "History", image: "/images/img24.jpg" },
    { id: 24, title: "Zero to One", author: "P.Thiel", category: "Technology", image: "/images/IMG25.jpg" },
    { id: 25, title: "The Innovators ", author: "W.Isaacson", category: "Technology", image: "/images/img26.jpg" },
    { id: 26, title: "Code ", author: "C. Petzold", category: "Technology", image: "/images/img27.jpg" },
  ];

  /* ================= READ CATEGORY FROM URL ================= */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFromUrl = params.get("category");

    if (categoryFromUrl) {
      // e kthen p.sh. "romance" → "Romance"
      const formatted =
        categoryFromUrl.charAt(0).toUpperCase() +
        categoryFromUrl.slice(1).toLowerCase();

      setSelectedCategory(formatted);
    } else {
      setSelectedCategory("All");
    }
  }, [location.search]);

  /* ================= FILTERED BOOKS ================= */
  const filteredBooks = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase();

    return books.filter(book =>
      (book.title.toLowerCase().includes(normalizedSearch) ||
        book.author.toLowerCase().includes(normalizedSearch)) &&
      (selectedCategory === "All" || book.category === selectedCategory)
    );
  }, [searchTerm, selectedCategory]);

  return (
    <div className="books-page">

      {/* ================= HERO ================= */}
      <div className="books-hero">
        <h1>Books Collection</h1>
        <p>
          {selectedCategory === "All"
            ? "Explore our library and find your next favorite read"
            : `Category: ${selectedCategory}`}
        </p>

        <div className="hero-search">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
