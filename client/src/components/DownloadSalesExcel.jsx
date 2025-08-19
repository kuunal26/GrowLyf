// DownloadSalesExcel.jsx
import React, { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { API_BASE_URL } from "../config/config";

const DownloadSalesExcel = () => {
  const [loading, setLoading] = useState(false);

  const downloadExcel = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/user/sales-history?limit=10000`);
      const sales = response.data.salesHistory;

      if (!sales || sales.length === 0) {
        alert("No sales data available to download.");
        setLoading(false);
        return;
      }

      const worksheetData = sales.map((sale, idx) => ({
        "#": idx + 1,
        "Sales ID": sale.salesId,
        Product: sale.product,
        Quantity: sale.quantity,
        "Total Amount (₹)": sale.totalAmount,
        Date: new Date(sale.date).toLocaleString(),
      }));

      const worksheet = XLSX.utils.json_to_sheet(worksheetData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "SalesHistory");

      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
      saveAs(blob, "sales_history.xlsx");
    } catch (error) {
      alert("Failed to download sales history. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={downloadExcel} disabled={loading} className="btn btn-primary">
      {loading ? "Preparing file..." : "Download Sales History Excel"}
    </button>
  );
};

export default DownloadSalesExcel;
