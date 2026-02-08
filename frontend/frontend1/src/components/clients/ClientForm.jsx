import React, { useState } from "react";

export default function ClientForm({ onClientAdded }) {
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !industry) return alert("Fill in all fields");
    const res = await fetch("http://localhost:5000/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, industry }),
    });
    if (res.ok) {
      setName("");
      setIndustry("");
      onClientAdded();
      alert("Client added successfully");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Client</h3>
      <input
        type="text"
        placeholder="Client Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Industry"
        value={industry}
        onChange={(e) => setIndustry(e.target.value)}
      />
      <button type="submit">Add Client</button>
    </form>
  );
}
