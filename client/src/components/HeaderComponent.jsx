import React from "react";
import "../App.css";

import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import SweetAlert from "sweetalert2";

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = localStorage.getItem("user");

  const handleLogout = () => {
    SweetAlert.fire({
      title: 'Are you sure?',
      text: "You will be logged out from your account.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#667eea',
      cancelButtonColor: '#999',
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("JWTToken");
        localStorage.removeItem("user");
        dispatch({ type: "LOGIN_ERROR" });
        navigate("/api/auth/login");
        SweetAlert.fire({
          icon: 'success',
          title: 'Logged out!',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <nav className="growlyf-navbar">
      <div className="growlyf-container">
        <NavLink to="/" className="growlyf-logo">
          GrowLyf
        </NavLink>

        <input type="checkbox" id="nav-toggle" className="nav-toggle" />
        <label htmlFor="nav-toggle" className="nav-toggle-label">
          <span></span>
        </label>

        <ul className="growlyf-nav">
          <li>
            <NavLink
              to="/api/user/add-sales"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Add Sales
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/api/user/top-sales"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Sales History
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/api/user/total-revenue"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Total Revenue
            </NavLink>
          </li>

          {!user ? (
            <li className="nav-dropdown">
              <span className="nav-link dropdown-toggle">Login / Sign Up</span>
              <ul className="dropdown-menu">
                <li>
                  <NavLink to="/api/auth/login" className="dropdown-item">
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/api/auth/register" className="dropdown-item">
                    Register
                  </NavLink>
                </li>
              </ul>
            </li>
          ) : (
            <li>
              <button className="btn-logout" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* Styles specific to GrowLyf navbar */}
      <style>{`
        /* Container */
        .growlyf-navbar {
          background: linear-gradient(90deg, #667eea, #764ba2);
          position: sticky;
          top: 0;
          z-index: 999;
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
          font-family: 'Poppins', sans-serif;
        }

        .growlyf-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0.6rem 1.2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          color: #fff;
        }

        /* Logo */
        .growlyf-logo {
          font-weight: 900;
          font-size: 1.8rem;
          color: #fff;
          letter-spacing: 2px;
          text-decoration: none;
          user-select: none;
          transition: color 0.3s ease;
        }
        .growlyf-logo:hover {
          color: #e0e7ff;
        }

        /* Nav */
        .growlyf-nav {
          list-style: none;
          display: flex;
          align-items: center;
          gap: 2rem;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          color: #f0f4ff;
          font-weight: 600;
          text-decoration: none;
          padding: 0.5rem 0;
          border-bottom: 3px solid transparent;
          transition: all 0.25s ease;
          cursor: pointer;
          user-select: none;
        }
        .nav-link:hover,
        .nav-link.active {
          border-bottom: 3px solid #e0e7ff;
          color: #e0e7ff;
        }

        /* Dropdown */
        .nav-dropdown {
          position: relative;
          cursor: pointer;
        }
        .dropdown-toggle::after {
          content: ' ▼';
          font-size: 0.7rem;
          color: #d1d5db;
          user-select: none;
        }
        .dropdown-menu {
          position: absolute;
          background: #4f46e5;
          top: 2.8rem;
          left: 0;
          min-width: 120px;
          border-radius: 6px;
          box-shadow: 0 8px 16px rgba(0,0,0,0.2);
          display: none;
          flex-direction: column;
          padding: 0.5rem 0;
          z-index: 10;
        }
        .nav-dropdown:hover .dropdown-menu {
          display: flex;
        }
        .dropdown-item {
          padding: 0.5rem 1rem;
          color: #e0e7ff;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.3s ease;
        }
        .dropdown-item:hover {
          background: #6366f1;
        }

        /* Logout button */
        .btn-logout {
          background: #4f46e5;
          border: none;
          padding: 0.5rem 1.2rem;
          border-radius: 6px;
          color: #e0e7ff;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
          user-select: none;
        }
        .btn-logout:hover {
          background: #6366f1;
        }

        /* Responsive Nav Toggle */
        .nav-toggle {
          display: none;
        }
        .nav-toggle-label {
          display: none;
          position: relative;
          width: 30px;
          height: 25px;
          cursor: pointer;
          user-select: none;
        }
        .nav-toggle-label span,
        .nav-toggle-label span::before,
        .nav-toggle-label span::after {
          display: block;
          position: absolute;
          width: 100%;
          height: 4px;
          background: white;
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        .nav-toggle-label span::before {
          content: '';
          top: -8px;
        }
        .nav-toggle-label span::after {
          content: '';
          top: 8px;
        }

        @media (max-width: 768px) {
          .growlyf-container {
            flex-wrap: nowrap;
          }

          .nav-toggle {
            display: block;
          }
          .nav-toggle-label {
            display: block;
          }

          .growlyf-nav {
            position: fixed;
            top: 60px;
            right: -100%;
            background: linear-gradient(90deg, #667eea, #764ba2);
            height: calc(100% - 60px);
            flex-direction: column;
            gap: 1rem;
            padding: 2rem 1.5rem;
            width: 220px;
            transition: right 0.3s ease;
            z-index: 999;
            border-radius: 0 0 0 12px;
          }

          .nav-toggle:checked ~ .growlyf-nav {
            right: 0;
          }

          .nav-dropdown:hover .dropdown-menu {
            display: none;
          }
          .nav-dropdown > .dropdown-menu {
            position: relative;
            top: 0;
            box-shadow: none;
            background: transparent;
            padding: 0;
          }
          .nav-dropdown > .dropdown-menu > li > a {
            padding-left: 0;
            color: white;
          }
        }
      `}</style>
    </nav>
  );
};

export default HeaderComponent;
