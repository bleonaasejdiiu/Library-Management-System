import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // --- STATES ---
  const [activeTab, setActiveTab] = useState('books'); 
  const [loading, setLoading] = useState(false);
  
  // Data States
  const [books, setBooks] = useState([]); 
  const [users, setUsers] = useState([]);
  const [loans, setLoans] = useState([]); // <--- State i Ri për Huazimet

  // Books Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [bookIdToEdit, setBookIdToEdit] = useState(null);
  
  const categoriesList = ["Fiction", "Science", "Technology", "History", "Biography", "Art", "Children", "Business"];

  const [newBook, setNewBook] = useState({
    isbn: '', title: '', author: '', publicationYear: '', category: '', publisher: '', quantity: 1
  });

  // --- 1. KONTROLLI I SIGURISË DHE DATA FETCHING ---
  useEffect(() => {
    const role = localStorage.getItem('role');
    
    // ZGJIDHJA E PROBLEMIT "INFINITE LOOP":
    // Lejojmë hyrjen nëse roli është 'Admin' (databazë) OSE 'admin' (hardcoded diku)
    if (role !== 'Admin' && role !== 'admin') {
      navigate('/login'); 
    } else {
      // Merr të dhënat në bazë të tabit aktiv
      if (activeTab === 'books') fetchBooks();
      if (activeTab === 'users') fetchUsers();
      if (activeTab === 'loans') fetchLoans(); // <--- Merr Huazimet
    }
  }, [navigate, activeTab]);

  // --- API FETCH FUNCTIONS ---
  const fetchBooks = async () => {
    setLoading(true);
    try { setBooks((await axios.get('http://localhost:5000/api/books')).data); setLoading(false); } 
    catch (e) { console.error(e); setLoading(false); }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try { setUsers((await axios.get('http://localhost:5000/api/users')).data); setLoading(false); } 
    catch (e) { console.error(e); setLoading(false); }
  };

  const fetchLoans = async () => {
    setLoading(true);
    try { setLoans((await axios.get('http://localhost:5000/api/loans')).data); setLoading(false); } 
    catch (e) { console.error(e); setLoading(false); }
  };

  // --- ACTIONS ---

  // User Actions
  const handleDeleteUser = async (id) => {
    if(window.confirm('A jeni i sigurt që doni ta fshini këtë përdorues?')) {
        try { 
            await axios.delete(`http://localhost:5000/api/users/${id}`); 
            alert("✅ Përdoruesi u fshi!");
            fetchUsers(); 
        } 
        catch (e) { alert("Gabim gjatë fshirjes"); }
    }
  };

  // Book Actions
  const handleEditClick = (book) => {
    setEditMode(true);
    setBookIdToEdit(book.bookId || book.id); 
    setNewBook({
      isbn: book.isbn || book.ISBN, title: book.title, author: book.author,
      publicationYear: book.publicationYear, category: book.categoryName || book.category || '',
      publisher: book.publisherName || book.publisher || '', quantity: book.quantity || 1
    });
    setShowAddForm(true);
    window.scrollTo(0, 0);
  };

  const resetBookForm = () => {
    setNewBook({ isbn: '', title: '', author: '', publicationYear: '', category: '', publisher: '', quantity: 1 });
    setShowAddForm(false); setEditMode(false); setBookIdToEdit(null);
  };

  const handleSaveBook = async (e) => {
    e.preventDefault();
    if (!newBook.category) return alert("Zgjidh kategorinë!");
    try {
        if (editMode) await axios.put(`http://localhost:5000/api/books/${bookIdToEdit}`, newBook);
        else await axios.post('http://localhost:5000/api/books', newBook);
        resetBookForm(); fetchBooks(); alert("Sukses!");
    } catch (e) { alert("Gabim!"); }
  };

  const handleDeleteBook = async (id) => {
    if(window.confirm('A jeni i sigurt?')) {
        try { await axios.delete(`http://localhost:5000/api/books/${id}`); fetchBooks(); } 
        catch (e) { alert("Gabim"); }
    }
  };

  // Loan Actions (Kthimi i Librit)
  const handleReturnBook = async (loanId) => {
      if(window.confirm("Konfirmo kthimin e librit?")) {
          try {
              await axios.put(`http://localhost:5000/api/loans/${loanId}/return`);
              fetchLoans(); // Rifresko listën
              alert("Libri u kthye me sukses!");
          } catch (error) {
              alert("Gabim gjatë kthimit të librit.");
          }
      }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="dashboard-layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>🛡️ Admin Panel</h2>
        <ul>
          <li className={activeTab === 'books' ? 'active' : ''} onClick={() => setActiveTab('books')}>📚 Menaxho Librat</li>
          <li className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>👥 Menaxho Përdoruesit</li>
          <li className={activeTab === 'loans' ? 'active' : ''} onClick={() => setActiveTab('loans')}>📅 Huazimet</li>
        </ul>
        <div style={{marginTop: 'auto', padding: '20px'}}>
             <button onClick={handleLogout} className="btn-delete" style={{width: '100%'}}>LOGOUT</button>
        </div>
      </aside>

      {/* CONTENT */}
      <main className="dashboard-content">
        
        {/* === TABI 1: LIBRAT === */}
        {activeTab === 'books' && (
          <div className="fade-in">
            <div className="content-header">
              <h1>📚 Inventari i Librave</h1>
              <button className="btn-add" onClick={() => showAddForm ? resetBookForm() : setShowAddForm(true)}
                style={{ backgroundColor: showAddForm ? '#7f8c8d' : '#8d6e63' }}>
                {showAddForm ? '❌ Mbyll Formën' : '+ Shto Libër'}
              </button>
            </div>
            
            {showAddForm && (
                <div className="form-container fade-in">
                    <form onSubmit={handleSaveBook} className="add-book-form">
                        <div className="form-group"><label>ISBN</label><input type="text" required value={newBook.isbn} onChange={(e)=>setNewBook({...newBook, isbn: e.target.value})} /></div>
                        <div className="form-group"><label>Titulli</label><input type="text" required value={newBook.title} onChange={(e)=>setNewBook({...newBook, title: e.target.value})} /></div>
                        <div className="form-group"><label>Autori</label><input type="text" required value={newBook.author} onChange={(e)=>setNewBook({...newBook, author: e.target.value})} /></div>
                        <div className="form-group"><label>Viti</label><input type="number" required value={newBook.publicationYear} onChange={(e)=>setNewBook({...newBook, publicationYear: e.target.value})} /></div>
                        <div className="form-group"><label>Kategoria</label>
                            <select required value={newBook.category} onChange={(e)=>setNewBook({...newBook, category: e.target.value})}>
                                <option value="">-- Zgjidh --</option>
                                {categoriesList.map((c, i) => <option key={i} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="form-group"><label>Botuesi</label><input type="text" required value={newBook.publisher} onChange={(e)=>setNewBook({...newBook, publisher: e.target.value})} /></div>
                        <div className="form-group"><label>Sasia</label><input type="number" min="1" required value={newBook.quantity} onChange={(e)=>setNewBook({...newBook, quantity: e.target.value})} /></div>
                        <button type="submit" className="btn-add" style={{gridColumn:'span 2', marginTop:'10px'}}>{editMode?'💾 Përditëso':'💾 Ruaj'}</button>
                    </form>
                </div>
            )}
            
            <div className="table-container">
              {loading ? <p>Duke marrë librat...</p> : (
              <table>
                <thead><tr><th>ISBN</th><th>Titulli</th><th>Autori</th><th>Kategoria</th><th>Sasia</th><th>Veprime</th></tr></thead>
                <tbody>
                  {books.map(b => (
                    <tr key={b.bookId || b.id}>
                      <td>{b.ISBN || b.isbn}</td><td><strong>{b.title}</strong></td><td>{b.author}</td>
                      <td>{b.categoryName || b.category}</td><td style={{textAlign:'center'}}>{b.quantity}</td>
                      <td>
                        <button className="btn-action btn-edit" onClick={() => handleEditClick(b)}>Edit</button>
                        <button className="btn-action btn-delete" onClick={() => handleDeleteBook(b.bookId || b.id)}>Fshi</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              )}
            </div>
          </div>
        )}

        {/* === TABI 2: USERAT === */}
        {activeTab === 'users' && (
          <div className="fade-in">
             <div className="content-header"><h1>👥 Lista e Anëtarëve</h1></div>
             <div className="table-container">
               {loading ? <p>Duke marrë userat...</p> : (
               <table>
                 <thead><tr><th>ID</th><th>Emri</th><th>Mbiemri</th><th>Email</th><th>Roli</th><th>Veprime</th></tr></thead>
                 <tbody>
                   {users.map(u => (
                     <tr key={u.personId}>
                       <td>{u.personId}</td><td><strong>{u.name}</strong></td><td>{u.lastname}</td><td>{u.email}</td>
                       <td>
                        <span style={{
                            padding:'4px 8px', borderRadius:'4px', fontWeight:'bold',
                            backgroundColor: u.role === 'Admin' ? '#ffebee' : '#e8f5e9',
                            color: u.role === 'Admin' ? '#c62828' : '#2e7d32'
                        }}>
                            {u.role || 'member'}
                        </span>
                       </td>
                       <td><button className="btn-action btn-delete" onClick={() => handleDeleteUser(u.personId)}>Fshi</button></td>
                     </tr>
                   ))}
                 </tbody>
               </table>
               )}
             </div>
          </div>
        )}

        {/* === TABI 3: HUAZIMET (LOANS) - E KOMPLETUAR === */}
        {activeTab === 'loans' && (
          <div className="fade-in">
             <div className="content-header"><h1>📅 Regjistri i Huazimeve</h1></div>
             <div className="table-container">
               {loading ? <p>Duke marrë huazimet...</p> : (
               <table>
                 <thead>
                   <tr>
                     <th>ID</th>
                     <th>Libri</th>
                     <th>Huazuesi</th>
                     <th>Data e Marrjes</th>
                     <th>Data e Kthimit</th>
                     <th>Statusi</th>
                     <th>Veprime</th>
                   </tr>
                 </thead>
                 <tbody>
                   {loans.length > 0 ? loans.map(loan => (
                     <tr key={loan.loanId}>
                       <td>{loan.loanId}</td>
                       <td><strong>{loan.bookTitle}</strong></td>
                       <td>{loan.userName} {loan.userSurname}</td>
                       <td>{loan.loanDate ? loan.loanDate.substring(0, 10) : '-'}</td>
                       <td style={{color: '#e67e22'}}>{loan.dueDate ? loan.dueDate.substring(0, 10) : '-'}</td>
                       <td>
                         <span style={{
                             padding:'4px 8px', borderRadius:'4px', fontWeight:'bold',
                             backgroundColor: loan.status === 'Active' ? '#fff3e0' : '#e0f2f1',
                             color: loan.status === 'Active' ? '#ef6c00' : '#00695c'
                         }}>
                             {loan.status === 'Active' ? '⏳ Në Përdorim' : '✅ Kthyer'}
                         </span>
                       </td>
                       <td>
                         {loan.status === 'Active' && (
                             <button 
                                className="btn-action" 
                                style={{backgroundColor: '#2ecc71', color:'white', border:'none'}}
                                onClick={() => handleReturnBook(loan.loanId)}
                             >
                                Kthe Librin
                             </button>
                         )}
                       </td>
                     </tr>
                   )) : (
                     <tr><td colSpan="7" style={{textAlign:'center', padding:'20px'}}>Nuk ka huazime aktive.</td></tr>
                   )}
                 </tbody>
               </table>
               )}
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;