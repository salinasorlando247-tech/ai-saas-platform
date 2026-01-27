import React, { useState } from "react";

export default function Industry() {
  const [industry, setIndustry] = useState("");

  const handleSelect = () => {
    alert(`Industry selected: ${industry}`);
  };

  return (
    <div>
      <h2>Industry</h2>
      <input
        placeholder="Enter industry"
        value={industry}
        onChange={e => setIndustry(e.target.value)}
      />
      <button onClick={handleSelect}>Select Industry</button>
    </div>
  );
}
