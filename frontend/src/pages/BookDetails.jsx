import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";       
import './books.css';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [popup, setPopup] = useState({ message: "", type: "", visible: false });

  const API_BASE_URL = "http://localhost:5000";

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/books/${id}`)
      .then(res => res.json())
      .then(data => setBook(data))
      .catch(err => console.error(err));
  }, [id]);

  const showPopup = (message, type = "success") => {
    setPopup({ message, type, visible: true });
    setTimeout(() => setPopup(prev => ({ ...prev, visible: false })), 3000);
  };

  const handleBorrow = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId || userId === "undefined" || userId === null) {
      alert("Ju lutem bëni login!");
      navigate("/login");
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/api/books/${id}/borrow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberId: userId })
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Dështoi");
      setBook(prev => ({ ...prev, quantity: prev.quantity - 1 }));
      showPopup("📚 Libri u huazua me sukses!");
    } catch (err) {
      showPopup("❌ " + err.message, "error");
    }
  };

  const handleReserve = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) { alert("Bëni login!"); return; }
    try {
      const res = await fetch(`${API_BASE_URL}/api/books/${id}/reserve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberId: userId })
      });
      if (!res.ok) throw new Error("Dështoi");
      showPopup("⏳ Rezervimi u krye me sukses!");
    } catch (err) {
      showPopup("❌ " + err.message, "error");
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div className="book-details-page">
      {popup.visible && <div className={`popup ${popup.type}`}>{popup.message}</div>}
      <div className="book-details">
        <img src={book.image || "/images/img1.jpg"} alt={book.title} />
        <div className="book-info">
          <h2>{book.title}</h2>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>ISBN:</strong> {book.isbn}</p>
          <p><strong>Category:</strong> {book.categoryName || book.category || "N/A"}</p>
          <p><strong>Quantity:</strong> {book.quantity}</p>
          <p><strong>Status:</strong> {book.quantity > 0 ? "Available" : "Out of Stock"}</p>
          
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button onClick={handleBorrow} disabled={book.quantity <= 0} className="btn-borrow">Borrow</button>
            <button onClick={handleReserve} className="btn-reserve" style={{backgroundColor: '#2ecc71', color: 'white'}}>Reserve</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;


