import React from "react";
import "./bookcard.css";

const BookCard = ({ book }) => {
  // Për demo, secili libër ka rating 1-5
  const rating = Math.floor(Math.random() * 5) + 1;

  return (
    <div className="book-card">
      {/* IMAGE */}
      <div className="book-image">
        <img
          src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
          alt={book.title}
        />
      </div>

      {/* OVERLAY me buton */}
      <div className="book-overlay">
        <button className="details-btn">View Details</button>
      </div>

      {/* INFO */}
      <div className="book-info">
        <h3>{book.title}</h3>
        <p className="author">by {book.author}</p>
        <span className="category">{book.category}</span>

        {/* YJET */}
        <div className="rating">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < rating ? "star filled" : "star"}>
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookCard;




