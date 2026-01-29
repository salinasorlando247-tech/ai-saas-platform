import React from "react";
import AIEditor from "./AIEditor.jsx";
import PostQueue from "./PostQueue.jsx";
import Analytics from "./Analytics.jsx";
import Payments from "./Payments.jsx";
import "./App.css";

export default function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>AI Social Media Automater</h1>
      </header>

      <main className="app-main">
        <section className="left-panel">
          <AIEditor />
          <PostQueue />
          <Payments />
        </section>
        <section className="right-panel">
          <Analytics />
        </section>
      </main>

      <footer className="app-footer">
        <p>© 2026 Your Company — All Rights Reserved</p>
      </footer>
    </div>
  );
}
