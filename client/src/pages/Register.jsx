import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { API_BASE_URL } from "../config/config";
import SweetAlert from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password === confirmPassword) {
      setPasswordsMatch(true);

      const requestData = {
        firstname,
        lastname,
        email,
        password,
        confirmPassword,
      };

      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/auth/register`,
          requestData
        );

        if (response) {
          setLoading(false);
          SweetAlert.fire({
            icon: "success",
            title: "Welcome to GrowLyf!",
            text: "Account created successfully",
            timer: 2000,
            showConfirmButton: false,
          });

          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");

          navigate("/api/auth/login");
        }
      } catch (error) {
        setLoading(false);
        SweetAlert.fire({
          icon: "error",
          title: "Registration Failed",
          text: error.response?.data?.message || "Please try again",
        });
      }
    } else {
      setPasswordsMatch(false);
      setLoading(false);
    }
  };

  return (
    <div className="dynamic-register-wrapper">
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      <div className="dynamic-register-container">
        <div className="register-header">
          <div className="logo-container">
            <div className="logo-circle">
              <span>GL</span>
            </div>
          </div>
          <h1 className="brand-title">GrowLyf</h1>
          <p className="brand-subtitle">Join the Growth Revolution</p>
        </div>

        <form onSubmit={handleRegister} className="dynamic-form">
          <div className="input-row">
            <div className="floating-input-group">
              <input
                type="text"
                id="firstname"
                required
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                className="floating-input"
                placeholder=" "
              />
              <label htmlFor="firstname" className="floating-label">
                First Name
              </label>
            </div>
            <div className="floating-input-group">
              <input
                type="text"
                id="lastname"
                required
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                className="floating-input"
                placeholder=" "
              />
              <label htmlFor="lastname" className="floating-label">
                Last Name
              </label>
            </div>
          </div>

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

          <div className="input-row">
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
            <div className="floating-input-group">
              <input
                type="password"
                id="confirmPassword"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="floating-input"
                placeholder=" "
              />
              <label htmlFor="confirmPassword" className="floating-label">
                Confirm Password
              </label>
            </div>
          </div>

          {!passwordsMatch && (
            <div className="error-popup">
              <span>⚠️ Passwords do not match</span>
            </div>
          )}

          <button
            type="submit"
            className="dynamic-submit-btn"
            disabled={loading}
          >
            <span className="btn-content">
              {loading ? (
                <>
                  <div className="loading-spinner"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <div className="btn-arrow">→</div>
                </>
              )}
            </span>
          </button>

          <div className="login-link">
            <span>Already have an account? </span>
            <Link to="/api/auth/login" className="dynamic-link">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
