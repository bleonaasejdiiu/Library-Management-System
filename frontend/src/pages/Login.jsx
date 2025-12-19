import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    phoneNumber: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      lastname: '',
      phoneNumber: '',
      email: '',
      password: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          email: formData.email,
          password: formData.password
        });

        if (response.data.success) {
          const user = response.data.user;

          // PËRDITËSIMI KRYESOR: Marrim ID-në nga çdo fushë e mundshme
          const finalId = user.userId || user.memberId || user.id || user.personId;

          // Ruajmë të dhënat në LocalStorage
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('role', user.role);
          localStorage.setItem('userId', finalId); // Tani nuk do të jetë më undefined!

          console.log("ID-ja e ruajtur me sukses:", finalId);

          // Redirect bazuar në rol
          if (user.role.toLowerCase() === 'admin') {
              navigate('/admin-dashboard');
          } else {
              navigate('/user-dashboard'); 
          }
        }
      } catch (error) {
        console.error("Login error", error);
        alert("Gabim në Login! " + (error.response?.data?.error || ""));
      }
    } else {
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
          switchMode();
        }
      } catch (error) {
        console.error("Register Error:", error);
        alert("❌ Gabim: " + (error.response?.data?.error || "Regjistrimi dështoi."));
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
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

        <div className="auth-form-side">
          <div className="form-header">
            <h3>{isLogin ? "Member Login" : "Create Account"}</h3>
            <p>Please enter your details</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} autoComplete="off">
            {!isLogin && (
              <>
                <div className="input-group">
                  <label>First Name</label>
                  <input type="text" name="name" placeholder="Emri" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <label>Last Name</label>
                  <input type="text" name="lastname" placeholder="Mbiemri" value={formData.lastname} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <label>Phone Number</label>
                  <input type="text" name="phoneNumber" placeholder="+383..." value={formData.phoneNumber} onChange={handleChange} />
                </div>
              </>
            )}
            
            <div className="input-group">
              <label>Email Address</label>
              <input type="email" name="email" placeholder="example@uni-library.com" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input type="password" name="password" placeholder="********" value={formData.password} onChange={handleChange} required />
            </div>

            <button type="submit" className="btn-auth">
              {isLogin ? "Login" : "Register"}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <span onClick={switchMode} className="toggle-auth">
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