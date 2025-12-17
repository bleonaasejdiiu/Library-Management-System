import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// --- IMPORTIMI I KOMPONENTËVE ---
import Header from './components/Header';
import Footer from './components/Footer';

// --- IMPORTIMI I FAQEVE TË VËRTETA ---
import Home from './pages/Home';
import Login from './pages/Login'; 
import About from './pages/About'; // <--- Tani kjo është aktive!
import AdminDashboard from './pages/AdminDashboard'; // <--- IMPORTOJE KËTU

// --- PLACEHOLDERS (Vetëm për faqet që s'i kemi bërë ende) ---
// VËMENDJE: E kemi fshirë 'const About = ...' që të mos dalë më ajo shkrimi i thjeshtë.

import Books from './pages/books';



import Authors from './pages/Authors';


<Route path="/authors" element={<Authors />} />

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Header /> 
        
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/books" element={<Books />} />
            <Route path="/authors" element={<Authors />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />

          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;