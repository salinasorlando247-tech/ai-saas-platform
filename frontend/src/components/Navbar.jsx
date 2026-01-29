import React from "react";

function Navbar() {
  return (
    <nav className="navbar">
      <h1>AI Social Media Automater</h1>
      <ul className="nav-links">
        <li><a href="#dashboard">Dashboard</a></li>
        <li><a href="#editor">Video Editor</a></li>
        <li><a href="#payments">Payments</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
