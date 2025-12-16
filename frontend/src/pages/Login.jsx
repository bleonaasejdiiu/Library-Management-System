import React, { useState } from 'react';
import axios from 'axios'; // Importojmë axios për lidhjen me Backend

function Login() {
  const [isLogin, setIsLogin] = useState(true);

  // Këtu ruajmë të dhënat që shkruan përdoruesi
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    phoneNumber: ''
  });

  // Funksioni që ndryshon vlerat kur shkruan në input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Funksioni kur klikon butonin Submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mos bëj refresh faqes

    if (!isLogin) {
      // --- LOGJIKA E REGJISTRIMIT ---
      try {
        // Dërgojmë të dhënat te Backend (Port 5000)
        const response = await axios.post('http://localhost:5000/api/auth/register', formData);
        
        if (response.data.success) {
          alert("✅ Regjistrimi u krye me sukses! Tani mund të hyni.");
          setIsLogin(true); // E kthejmë te forma Login
        }
      } catch (error) {
        console.error("Gabim:", error);
        alert("❌ Gabim gjatë regjistrimit: " + (error.response?.data?.error || "Diçka shkoi keq."));
      }
    } else {
      // --- LOGJIKA E LOGIN (Do ta bëjmë më vonë) ---
      alert("Login ende nuk është implementuar në Backend, por Regjistrimi punon!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Pjesa e Majtë - Imazhi/Informacioni */}
        <div className="auth-image-side">
          <div className="auth-overlay">
            <h2>{isLogin ? "Welcome Back!" : "Join Us!"}</h2>
            <p>
              {isLogin 
                ? "Sign in to access your library account, manage loans, and explore books." 
                : "Create an account to start borrowing books and join our community."}
            </p>
          </div>
        </div>

        {/* Pjesa e Djathtë - Forma */}
        <div className="auth-form-side">
          <div className="form-header">
            <h3>{isLogin ? "Member Login" : "Create Account"}</h3>
            <p>Please enter your details</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            
            {/* Fushat shtesë për Regjistrim (Sipas Databazës) */}
            {!isLogin && (
              <>
                <div className="input-group">
                  <label>First Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Emri" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="input-group">
                  <label>Last Name</label>
                  <input 
                    type="text" 
                    name="lastname" 
                    placeholder="Mbiemri" 
                    value={formData.lastname}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="input-group">
                  <label>Phone Number</label>
                  <input 
                    type="text" 
                    name="phoneNumber" 
                    placeholder="+383 44 ..." 
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
            
            <div className="input-group">
              <label>Email Address</label>
              <input 
                type="email" 
                name="email"
                placeholder="example@uni-library.com" 
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input 
                type="password" 
                name="password"
                placeholder="********" 
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn-auth">
              {isLogin ? "Login" : "Register"}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <span onClick={() => setIsLogin(!isLogin)} className="toggle-auth">
                {isLogin ? " Sign Up" : " Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;