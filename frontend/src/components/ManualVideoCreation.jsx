// src/components/ManualVideoCreation.jsx
import React from "react";

const ManualVideoCreation = ({ onClick }) => {
  return (
    <div className="component-card">
      <h3>Manual Video Creation</h3>
      <input type="text" placeholder="Enter video idea" />
      <button onClick={onClick}>Create Video</button>
    </div>
  );
};

export default ManualVideoCreation;
