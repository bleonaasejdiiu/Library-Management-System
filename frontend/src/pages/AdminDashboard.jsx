import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // --- STATE PËR NAVIGIM ---
  const [activeTab, setActiveTab] = useState('books'); 
  
  // --- STATE PËR SHFAQJEN E FORMËS ---
  const [showAddForm, setShowAddForm] = useState(false);

  // --- LISTA E KATEGORIVE (Për Dropdown) ---
  const categoriesList = [
    "Fiction", 
    "Science", 
    "Technology", 
    "History", 
    "Biography", 
    "Art", 
    "Children", 
    "Business", 
    "Classic",
    "Romance",
    "Mystery"
  ];

  // --- STATE PËR TË DHËNAT E LIBRIT (Sipas UML Diagramit) ---
  const [newBook, setNewBook] = useState({
    isbn: '',
    title: '',
    author: '',
    publicationYear: '',
    category: '',
    publisher: '',
    quantity: 1
  });

  // --- DUMMY DATA (Librat fillestarë sa për pamje) ---
  const [books, setBooks] = useState([
    { 
      id: 1, 
      isbn: '978-3-16-148410-0', 
      title: 'Harry Potter', 
      author: 'J.K. Rowling', 
      publicationYear: 1997, 
      category: 'Fiction', 
      publisher: 'Bloomsbury', 
      quantity: 5 
    },
    { 
      id: 2, 
      isbn: '978-0-13-235088-4', 
      title: 'Clean Code', 
      author: 'Robert Martin', 
      publicationYear: 2008, 
      category: 'Technology', 
      publisher: 'Prentice Hall', 
      quantity: 3 
    },
    { 
      id: 3, 
      isbn: '978-0-7432-7356-5', 
      title: 'The Great Gatsby', 
      author: 'F. Scott Fitzgerald', 
      publicationYear: 1925, 
      category: 'Classic', 
      publisher: 'Scribner', 
      quantity: 2 
    },
  ]);

  // --- DUMMY DATA (Userat) ---
  const [users, setUsers] = useState([
    { id: 101, name: 'Filan Fisteku', email: 'filan@example.com', role: 'Member' },
    { id: 102, name: 'Ana Prifti', email: 'ana@example.com', role: 'Member' },
    { id: 103, name: 'Besa Gashi', email: 'besa@example.com', role: 'Member' },
  ]);

  // --- KONTROLLI I SIGURISË (A është Admin?) ---
  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      navigate('/login'); 
    }
  }, [navigate]);

  // --- LOGJIKA E SHTIMIT TË LIBRIT ---
  const handleSaveBook = (e) => {
    e.preventDefault();
    
    // Validim i thjeshtë: Nëse s'ka zgjedhur kategori
    if (!newBook.category) {
        alert("Ju lutem zgjidhni një kategori!");
        return;
    }

    // Krijojmë objektin e ri të librit
    const tempBook = {
        id: books.length + 1, // ID e përkohshme
        ...newBook
    };

    setBooks([...books, tempBook]); // Shtojmë në listë
    setShowAddForm(false); // Mbyllim formën
    
    // Pastrojmë fushat
    setNewBook({ 
      isbn: '', title: '', author: '', publicationYear: '', 
      category: '', publisher: '', quantity: 1 
    });
    
    alert("Libri u shtua me sukses!"); 
  };

  // --- LOGJIKA E FSHIRJES ---
  const handleDeleteBook = (id) => {
    if(window.confirm('A jeni i sigurt që doni ta fshini këtë libër?')) {
        setBooks(books.filter(b => b.id !== id));
    }
  };

  // --- LOGJIKA E DALJES (LOGOUT) ---
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

            {/* --- FORMA PËR SHTIMIN E LIBRIT --- */}
            {showAddForm && (
                <div className="form-container fade-in">
                    <h3>Shto Libër të Ri (Sipas UML)</h3>
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

                        {/* --- DROPDOWN PËR KATEGORITË --- */}
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
                            <input type="text" placeholder="Emri i shtëpisë botuese" required 
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
              <table>
                <thead>
                  <tr>
                    <th>ISBN</th>
                    <th>Titulli</th>
                    <th>Autori</th>
                    <th>Viti</th>
                    <th>Kategoria</th>
                    <th>Sasia</th>
                    <th>Veprime</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map(book => (
                    <tr key={book.id}>
                      <td style={{fontSize:'13px', color:'#7f8c8d'}}>{book.isbn}</td>
                      <td><strong>{book.title}</strong></td>
                      <td>{book.author}</td>
                      <td>{book.publicationYear}</td>
                      <td>
                        <span style={{padding:'4px 8px', backgroundColor:'#efebe9', borderRadius:'4px', fontSize:'13px', color:'#5d4037'}}>
                            {book.category}
                        </span>
                      </td>
                      <td style={{textAlign:'center', fontWeight:'bold'}}>{book.quantity}</td>
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

        {/* ================= TABI 2: PËRDORUESIT ================= */}
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
                      <td>
                        <span style={{padding:'5px 10px', backgroundColor:'#e0f2f1', borderRadius:'15px', color:'#00695c', fontWeight:'bold'}}>
                            {user.role}
                        </span>
                      </td>
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

        {/* ================= TABI 3: HUAZIMET ================= */}
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
                    <tr>
                        <td>#56</td>
                        <td>Clean Code</td>
                        <td>Ana Prifti</td>
                        <td>20/12/2025</td>
                        <td style={{color: 'green', fontWeight:'bold'}}>Kthyer</td>
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