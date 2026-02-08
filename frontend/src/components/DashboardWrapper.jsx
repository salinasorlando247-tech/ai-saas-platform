import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import "./../styles/styles.css"; // Make sure CSS path is correct

const DashboardWrapper = () => {
  return (
    <div className="dashboard-wrapper">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default DashboardWrapper;
