import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// import Dashboard from "./pages/Dashboard"; // Dashboard page
import AddSales from "./pages/AddSales"; // AddSales page
import TopSales from "./pages/TopSales"; // TopSales page
import Revenue from "./pages/Revenue"; // Revenue page
import Login from "./pages/Login"; // Login page
import Register from "./pages/Register"; // Register page
import HeaderComponent from "./components/HeaderComponent";


function App() {
  return (
    <BrowserRouter>
      <HeaderComponent />
      <Routes>
        {/* Redirect to the login route when visiting the root path */}
        <Route path="/" element={<Navigate to="/api/auth/login" />} />
        <Route exact path="/api/auth/register" element={<Register />} />
        <Route exact path="/api/auth/login" element={<Login />} />
        <Route exact path="/api/user/add-sales" element={<AddSales />} />
        <Route exact path="/api/user/top-sales" element={<TopSales />} />
        <Route exact path="/api/user/total-revenue" element={<Revenue />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
