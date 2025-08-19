import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { API_BASE_URL } from "../config/config";
import SweetAlert from "sweetalert2";
import { products } from "./ProductsList";

const AddSales = () => {
  const [product, setProduct] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [rate, setRate] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const userToken = {
    headers: {
      "Content-Type": "Application/json",
      authorization: "Bearer " + localStorage.getItem("JWTToken"),
    },
  };

  const handleAddSale = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requestData = { product, quantity, rate };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/user/add-sales`,
        requestData,
        userToken
      );

      if (response) {
        setLoading(false);
        SweetAlert.fire({
          icon: "success",
          title: "Sale Added Successfully!",
          text: `Added ${quantity} units of ${product}`,
          timer: 2000,
          showConfirmButton: false,
        });

        setProduct("");
        setSelectedProduct(null);
        setRate("");
        setQuantity("");
        setAmount("");
      }
    } catch (error) {
      setLoading(false);
      SweetAlert.fire({
        icon: "error",
        title: "Failed to Add Sale",
        text: "Please try again later",
      });
    }
  };

  const handleProductSelect = (productItem) => {
    setProduct(productItem.name);
    setSelectedProduct(productItem);
  };

  return (
    <div className="dynamic-addsales-wrapper">
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      <div className="dynamic-addsales-container">
        <div className="addsales-header">
          <div className="logo-container">
            <div className="logo-circle">
              <span>💰</span>
            </div>
          </div>
          <h1 className="brand-title">Add Sale</h1>
          <p className="brand-subtitle">Record your transaction quickly</p>
        </div>

        <form onSubmit={handleAddSale} className="dynamic-form">
          {/* Minimalistic Product Selection */}
          <div className="minimal-product-section">
            <label className="section-label">Select Product</label>
            <div className="minimal-product-grid">
              {products.map((productItem) => (
                <div
                  key={productItem.id}
                  className={`minimal-product-card ${
                    product === productItem.name ? "selected" : ""
                  }`}
                  onClick={() => handleProductSelect(productItem)}
                >
                  <img
                    src={productItem.image || "https://via.placeholder.com/120x80?text=No+Image"}
                    alt={productItem.name}
                    className="minimal-product-image"
                  />
                  <div className="minimal-product-info">
                    <h4>{productItem.name}</h4>
                    <span>{productItem.category || "General"}</span>
                  </div>
                  {product === productItem.name && (
                    <div className="minimal-check">✓</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Selected Product Display */}
          {selectedProduct && (
            <div className="selected-product-minimal">
              <img src={selectedProduct.image} alt={selectedProduct.name} />
              <span>{selectedProduct.name}</span>
            </div>
          )}

          {/* Input Fields */}
          <div className="input-row">
            <div className="floating-input-group">
              <input
                type="number"
                id="quantity"
                required
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                  setAmount(e.target.value * rate);
                }}
                className="floating-input"
                placeholder=" "
                min="1"
              />
              <label htmlFor="quantity" className="floating-label">
                Quantity
              </label>
            </div>

            <div className="floating-input-group">
              <input
                type="number"
                id="rate"
                required
                value={rate}
                onChange={(e) => {
                  setRate(e.target.value);
                  setAmount(e.target.value * quantity);
                }}
                className="floating-input"
                placeholder=" "
                min="0"
                step="0.01"
              />
              <label htmlFor="rate" className="floating-label">
                Rate (₹)
              </label>
            </div>
          </div>

          {/* Amount Display */}
          {amount && (
            <div className="minimal-amount-display">
              <span>Total: ₹{parseFloat(amount).toFixed(2)}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="dynamic-submit-btn"
            disabled={loading || !product || !quantity || !rate}
          >
            <span className="btn-content">
              {loading ? (
                <>
                  <div className="loading-spinner"></div>
                  Adding...
                </>
              ) : (
                <>
                  <span>Add Sale</span>
                  <div className="btn-arrow">+</div>
                </>
              )}
            </span>
          </button>
        </form>

        <div className="developer-credit">
          <span>Designed & Developed by </span>
          <strong>SiliconSavants</strong>
        </div>
      </div>
    </div>
  );
};

export default AddSales;
