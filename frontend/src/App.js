import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// --- IMPORTIMI I KOMPONENTËVE ---
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login'; // Kjo merr faqen profesionale nga folderi pages
// import About from './pages/About'; // <--- HAPI 1: Hiqe komentin nëse e ke krijuar skedarin About.jsx

// --- PLACEHOLDERS ---
// Këto përdoren vetëm për faqet që s'i ke krijuar ende si skedarë.

// HAPI 2: Nëse e ke krijuar About.jsx dhe e importove lart, FSHIJE rreshtin e mëposhtëm "const About..."
const About = () => <div style={{padding: "100px", textAlign: "center"}}><h1>About Us Page (Placeholder)</h1></div>;

const Books = () => <div style={{padding: "100px", textAlign: "center"}}><h1>Books Catalog</h1></div>;
const Authors = () => <div style={{padding: "100px", textAlign: "center"}}><h1>Authors Page</h1></div>;

// VËMENDJE: E kam fshirë "const Login = ..." nga këtu sepse po e importojmë lart.

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
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;