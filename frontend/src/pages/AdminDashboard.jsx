import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // STATE
  const [activeTab, setActiveTab] = useState('books'); 
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // EDIT STATE
  const [editMode, setEditMode] = useState(false);
  const [bookIdToEdit, setBookIdToEdit] = useState(null);

  const categoriesList = [
    "Fiction", "Science", "Technology", "History", 
    "Biography", "Art", "Children", "Business", 
    "Classic", "Romance", "Mystery", "Thriller"
  ];

  // FORM STATE (ME SASI)
  const [newBook, setNewBook] = useState({
    isbn: '',
    title: '',
    author: '',
    publicationYear: '',
    category: '',
    publisher: '',
    quantity: 1
  });

  const [books, setBooks] = useState([]); 

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      navigate('/login'); 
    } else {
      fetchBooks();
    }
  }, [navigate]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/books');
      setBooks(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Gabim gjatë marrjes së librave:", error);
      setLoading(false);
    }
  };

  const handleEditClick = (book) => {
    setEditMode(true);
    setBookIdToEdit(book.bookId || book.id); 

    setNewBook({
      isbn: book.isbn || book.ISBN,
      title: book.title,
      author: book.author,
      publicationYear: book.publicationYear,
      category: book.categoryName || book.category || '',
      publisher: book.publisherName || book.publisher || '',
      quantity: book.quantity || 1 // Marrim sasinë nga DB
    });

    setShowAddForm(true);
    window.scrollTo(0, 0);
  };

  const resetForm = () => {
    setNewBook({ 
        isbn: '', title: '', author: '', publicationYear: '', 
        category: '', publisher: '', quantity: 1 
      });
      setShowAddForm(false);
      setEditMode(false);
      setBookIdToEdit(null);
  };

  const handleSaveBook = async (e) => {
    e.preventDefault();
    if (!newBook.category) {
        alert("Ju lutem zgjidhni një kategori!");
        return;
    }

    try {
        if (editMode) {
            await axios.put(`http://localhost:5000/api/books/${bookIdToEdit}`, newBook);
            alert("✅ Libri u përditësua me sukses!");
        } else {
            await axios.post('http://localhost:5000/api/books', newBook);
            alert("✅ Libri u shtua me sukses!");
        }
        resetForm();
        fetchBooks();
    } catch (error) {
        console.error("Gabim gjatë ruajtjes:", error);
        alert("❌ Gabim! Kontrollo konsolën.");
    }
  };

  const handleDeleteBook = async (id) => {
    if(window.confirm('A jeni i sigurt që doni ta fshini këtë libër?')) {
        try {
            await axios.delete(`http://localhost:5000/api/books/${id}`);
            fetchBooks();
        } catch (error) {
            console.error("Gabim gjatë fshirjes:", error);
            alert("❌ Nuk u fshi dot libri.");
        }
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="dashboard-layout">
      
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

      <main className="dashboard-content">
        
        {activeTab === 'books' && (
          <div className="fade-in">
            <div className="content-header">
              <h1>📚 Inventari i Librave</h1>
              <button 
                className="btn-add" 
                onClick={() => {
                    if (showAddForm) resetForm();
                    else setShowAddForm(true);
                }}
                style={{ backgroundColor: showAddForm ? '#7f8c8d' : '#8d6e63' }}
              >
                {showAddForm ? '❌ Mbyll Formën' : '+ Shto Libër'}
              </button>
            </div>

            {showAddForm && (
                <div className="form-container fade-in">
                    <h3>{editMode ? '✏️ Ndrysho Libër' : '➕ Shto Libër të Ri'}</h3>
                    <form onSubmit={handleSaveBook} className="add-book-form">
                        
                        <div className="form-group">
                            <label>ISBN</label>
                            <input type="text" required value={newBook.isbn} 
                                onChange={(e)=>setNewBook({...newBook, isbn: e.target.value})} />
                        </div>

                        <div className="form-group">
                            <label>Titulli</label>
                            <input type="text" required value={newBook.title} 
                                onChange={(e)=>setNewBook({...newBook, title: e.target.value})} />
                        </div>

                        <div className="form-group">
                            <label>Autori</label>
                            <input type="text" required value={newBook.author} 
                                onChange={(e)=>setNewBook({...newBook, author: e.target.value})} />
                        </div>

                        <div className="form-group">
                            <label>Viti</label>
                            <input type="number" required value={newBook.publicationYear} 
                                onChange={(e)=>setNewBook({...newBook, publicationYear: e.target.value})} />
                        </div>

                        <div className="form-group">
                            <label>Kategoria</label>
                            <select required value={newBook.category} 
                                onChange={(e)=>setNewBook({...newBook, category: e.target.value})}>
                                <option value="">-- Zgjidh Kategorinë --</option>
                                {categoriesList.map((cat, index) => (
                                    <option key={index} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Botuesi</label>
                            <input type="text" required value={newBook.publisher} 
                                onChange={(e)=>setNewBook({...newBook, publisher: e.target.value})} />
                        </div>

                        <div className="form-group">
                            <label>Sasia (Kopje)</label>
                            <input type="number" min="1" required value={newBook.quantity} 
                                onChange={(e)=>setNewBook({...newBook, quantity: e.target.value})} />
                        </div>

                        <button type="submit" className="btn-add" style={{marginTop: '10px', width: '100%', gridColumn: 'span 2'}}>
                            {editMode ? '💾 Përditëso' : '💾 Ruaj'}
                        </button>
                    </form>
                </div>
            )}
            
            <div className="table-container">
              {loading ? <p>Loading...</p> : (
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
                  {books.map(book => (
                    <tr key={book.bookId || book.id}>
                      <td style={{color:'#7f8c8d'}}>{book.ISBN || book.isbn}</td>
                      <td><strong>{book.title}</strong></td>
                      <td>{book.author}</td>
                      <td>{book.publicationYear}</td>
                      <td><span className="badge">{book.categoryName || book.category}</span></td>
                      <td>{book.publisherName || book.publisher}</td>
                      <td style={{textAlign:'center', fontWeight:'bold'}}>{book.quantity}</td>
                      <td>
                        <button className="btn-action btn-edit" onClick={() => handleEditClick(book)}>Edit</button>
                        <button className="btn-action btn-delete" onClick={() => handleDeleteBook(book.bookId || book.id)}>Fshi</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'users' && <div><h1>Lista e Userave</h1><p>Së shpejti...</p></div>}
        {activeTab === 'loans' && <div><h1>Huazimet</h1><p>Së shpejti...</p></div>}
      </main>
    </div>
  );
};

export default AdminDashboard;