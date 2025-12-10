import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Importimi i Komponentëve
import Header from './components/Header';
import Footer from './components/Footer'; // E RËNDËSISHME
import Home from './pages/Home';

// Komponente të thjeshta sa për të mos dhënë error faqet tjera
const About = () => <div style={{padding: "100px", textAlign: "center"}}><h1>About Us Page</h1></div>;
const Books = () => <div style={{padding: "100px", textAlign: "center"}}><h1>Books Catalog</h1></div>;
const Authors = () => <div style={{padding: "100px", textAlign: "center"}}><h1>Authors Page</h1></div>;
const Login = () => <div style={{padding: "100px", textAlign: "center"}}><h1>Login Page</h1></div>;

function App() {
  return (
    <Router>
      {/* Wrapper kryesor: Siguron që Footeri të rrijë poshtë */}
      <div className="app-layout">
        
        <Header /> 
        
        {/* Main Content: Kjo pjesë zgjerohet sa të dojë */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/books" element={<Books />} />
            <Route path="/authors" element={<Authors />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>

        <Footer /> {/* Tani Footeri shfaqet gjithmonë */}
        
      </div>
    </Router>
  );
}

export default App;