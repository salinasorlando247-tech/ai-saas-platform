// frontend/src/App.jsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuth } from "./context/AuthContext";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import VideoEditor from "./pages/VideoEditor";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import CookieConsent from "react-cookie-consent";
import { initWebSocket } from "./utils/socket";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const { user, ssoLogin } = useAuth();

  useEffect(() => {
    // Initialize WebSocket for live AI progress
    initWebSocket(user?.id);
  }, [user]);

  if (!user) {
    return <Login onSSOLogin={ssoLogin} />;
  }

  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/editor" element={<VideoEditor />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </div>

        {/* Cookie Consent for compliance */}
        <CookieConsent
          location="bottom"
          buttonText="Accept"
          cookieName="forgeaiCookieConsent"
          style={{ background: "#1f1f1f" }}
          buttonStyle={{ color: "#fff", background: "#0078d4", fontSize: "14px" }}
          expires={150}
        >
          We use cookies to improve your experience and analyze AI usage. By accepting, you agree to our Terms.
        </CookieConsent>

        <ToastContainer position="top-right" autoClose={5000} />
      </div>
    </Router>
  );
}

export default App;
