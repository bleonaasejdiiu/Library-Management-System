import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserDashboard() {
    const [loans, setLoans] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [notifications, setNotifications] = useState([]); // State për njoftimet
    const [user, setUser] = useState(null);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);

        if (userId) {
            fetchMyData();
        }
    }, [userId]);

    const fetchMyData = async () => {
        try {
            console.log("Duke kërkuar të dhënat për userId:", userId);

            // 1. Marrim huazimet (Kjo gjithashtu aktivizon kontrollin e vonesave në backend)
            const loansRes = await axios.get(`http://localhost:5000/api/books/member/${userId}`);
            setLoans(loansRes.data);

            // 2. Marrim rezervimet
            const reservationsRes = await axios.get(`http://localhost:5000/api/books/member/${userId}/reservations`);
            setReservations(reservationsRes.data);

            // 3. Marrim njoftimet
            const notesRes = await axios.get(`http://localhost:5000/api/notifications/${userId}`);
            setNotifications(notesRes.data);

        } catch (error) {
            console.error("Gabim gjatë marrjes së të dhënave:", error);
        }
    };

    // Funksioni për të fshirë njoftimin (shënuar si të lexuar)
    const markAsRead = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/notifications/${id}/read`);
            // Përditësojmë listën lokalisht që të zhduket nga ekrani
            setNotifications(notifications.filter(note => note.id !== id));
        } catch (error) {
            console.error("Gabim gjatë fshirjes së njoftimit:", error);
        }
    };

    return (
        <div className="dashboard-container" style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1>Mirësevjen, {user?.name || 'Përdorues'}!</h1>
            <p style={{ marginBottom: '30px' }}>Menaxhoni huazimet dhe rezervimet tuaja në këtë panel.</p>

            {/* --- SEKSIONI I NJOFTIMEVE (SHFAQET VETËM NËSE KA NJOFTIME) --- */}
            {notifications.length > 0 && (
                <div className="notifications-alert" style={{ marginBottom: '40px' }}>
                    <h3 style={{ color: '#e74c3c', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        ⚠️ Njoftime të rëndësishme ({notifications.length})
                    </h3>
                    <div className="notes-list">
                        {notifications.map((note) => (
                            <div 
                                key={note.id} 
                                style={{ 
                                    background: '#fff5f5', 
                                    borderLeft: '5px solid #e74c3c', 
                                    padding: '15px', 
                                    marginBottom: '10px',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}
                            >
                                <span>{note.message}</span>
                                <button 
                                    onClick={() => markAsRead(note.id)}
                                    style={{ 
                                        background: '#e74c3c', 
                                        color: 'white', 
                                        border: 'none', 
                                        padding: '5px 10px', 
                                        borderRadius: '4px', 
                                        cursor: 'pointer' 
                                    }}
                                >
                                    OK
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* --- SEKSIONI I HUAZIMEVE --- */}
            <div className="loans-section" style={{ marginTop: '30px' }}>
                <h3 style={{ borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>📚 Librat e Mi të Huazuar</h3>
                {loans.length === 0 ? (
                    <p style={{ color: '#7f8c8d', fontStyle: 'italic' }}>Nuk keni asnjë libër të huazuar aktualisht.</p>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Titulli</th>
                                <th>Autori</th>
                                <th>Data e Huazimit</th>
                                <th>Afati i Kthimit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loans.map((loan) => (
                                <tr key={loan.loanId}>
                                    <td><strong>{loan.title}</strong></td>
                                    <td>{loan.author}</td>
                                    <td>{new Date(loan.loanDate).toLocaleDateString()}</td>
                                    <td style={{ color: new Date(loan.dueDate) < new Date() ? 'red' : 'inherit' }}>
                                        {new Date(loan.dueDate).toLocaleDateString()}
                                        {new Date(loan.dueDate) < new Date() && " (VONË)"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* --- SEKSIONI I REZERVIMEVE --- */}
            <div className="reservations-section" style={{ marginTop: '50px' }}>
                <h3 style={{ borderBottom: '2px solid #2ecc71', paddingBottom: '10px' }}>⏳ Rezervimet e Mia</h3>
                {reservations.length === 0 ? (
                    <p style={{ color: '#7f8c8d', fontStyle: 'italic' }}>Nuk keni asnjë rezervim në pritje.</p>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Titulli</th>
                                <th>Autori</th>
                                <th>Data e Rezervimit</th>
                                <th>Statusi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map((res) => (
                                <tr key={res.reservationId}>
                                    <td>{res.title}</td>
                                    <td>{res.author}</td>
                                    <td>{new Date(res.reservationDate).toLocaleDateString()}</td>
                                    <td>
                                        <span className={`status-badge ${res.status.toLowerCase()}`}>
                                            {res.status.toUpperCase()}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            
            <div style={{ marginTop: '40px', textAlign: 'center' }}>
                <button onClick={() => window.location.href='/books'} className="btn-auth">
                    Eksploro Librat tjerë
                </button>
            </div>
        </div>
    );
}

export default UserDashboard;