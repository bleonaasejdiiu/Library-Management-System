import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [isLogin, setIsLogin] = useState(true); // State për të ndërruar Login/Register
  const navigate = useNavigate(); // Për të kaluar te faqja Home pas loginit

  // Ruajmë të dhënat e formës
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    phoneNumber: '',
    email: '',
    password: ''
  });

  // Kur shkruan në inpute, përditëso state-in
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Kur klikon butonin Login ose Register
  // Brenda Login.jsx

const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          email: formData.email,
          password: formData.password
        });

        if (response.data.success) {
          // 1. Ruajmë të dhënat
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          
          // Sigurohemi që po ruajmë rolin e saktë
          const role = response.data.user.role; 
          localStorage.setItem('role', role); 

          // 2. NDARJA STRIKTE E FAQEVE
          // ZGJIDHJA: Kontrollojmë edhe 'admin' (kod) edhe 'Admin' (databazë)
          if (role === 'admin' || role === 'Admin') {
              console.log("Redirecting to Admin Dashboard..."); // Për testim
              navigate('/admin-dashboard');
          } else {
              console.log("Redirecting to User Dashboard..."); // Për testim
              navigate('/user-dashboard'); 
          }
        }
      } catch (error) {
        console.error("Login error", error);
        alert("Gabim në Login! " + (error.response?.data?.error || ""));
      }
    } 
    // --- LOGJIKA E REGJISTRIMIT ---
    else {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/register', {
          name: formData.name,
          lastname: formData.lastname,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          password: formData.password
        });

        if (response.data.success) {
          alert("✅ Regjistrimi u krye me sukses! Tani ju lutem bëni Login.");
          setIsLogin(true); 
          setFormData({ ...formData, password: '' });
        }
      } catch (error) {
        console.error("Register Error:", error);
        alert("❌ Gabim: " + (error.response?.data?.error || "Diçka shkoi keq gjatë regjistrimit."));
      }
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
            
            {/* Fushat shtesë shfaqen vetëm kur je duke bërë Register (!isLogin) */}
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
                    placeholder="+383..." 
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
            
            {/* Fushat për Email dhe Password janë gjithmonë aty */}
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