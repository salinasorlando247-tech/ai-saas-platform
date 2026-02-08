import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl mb-4">Login</h2>

        <input className="border w-full mb-2 p-2"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input className="border w-full mb-2 p-2"
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={() => login(email, password)}
          className="bg-blue-600 text-white w-full p-2">
          Login
        </button>
      </div>
    </div>
  );
}
