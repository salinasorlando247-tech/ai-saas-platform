import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";   // Make sure file is named App.jsx
import "./App.css";             // Make sure file is named App.css

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
