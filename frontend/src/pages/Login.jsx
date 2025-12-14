import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [isLogin, setIsLogin] = useState(true); // State për të ndërruar Login/Register

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

          <form className="auth-form">
            {!isLogin && (
              <div className="input-group">
                <label>Full Name</label>
                <input type="text" placeholder="John Doe" />
              </div>
            )}
            
            <div className="input-group">
              <label>Email Address</label>
              <input type="email" placeholder="example@uni-library.com" />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="********" />
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