import React from "react";
import { useNavigate } from "react-router-dom";
import "./bookcard.css";

const BookCard = ({ book }) => {
  const navigate = useNavigate(); // ✅ brenda komponentit

  const rating = Math.floor(Math.random() * 5) + 1;

  const handleViewDetails = () => {
    navigate(`/books/${book.id}`);
  };

  return (
    <div className="book-card">
      <div className="book-image">
        <img src={book.image} alt={book.title} />
      </div>

      <div className="book-overlay">
        <button className="details-btn" onClick={handleViewDetails}>
          View Details
        </button>
      </div>

      <div className="book-info">
        <h3>{book.title}</h3>
        <p className="author">by {book.author}</p>
        <span className="category">{book.category}</span>

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





