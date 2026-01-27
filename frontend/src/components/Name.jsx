import React, { useState } from "react";

export default function Name() {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    alert(`Name saved: ${name}`);
  };

  return (
    <div>
      <h2>Name</h2>
      <input placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} />
      <button onClick={handleSubmit}>Save Name</button>
    </div>
  );
}
