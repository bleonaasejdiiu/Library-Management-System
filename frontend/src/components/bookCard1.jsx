import React from "react";
import "./bookcard.css";

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      
      {/* IMAGE PLACEHOLDER */}
      <div className="book-image">
        <img
          src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
          alt={book.title}
        />
      </div>

      {/* CONTENT */}
      <div className="book-info">
        <h3>{book.title}</h3>
        <p className="author">by {book.author}</p>
        <span className="category">{book.category}</span>

        <button className="details-btn">View Details</button>
      </div>

    </div>
  );
};

export default BookCard;

