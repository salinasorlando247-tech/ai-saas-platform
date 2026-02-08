import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import AIContent from "../pages/AIContent";
import Scheduling from "../pages/Scheduling";
import Terms from "../pages/Terms";
import Privacy from "../pages/Privacy";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/ai-videos" element={<AIContent />} />
    <Route path="/scheduling" element={<Scheduling />} />
    <Route path="/terms" element={<Terms />} />
    <Route path="/privacy" element={<Privacy />} />
  </Routes>
);

export default AppRoutes;
