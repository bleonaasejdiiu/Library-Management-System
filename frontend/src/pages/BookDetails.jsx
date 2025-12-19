import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";       
import './books.css';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [popup, setPopup] = useState({ message: "", type: "", visible: false });

  // 1. Define your Backend URL
  const API_BASE_URL = "http://localhost:5000";

  const showPopup = (message, type = "success") => {
    setPopup({ message, type, visible: true });
    setTimeout(() => setPopup(prev => ({ ...prev, visible: false })), 3000);
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/books/${id}`)
      .then(res => res.json())
      .then(data => {
        setBook(data);
      })
      .catch(err => console.error(err));
  }, [id]);

  // 2. Helper function to fix the Image Path
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/images/placeholder.jpg"; // Fallback if no image
    
    // If the path starts with http, it's already a full URL
    if (imagePath.startsWith('http')) return imagePath;

    // If the path starts with /images, we prepend the backend URL
    // Make sure your backend is actually serving the "public" or "uploads" folder
    return `${API_BASE_URL}${imagePath}`;
  };

  const handleBorrow = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId || userId === "undefined") {
      alert("Ju lutem bëni login përsëri!");
      navigate("/login");
      return;
    }

    if (book.quantity <= 0) {
      showPopup("❌ Libri nuk ka gjendje për huazim!", "error");
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
      showPopup("📚 Libri u huazua me sukses!", "success");
    } catch (err) {
      showPopup("❌ Gabim: " + err.message, "error");
    }
  };

  const handleReserve = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId || userId === "undefined") {
      alert("Ju lutem bëni login!");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/books/${id}/reserve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberId: userId })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Rezervimi dështoi");

      showPopup("⏳ Rezervimi u krye me sukses!", "success");
    } catch (err) {
      showPopup("❌ " + err.message, "error");
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
        {/* UPDATED IMAGE SOURCE HERE */}
        <img 
          src={getImageUrl(book.image)} 
          alt={book.title} 
          onError={(e) => { e.target.src = "/images/img1.jpg"; }} // Fallback if image fails to load
        />
        
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
          
          <div className="action-buttons" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button 
               onClick={handleBorrow} 
               disabled={book.quantity <= 0}
               className="btn-borrow"
            >
              {book.quantity > 0 ? "Borrow" : "Out of Stock"}
            </button>

            <button 
               onClick={handleReserve} 
               className="btn-reserve"
               style={{ backgroundColor: '#2ecc71', color: 'white' }}
            >
              Reserve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;