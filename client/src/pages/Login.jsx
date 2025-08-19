import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { API_BASE_URL } from "../config/config";
import SweetAlert from "sweetalert2";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requestData = { email, password };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        requestData
      );

      if (response) {
        setLoading(false);
        SweetAlert.fire({
          icon: "success",
          title: "Welcome Back!",
          text: "Login successful",
          timer: 1500,
          showConfirmButton: false,
        });

        localStorage.setItem("JWTToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.userId));

        dispatch({ type: "LOGIN_SUCCESS", payload: response.data.userId });

        navigate("/api/user/add-sales");
        console.log("Login successful:", response);
      }
    } catch (error) {
      setLoading(false);
      SweetAlert.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response?.data?.message || "Invalid credentials",
      });
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="dynamic-login-wrapper">
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      <div className="dynamic-login-container">
        <div className="login-header">
          <div className="logo-container">
            <div className="logo-circle">
            <img style={{ width: "auto" }} src="/logo.png" alt="GrowLyf Logo" />

            </div>
          </div>
          <h1 className="brand-title">GrowLyf</h1>
          <p className="brand-subtitle">Welcome Back, Growth Champion!</p>
        </div>

        <form onSubmit={handleLogin} className="dynamic-form">
          <div className="floating-input-group">
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="floating-input"
              placeholder=" "
            />
            <label htmlFor="email" className="floating-label">
              Email Address
            </label>
          </div>

          <div className="floating-input-group">
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="floating-input"
              placeholder=" "
            />
            <label htmlFor="password" className="floating-label">
              Password
            </label>
          </div>

          <button
            type="submit"
            className="dynamic-submit-btn"
            disabled={loading}
          >
            <span className="btn-content">
              {loading ? (
                <>
                  <div className="loading-spinner"></div>
                  Signing In...
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <div className="btn-arrow">→</div>
                </>
              )}
            </span>
          </button>

          <div className="signup-link">
            <span>Don't have an account? </span>
            <Link to="/api/auth/register" className="dynamic-link">
              Sign Up
            </Link>
          </div>
        </form>

        <div className="footer-credit">
          <p>Designed & Developed by <span className="silicon-savants">Silicon Savants</span></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
