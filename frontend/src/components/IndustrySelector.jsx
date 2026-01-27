// src/components/IndustrySelector.jsx
import React from "react";

const IndustrySelector = ({ onClick }) => {
  return (
    <div className="component-card">
      <h3>Industry</h3>
      <select onChange={onClick}>
        <option value="">Select Industry</option>
        <option value="Fitness">Fitness</option>
        <option value="Tech">Tech</option>
        <option value="Food">Food</option>
        <option value="Fashion">Fashion</option>
      </select>
    </div>
  );
};

export default IndustrySelector;
