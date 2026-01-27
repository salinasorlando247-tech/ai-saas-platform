import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard.js";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 text-center text-2xl font-bold">
        AI Content Manager
      </header>
      <main className="p-4">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
