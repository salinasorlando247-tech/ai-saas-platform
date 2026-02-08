import React from "react";

export default function TopBar({ user, setUser }) {
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <div className="topbar">
      <h1>AI Dashboard</h1>
      <div className="user-info">
        <span>{user.username}</span>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
