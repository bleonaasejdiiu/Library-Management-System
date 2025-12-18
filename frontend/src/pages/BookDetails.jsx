import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";       
import './books.css';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ vendos brenda komponentit

  const [book, setBook] = useState(null);
  const [popup, setPopup] = useState({ message: "", type: "", visible: false });

  // Funksion për popup
  const showPopup = (message, type = "success") => {
    setPopup({ message, type, visible: true });
    setTimeout(() => setPopup(prev => ({ ...prev, visible: false })), 3000);
  };

  // Fetch book details
  useEffect(() => {
    fetch(`http://localhost:5000/api/books/${id}`)
      .then(res => res.json())
      .then(data => setBook(data))
      .catch(err => console.error(err));
  }, [id]);

  // Borrow function me kontroll për login
  const handleBorrow = async () => {
    const user = JSON.parse(localStorage.getItem("user")); // ose si e ruan loginin
    if (!user) {
      navigate("/login"); // ridrejton në login nëse nuk është kyçur
      return;
    }

    if (book.quantity <= 0) {
      showPopup("❌ Libri nuk është i disponueshëm", "error");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/books/${id}/borrow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberId: user.id }) // përdor userId real nga login
      });

      if (!res.ok) throw new Error("Libri nuk u huazua");

      await res.json();

      setBook(prev => ({ ...prev, quantity: prev.quantity - 1 }));
      showPopup("📚 Libri u huazua me sukses!", "success");

    } catch (err) {
      showPopup("❌ Libri nuk u huazua", "error");
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div className="book-details-page">
      {popup.visible && (
        <div className={`popup ${popup.type}`}>
          {popup.message}
        </div>
      )}

      <div className="book-details">
        <img src={book.image} alt={book.title} />
        <div className="book-info">
          <h2>{book.title}</h2>
          <p><strong>ISBN:</strong> {book.isbn}</p>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Category:</strong> {book.categoryName}</p>
          <p><strong>Publisher:</strong> {book.publisherName}</p>
          <p><strong>Year:</strong> {book.publicationYear}</p>
          <p><strong>Pages:</strong> {book.pages}</p>
          <p><strong>Quantity:</strong> {book.quantity}</p>
          <p><strong>Status:</strong> {book.quantity > 0 ? "Available" : "Not Available"}</p>
          <button onClick={handleBorrow} disabled={book.quantity <= 0}>
            Borrow
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;

