import React, { useState, useEffect } from "react"; 
import { useParams } from "react-router-dom";       
import './books.css';                           

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  
  // ✅ Popup state
  const [popup, setPopup] = useState({ message: "", type: "", visible: false });

  // Funksion për popup
  const showPopup = (message, type = "success") => {
    setPopup({ message, type, visible: true });
    setTimeout(() => setPopup({ ...popup, visible: false }), 3000);
  };

  // Fetch book details
  useEffect(() => {
    fetch(`http://localhost:5000/api/books/${id}`)
      .then(res => res.json())
      .then(data => setBook(data))
      .catch(err => console.error(err));
  }, [id]);

  // Borrow function
  const handleBorrow = async () => {
    const userId = 1;
    try {
      const res = await fetch(`http://localhost:5000/api/books/${id}/borrow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberId: userId })
      });
      if (!res.ok) throw new Error("Error borrowing book");
      const data = await res.json();
      showPopup(data.message, "success");
    } catch (err) {
      showPopup(err.message, "error");
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div className="book-details-page">
      {popup.visible && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            backgroundColor: popup.type === "success" ? "#4CAF50" : "#f44336",
            color: "white",
            padding: "12px 20px",
            borderRadius: "6px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
          }}
        >
          {popup.message}
        </div>
      )}

      <div className="book-details">
        <img src={book.image} alt={book.title} />
        <div>
          <h2>{book.title}</h2>
          <p>Author: {book.author}</p>
          <p>Category: {book.categoryName}</p>
          <p>Publisher: {book.publisherName}</p>
          <p>Year: {book.publicationYear}</p>
          <p>Status: {book.quantity > 0 ? "Available" : "Not Available"}</p>
          <button onClick={handleBorrow}>Borrow</button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
