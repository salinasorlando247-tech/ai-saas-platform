import React, { useEffect, useState } from "react";

export default function ClientList() {
  const [clients, setClients] = useState({});

  const fetchClients = async () => {
    const res = await fetch("http://localhost:5000/clients");
    const data = await res.json();
    setClients(data);
  };

  const handleDelete = async (name) => {
    if (!window.confirm(`Delete ${name}?`)) return;
    await fetch(`http://localhost:5000/clients/${name}`, { method: "DELETE" });
    fetchClients();
  };

  useEffect(() => { fetchClients(); }, []);

  return (
    <div>
      <h3>Clients</h3>
      {Object.keys(clients).length === 0 ? (
        <p>No clients yet.</p>
      ) : (
        <ul>
          {Object.keys(clients).map((name) => (
            <li key={name}>
              {name} ({clients[name].industry})
              <button onClick={() => handleDelete(name)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
