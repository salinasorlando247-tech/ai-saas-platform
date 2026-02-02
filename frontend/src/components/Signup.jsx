import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return alert("Email and password required");
    }

    setLoading(true);

    try {
      await axios.post("/api/auth/signup", {
        email,
        password,
        company,
      });

      alert("Account created successfully");
      navigate("/"); // redirect to dashboard
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Create Account</h2>

      <form onSubmit={handleSignup}>
        <input
          placeholder="Company Name (optional)"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
