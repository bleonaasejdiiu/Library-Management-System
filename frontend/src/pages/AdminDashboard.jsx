import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './books.css'; // Mund të përdorësh stilin ekzistues ose të krijosh admin.css

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    // Marrim të dhënat e userit nga LocalStorage
    const user = JSON.parse(localStorage.getItem('user'));
    
    // Siguri shtesë: Nëse s'ka user ose nuk është admin, ktheje mbrapsht
    const role = localStorage.getItem('role');
    if (!user || role !== 'admin') {
      navigate('/login');
    } else {
      setAdminName(user.name);
    }
  }, [navigate]);

  const handleLogout = () => {
    // Pastrojmë të gjitha të dhënat
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="dashboard-container" style={{ display: 'flex', height: '100vh' }}>
      
      {/* --- SIDEBAR (Majtas) --- */}
      <div className="sidebar" style={{ width: '250px', backgroundColor: '#2c3e50', color: 'white', padding: '20px' }}>
        <h2>📚 Library Admin</h2>
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '30px' }}>
          <li style={liStyle} onClick={() => console.log('Shko te Librat')}>📖 Menaxho Librat</li>
          <li style={liStyle} onClick={() => console.log('Shko te Anëtarët')}>busts👥 Menaxho Anëtarët</li>
          <li style={liStyle} onClick={() => console.log('Shko te Huazimet')}>📅 Huazimet & Kthimet</li>
          <li style={liStyle} onClick={() => console.log('Shko te Statistikat')}>📊 Statistikat</li>
        </ul>
        
        <button 
          onClick={handleLogout} 
          style={{ marginTop: '50px', backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer', width: '100%' }}
        >
          Dil (Logout)
        </button>
      </div>

      {/* --- CONTENT (Djathtas) --- */}
      <div className="content" style={{ flex: 1, padding: '30px', backgroundColor: '#f4f6f9' }}>
        <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1>Paneli i Administratorit</h1>
          <div className="admin-profile">
            <span>Mirësevini, <strong>{adminName}</strong> (Admin)</span>
          </div>
        </div>

        {/* Këtu do të jenë "Cards" për statistika të shpejta */}
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          <div style={cardStyle}>
            <h3>📖 Total Libra</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>120</p>
          </div>
          <div style={cardStyle}>
            <h3>👥 Total Anëtarë</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>45</p>
          </div>
          <div style={cardStyle}>
            <h3>📅 Libra të Huazuar</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>12</p>
          </div>
        </div>

        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>Veprimet e Fundit</h3>
          <p>Këtu do të shfaqen huazimet e fundit ose librat e shtuar së fundmi...</p>
        </div>
      </div>
    </div>
  );
};

// Stile të thjeshta JS për të mos krijuar CSS file tani
const liStyle = {
  padding: '15px 10px',
  cursor: 'pointer',
  borderBottom: '1px solid #34495e',
  fontSize: '16px'
};

const cardStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  textAlign: 'center'
};

export default AdminDashboard;