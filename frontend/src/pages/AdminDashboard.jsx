import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // --- STATE PËR NAVIGIM ---
  const [activeTab, setActiveTab] = useState('books'); 
  const [loading, setLoading] = useState(false);
  
  // --- STATE PËR SHFAQJEN E FORMËS ---
  const [showAddForm, setShowAddForm] = useState(false);

  // --- LISTA E KATEGORIVE (Dropdown) ---
  const categoriesList = [
    "Fiction", "Science", "Technology", "History", 
    "Biography", "Art", "Children", "Business", 
    "Classic", "Romance", "Mystery", "Thriller"
  ];

  // --- FORM STATE (Të dhënat e librit të ri) ---
  const [newBook, setNewBook] = useState({
    isbn: '',
    title: '',
    author: '',
    publicationYear: '',
    category: '',
    publisher: '',
    quantity: 1
  });

  // --- DATA STATE (Të dhënat nga Databaza) ---
  const [books, setBooks] = useState([]); 
  const [users, setUsers] = useState([]); 

  // --- 1. KONTROLLI I SIGURISË (A është Admin?) ---
  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      navigate('/login'); 
    } else {
      fetchBooks(); // Marrim librat sapo hapet faqja
    }
  }, [navigate]);

  // --- 2. FUNKSIONI PËR TË LEXUAR LIBRAT (GET) ---
  const fetchBooks = async () => {
    setLoading(true);
    try {
      // Sigurohu që porta është 5000 (Backend API)
      const response = await axios.get('http://localhost:5000/api/books');
      setBooks(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Gabim gjatë marrjes së librave:", error);
      setLoading(false);
    }
  };

  // --- 3. FUNKSIONI PËR TË SHTUAR LIBËR (POST) ---
  const handleSaveBook = async (e) => {
    e.preventDefault();
    
    // Validim: A është zgjedhur kategoria?
    if (!newBook.category) {
        alert("Ju lutem zgjidhni një kategori!");
        return;
    }

    try {
        // Dërgojmë të dhënat në Backend
        await axios.post('http://localhost:5000/api/books', newBook);
        
        alert("✅ Libri u ruajt me sukses në Databazë!");
        setShowAddForm(false);
        
        // Pastrojmë fushat
        setNewBook({ 
          isbn: '', title: '', author: '', publicationYear: '', 
          category: '', publisher: '', quantity: 1 
        });

        // Rifreskojmë tabelën automatikisht
        fetchBooks();

    } catch (error) {
        console.error("Gabim gjatë shtimit:", error);
        alert("❌ Gabim! Sigurohu që serveri Backend është ndezur.");
    }
  };

  // --- 4. FUNKSIONI PËR TË FSHIRË LIBËR (DELETE) ---
  const handleDeleteBook = async (id) => {
    if(window.confirm('A jeni i sigurt që doni ta fshini këtë libër përgjithmonë?')) {
        try {
            await axios.delete(`http://localhost:5000/api/books/${id}`);
            // Rifreskojmë listën pas fshirjes
            fetchBooks();
        } catch (error) {
            console.error("Gabim gjatë fshirjes:", error);
            alert("❌ Nuk u fshi dot libri.");
        }
    }
  };

  // --- LOGOUT ---
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="dashboard-layout">
      
      {/* ================= SIDEBAR (Majtas) ================= */}
      <aside className="sidebar">
        <h2>🛡️ Admin Panel</h2>
        <ul>
          <li className={activeTab === 'books' ? 'active' : ''} onClick={() => setActiveTab('books')}>
            📚 Menaxho Librat
          </li>
          <li className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>
            👥 Menaxho Përdoruesit
          </li>
          <li className={activeTab === 'loans' ? 'active' : ''} onClick={() => setActiveTab('loans')}>
            📅 Huazimet
          </li>
        </ul>
        <div style={{marginTop: 'auto', padding: '20px'}}>
             <button onClick={handleLogout} className="btn-delete" style={{width: '100%'}}>LOGOUT</button>
        </div>
      </aside>

      {/* ================= CONTENT (Djathtas) ================= */}
      <main className="dashboard-content">
        
        {/* ================= TABI 1: LIBRAT ================= */}
        {activeTab === 'books' && (
          <div className="fade-in">
            <div className="content-header">
              <h1>📚 Inventari i Librave</h1>
              <button 
                className="btn-add" 
                onClick={() => setShowAddForm(!showAddForm)}
                style={{ backgroundColor: showAddForm ? '#7f8c8d' : '#8d6e63' }}
              >
                {showAddForm ? '❌ Mbyll Formën' : '+ Shto Libër'}
              </button>
            </div>

            {/* --- FORMA E SHTIMIT --- */}
            {showAddForm && (
                <div className="form-container fade-in">
                    <h3>Shto Libër në Databazë</h3>
                    <form onSubmit={handleSaveBook} className="add-book-form">
                        
                        <div className="form-group">
                            <label>ISBN</label>
                            <input type="text" placeholder="978-..." required 
                                value={newBook.isbn} onChange={(e)=>setNewBook({...newBook, isbn: e.target.value})} 
                            />
                        </div>

                        <div className="form-group">
                            <label>Titulli</label>
                            <input type="text" placeholder="Titulli i librit" required 
                                value={newBook.title} onChange={(e)=>setNewBook({...newBook, title: e.target.value})} 
                            />
                        </div>

                        <div className="form-group">
                            <label>Autori</label>
                            <input type="text" placeholder="Emri i autorit" required 
                                value={newBook.author} onChange={(e)=>setNewBook({...newBook, author: e.target.value})} 
                            />
                        </div>

                        <div className="form-group">
                            <label>Viti i Publikimit</label>
                            <input type="number" placeholder="2024" required 
                                value={newBook.publicationYear} onChange={(e)=>setNewBook({...newBook, publicationYear: e.target.value})} 
                            />
                        </div>

                        {/* Dropdown për Kategorinë */}
                        <div className="form-group">
                            <label>Kategoria</label>
                            <select 
                                required 
                                value={newBook.category} 
                                onChange={(e)=>setNewBook({...newBook, category: e.target.value})}
                            >
                                <option value="">-- Zgjidh Kategorinë --</option>
                                {categoriesList.map((cat, index) => (
                                    <option key={index} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Botuesi (Publisher)</label>
                            <input type="text" placeholder="Shtëpia botuese" required 
                                value={newBook.publisher} onChange={(e)=>setNewBook({...newBook, publisher: e.target.value})} 
                            />
                        </div>

                        <div className="form-group">
                            <label>Sasia (Kopje)</label>
                            <input type="number" min="1" required 
                                value={newBook.quantity} onChange={(e)=>setNewBook({...newBook, quantity: e.target.value})} 
                            />
                        </div>

                        <button type="submit" className="btn-add" style={{marginTop: '10px', width: '100%', gridColumn: 'span 2'}}>
                            Ruaj Librin
                        </button>
                    </form>
                </div>
            )}
            
            {/* --- TABELA E LIBRAVE --- */}
            <div className="table-container">
              {loading ? <p style={{padding:'20px'}}>Duke marrë të dhënat nga serveri...</p> : (
              <table>
                <thead>
                  <tr>
                    <th>ISBN</th>
                    <th>Titulli</th>
                    <th>Autori</th>
                    <th>Viti</th>
                    <th>Kategoria</th>
                    <th>Botuesi</th>
                    <th>Sasia</th>
                    <th>Veprime</th>
                  </tr>
                </thead>
                <tbody>
                  {books.length > 0 ? books.map(book => (
                    // Përdorim bookId ose id (varet si vjen nga backend)
                    <tr key={book.bookId || book.id}>
                      <td style={{fontSize:'13px', color:'#7f8c8d'}}>{book.ISBN || book.isbn}</td>
                      <td><strong>{book.title}</strong></td>
                      <td>{book.author}</td>
                      <td>{book.publicationYear}</td>
                      <td>
                        <span style={{padding:'4px 8px', backgroundColor:'#efebe9', borderRadius:'4px', fontSize:'13px', color:'#5d4037'}}>
                            {/* Nëse backend kthen categoryName e shfaqim, përndryshe category */}
                            {book.categoryName || book.category || 'N/A'}
                        </span>
                      </td>
                      <td style={{fontSize:'13px'}}>{book.publisherName || book.publisher || '-'}</td>
                      <td style={{textAlign:'center', fontWeight:'bold'}}>{book.quantity}</td>
                      <td>
                        <button className="btn-action btn-edit">Edit</button>
                        <button 
                            className="btn-action btn-delete" 
                            onClick={() => handleDeleteBook(book.bookId || book.id)}
                        >
                            Fshi
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                        <td colSpan="8" style={{textAlign:'center', padding:'30px', color:'#888'}}>
                            Nuk u gjet asnjë libër në databazë. Shto të parin!
                        </td>
                    </tr>
                  )}
                </tbody>
              </table>
              )}
            </div>
          </div>
        )}

        {/* ================= TABI 2: PËRDORUESIT ================= */}
        {activeTab === 'users' && (
          <div className="fade-in">
             <div className="content-header"><h1>👥 Lista e Anëtarëve</h1></div>
             <p style={{padding:'20px'}}>Së shpejti do lidhet me databazën e userave...</p>
          </div>
        )}

        {/* ================= TABI 3: HUAZIMET ================= */}
        {activeTab === 'loans' && (
          <div className="fade-in">
             <div className="content-header"><h1>📅 Huazimet Aktive</h1></div>
             <p style={{padding:'20px'}}>Së shpejti do lidhet me databazën e huazimeve...</p>
          </div>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;