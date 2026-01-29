import React from "react";
import Dashboard from "./components/Dashboard";
import "./App.css";

export default function App() {

  return (
    <div className="app-shell">

      {/* Top Navbar */}
      <header className="top-nav">
        <h2>AI Content Platform</h2>
      </header>

      {/* Body Layout */}
      <div className="app-body">

        {/* Sidebar */}
        <aside className="sidebar">
          <p>Dashboard</p>
          <p>Scheduler</p>
          <p>Analytics</p>
          <p>Billing</p>
          <p>Settings</p>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <Dashboard />
        </main>

      </div>

    </div>
  );
}
