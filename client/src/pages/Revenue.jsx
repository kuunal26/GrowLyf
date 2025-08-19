import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { API_BASE_URL } from "../config/config";
import SweetAlert from "sweetalert2";

const Revenue = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRevenue() {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/user/total-revenue`);
        setTotalRevenue(response.data.totalRevenue);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        SweetAlert.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to fetch total revenue. Please try again.",
        });
      }
    }
    fetchRevenue();
  }, []);

  // Format currency INR aligned with previous pages (no decimals)
  const formattedRevenue = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(totalRevenue);

  return (
    <div className="dynamic-login-wrapper" style={{ minHeight: "70vh", padding: "40px 20px" }}>
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      <div
        className="dynamic-register-container"
        style={{
          maxWidth: "480px",
          padding: "60px 40px",
          textAlign: "center",
          borderRadius: "24px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
        }}
      >
        <div className="logo-container" style={{ justifyContent: "center", marginBottom: "30px" }}>
          <div
            className="logo-circle"
            style={{
              width: 80,
              height: 80,
              fontSize: 28,
              backgroundImage: "linear-gradient(45deg, #667eea, #764ba2)",
              boxShadow: "0 8px 25px rgba(102, 126, 234, 0.6)",
            }}
          >
            ₹
          </div>
        </div>

        <h2 className="brand-title" style={{ marginBottom: "12px" }}>
          Today's Revenue
        </h2>

        {loading ? (
          <div
            className="loading-spinner"
            style={{
              width: "48px",
              height: "48px",
              margin: "40px auto",
              border: "5px solid #e0e0ff",
              borderTopColor: "#667eea",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
            aria-label="Loading"
          />
        ) : (
          <p
            className="display-2 fw-bold"
            style={{ color: "#121212", letterSpacing: 2, margin: 0, userSelect: "text" }}
          >
            {formattedRevenue}
          </p>
        )}

        <div className="developer-credit" style={{ marginTop: "40px", color: "#666" }}>
          Designed & Developed by{" "}
          <strong
            style={{
              backgroundImage: "linear-gradient(45deg, #667eea, #764ba2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "700",
            }}
          >
            SiliconSavants
          </strong>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Revenue;
