import React from "react";
import { useLocation } from "react-router-dom";
import BookCard from "../components/bookCard1";
import "./books.css";

const Books = () => {
  const query = new URLSearchParams(useLocation().search);
  const selectedCategory = query.get("category");

  // ===============================
  // KATEGORITË (SLIDER)
  // ===============================
  const categories = [
    {
      name: "Art",
      value: "art",
      img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
    },
    {
      name: "Adolescence",
      value: "adolescence",
      img: "https://images.unsplash.com/photo-1516979187457-637abb4f9353"
    },
    {
      name: "Business",
      value: "business",
      img: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f"
    },
    {
      name: "Leadership",
      value: "leadership",
      img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
    },
    {
      name: "Law",
      value: "law",
      img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
    },
    {
      name: "Science",
      value: "science",
      img: "https://images.unsplash.com/photo-1507413245164-6160d8298b31"
    },
    {
      name: "Romance",
      value: "romance",
      img: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
    },
    {
      name: "Language",
      value: "language",
      img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8"
    }
  ];

  // ===============================
  // LISTA E LIBRAVE (PLACEHOLDER)
  // ===============================
  const books = [
    { id: 1, title: "Art of Design", author: "J. Brown", category: "art" },
    { id: 2, title: "Modern Painting", author: "L. Smith", category: "art" },

    { id: 3, title: "Teen Psychology", author: "A. Miller", category: "adolescence" },
    { id: 4, title: "Growing Up Smart", author: "K. Adams", category: "adolescence" },

    { id: 5, title: "Business 101", author: "R. Allen", category: "business" },
    { id: 6, title: "Startup Secrets", author: "E. Ford", category: "business" },

    { id: 7, title: "Leadership Power", author: "J. Maxwell", category: "leadership" },
    { id: 8, title: "Lead Like a Pro", author: "S. Covey", category: "leadership" },

    { id: 9, title: "Law Basics", author: "M. Johnson", category: "law" },
    { id: 10, title: "Criminal Justice", author: "T. White", category: "law" },

    { id: 11, title: "Science Explained", author: "N. Tyson", category: "science" },
    { id: 12, title: "Physics for Life", author: "S. Hawking", category: "science" },

    { id: 13, title: "Love Stories", author: "E. Brontë", category: "romance" },
    { id: 14, title: "Forever Yours", author: "N. Sparks", category: "romance" },

    { id: 15, title: "English Grammar", author: "M. Swan", category: "language" },
    { id: 16, title: "Linguistics Today", author: "D. Crystal", category: "language" }
  ];

  // ===============================
  // FILTER SIPAS KATEGORISË
  // ===============================
  const filteredBooks = selectedCategory
    ? books.filter(book => book.category === selectedCategory)
    : books;

  return (
    <div className="books-page">
      
      {/* ================= HERO SECTION ================= */}
      <div className="books-hero">
        <h1>Books Collection</h1>
        <p>
          Explore books from different categories and discover your next favorite read
        </p>
      </div>

      {/* ================= CATEGORY SLIDER ================= */}
      <div className="category-slider">
        {categories.map(cat => (
          <a
            key={cat.value}
            href={`/books?category=${cat.value}`}
            className="category-card"
          >
            <img src={cat.img} alt={cat.name} />
            <span>{cat.name}</span>
          </a>
        ))}
      </div>

      {/* ================= BOOKS GRID ================= */}
      <div className="books-grid">
        {filteredBooks.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

    </div>
  );
};

export default Books;
