import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; // <--- KËTU ISHTE GABIMI (E RREGULLOVA)

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('books'); 
  
  // 1. STATE PËR SHFAQJEN E FORMËS
  const [showAddForm, setShowAddForm] = useState(false);

  // 2. STATE PËR TË DHËNAT E FORMËS
  const [newBook, setNewBook] = useState({
    title: '', author: '', category: '', quantity: 1
  });

  // Të dhëna statike sa për testim (Librat)
  const [books, setBooks] = useState([
    { id: 1, title: 'Harry Potter', author: 'J.K. Rowling', category: 'Fiction', quantity: 5 },
    { id: 2, title: 'Clean Code', author: 'Robert Martin', category: 'Tech', quantity: 3 },
    { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Classic', quantity: 2 },
  ]);

  // Të dhëna statike (Userat)
  const [users, setUsers] = useState([
    { id: 101, name: 'Filan Fisteku', email: 'filan@example.com', role: 'Member' },
    { id: 102, name: 'Ana Prifti', email: 'ana@example.com', role: 'Member' },
  ]);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      navigate('/login'); 
    }
  }, [navigate]);

  // --- LOGJIKA VIZUALE (PA DB AKOMA) ---

  // Shto Libër (Vetëm në listën lokale)
  const handleSaveBook = (e) => {
    e.preventDefault(); // Mos bëj refresh faqes
    
    const tempBook = {
        id: books.length + 1, // Krijojmë një ID false
        ...newBook
    };

    setBooks([...books, tempBook]); // E shtojmë në listë
    setShowAddForm(false); // Mbyllim formën
    setNewBook({ title: '', author: '', category: '', quantity: 1 }); // Pastrojmë fushat
    alert("Libri u shtua vizualisht!"); 
  };

  // Fshi Libër
  const handleDeleteBook = (id) => {
    if(window.confirm('A jeni i sigurt?')) {
        setBooks(books.filter(b => b.id !== id));
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="dashboard-layout">
      
      {/* --- SIDEBAR --- */}
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

      {/* --- CONTENT --- */}
      <main className="dashboard-content">
        
        {/* === TABI: LIBRAT === */}
        {activeTab === 'books' && (
          <div className="fade-in">
            <div className="content-header">
              <h1>📚 Inventari i Librave</h1>
              {/* BUTONI QË HAP/MBYLL FORMËN */}
              <button 
                className="btn-add" 
                onClick={() => setShowAddForm(!showAddForm)}
                style={{ backgroundColor: showAddForm ? '#7f8c8d' : '#8d6e63' }}
              >
                {showAddForm ? '❌ Mbyll Formën' : '+ Shto Libër'}
              </button>
            </div>

            {/* --- FORMA PËR SHTIMIN E LIBRIT --- */}
            {showAddForm && (
                <div className="form-container fade-in">
                    <h3>Shto Libër të Ri</h3>
                    <form onSubmit={handleSaveBook} className="add-book-form">
                        <div className="form-group">
                            <label>Titulli</label>
                            <input 
                                type="text" placeholder="psh. Harry Potter" required 
                                value={newBook.title} onChange={(e)=>setNewBook({...newBook, title: e.target.value})} 
                            />
                        </div>
                        <div className="form-group">
                            <label>Autori</label>
                            <input 
                                type="text" placeholder="psh. J.K. Rowling" required 
                                value={newBook.author} onChange={(e)=>setNewBook({...newBook, author: e.target.value})} 
                            />
                        </div>
                        <div className="form-group">
                            <label>Kategoria</label>
                            <input 
                                type="text" placeholder="psh. Fiction" required 
                                value={newBook.category} onChange={(e)=>setNewBook({...newBook, category: e.target.value})} 
                            />
                        </div>
                        <div className="form-group">
                            <label>Sasia</label>
                            <input 
                                type="number" min="1" required 
                                value={newBook.quantity} onChange={(e)=>setNewBook({...newBook, quantity: e.target.value})} 
                            />
                        </div>
                        <button type="submit" className="btn-add" style={{marginTop: '10px', width: '100%'}}>Ruaj në Listë</button>
                    </form>
                </div>
            )}
            
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Titulli</th>
                    <th>Autori</th>
                    <th>Kategoria</th>
                    <th>Sasia</th>
                    <th>Veprime</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map(book => (
                    <tr key={book.id}>
                      <td>#{book.id}</td>
                      <td><strong>{book.title}</strong></td>
                      <td>{book.author}</td>
                      <td>{book.category}</td>
                      <td>{book.quantity}</td>
                      <td>
                        <button className="btn-action btn-edit">Edit</button>
                        <button className="btn-action btn-delete" onClick={() => handleDeleteBook(book.id)}>Fshi</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* === TABI: PËRDORUESIT === */}
        {activeTab === 'users' && (
          <div className="fade-in">
             <div className="content-header">
              <h1>👥 Lista e Anëtarëve</h1>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Emri i plotë</th>
                    <th>Email</th>
                    <th>Roli</th>
                    <th>Veprime</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>#{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td><span style={{padding:'5px 10px', backgroundColor:'#e0f2f1', borderRadius:'15px', color:'#00695c'}}>{user.role}</span></td>
                      <td>
                        <button className="btn-action btn-delete">Blloko</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* === TABI: HUAZIMET === */}
        {activeTab === 'loans' && (
          <div className="fade-in">
             <div className="content-header">
              <h1>📅 Huazimet Aktive</h1>
            </div>
            <div className="table-container">
                <table>
                <thead>
                  <tr>
                    <th>ID Huazimi</th>
                    <th>Libri</th>
                    <th>Huazuesi</th>
                    <th>Data e Kthimit</th>
                    <th>Statusi</th>
                  </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#55</td>
                        <td>Harry Potter</td>
                        <td>Filan Fisteku</td>
                        <td>25/12/2025</td>
                        <td style={{color: '#d35400', fontWeight:'bold'}}>Pa kthyer</td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;