import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  const imageSource = book.image ? book.image : "/images/img1.jpg";

  return (
    <div className="book-card">
      <img src={imageSource} alt={book.title} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
      <div className="book-card-info" style={{ padding: '15px' }}>
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <p><small>{book.categoryName || book.category}</small></p>
        <Link to={`/books/${book.bookId || book.id}`} className="view-details-btn" style={{
          display: 'block', marginTop: '10px', padding: '10px', backgroundColor: '#3498db', color: 'white', textDecoration: 'none', borderRadius: '5px', textAlign: 'center'
        }}>
          View Details
        </Link>
      </div>
    </div>
  );
};

export default BookCard;






