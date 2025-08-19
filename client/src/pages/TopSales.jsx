import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { API_BASE_URL } from "../config/config";
import SweetAlert from "sweetalert2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import DownloadSalesExcel from "../components/DownloadSalesExcel";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TopSales = () => {
  const [topSales, setTopSales] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    async function fetchTopSales() {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/user/top-sales`);
        setTopSales(response.data.topSales);

        const labels = response.data.topSales.map((sale) => sale.product);
        const amounts = response.data.topSales.map((sale) => sale.totalAmount);

        setChartData({
          labels,
          datasets: [
            {
              label: "Sale Amount",
               amounts,
              backgroundColor: "#667eea",
              borderRadius: 6,
            },
          ],
        });
      } catch (error) {
        console.error("Failed to fetch top sales:", error);
        SweetAlert.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to fetch top sales. Please try again.",
        });
      }
    }
    fetchTopSales();
  }, []);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Top 5 Sales Analysis",
        color: "#333",
        font: { size: 20 },
      },
      tooltip: { backgroundColor: "#667eea", titleColor: "#fff", bodyColor: "#fff" },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Sale Amount (₹)" },
        grid: { color: "#f0f0f0" },
      },
      x: {
        title: { display: true, text: "Products" },
        grid: { color: "#f0f0f0" },
      },
    },
  };

  return (
    <div className="dynamic-login-wrapper" style={{ minHeight: "auto", padding: "40px 20px" }}>
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      <div className="dynamic-register-container" style={{ maxWidth: "900px", padding: "30px 30px" }}>
        <h2 className="brand-title" style={{ textAlign: "center", marginBottom: "30px" }}>
          Top 5 Sales
        </h2>

        {/* Download Excel Button */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <DownloadSalesExcel />
        </div>

        <div className="chart-section" style={{ marginBottom: "40px" }}>
          {chartData.labels && chartData.labels.length > 0 ? (
            <Bar data={chartData} options={chartOptions} />
          ) : (
            <p style={{ textAlign: "center" }}>Loading chart...</p>
          )}
        </div>

        <div className="table-responsive">
          <table
            className="table table-striped table-hover align-middle text-center"
            style={{ background: "#fff", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
          >
            <thead style={{ background: "#667eea", color: "#fff" }}>
              <tr>
                <th>#</th>
                <th>Sales ID</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Sale Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {topSales.map((sale, index) => (
                <tr key={index} style={{ fontWeight: "600" }}>
                  <td>{index + 1}</td>
                  <td>{sale.salesId}</td>
                  <td>{sale.product}</td>
                  <td>{sale.quantity}</td>
                  <td>{sale.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          className="developer-credit"
          style={{ marginTop: "30px", textAlign: "center", color: "#666" }}
        >
          Designed & Developed by{" "}
          <strong
            style={{
              background: "linear-gradient(45deg, #667eea, #764ba2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            SiliconSavants
          </strong>
        </div>
      </div>
    </div>
  );
};

export default TopSales;
