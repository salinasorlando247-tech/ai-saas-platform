import React from "react";
import PostQueue from "./components/PostQueue";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import PaymentTiers from "./components/PaymentTiers";
import "./styles.css";

export default function App() {
  return (
    <div className="app-container">
      <header className="header"><h1>🔥 AI Social Media Automater</h1></header>
      <main>
        <section className="queue-section"><h2>Video Queue</h2><PostQueue /></section>
        <section className="analytics-section"><h2>Analytics Dashboard</h2><AnalyticsDashboard /></section>
        <section className="payments-section"><h2>Payment Tiers</h2><PaymentTiers /></section>
      </main>
    </div>
  );
}
