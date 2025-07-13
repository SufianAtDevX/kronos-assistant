import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";

export default function Login() {
  const { doLogin } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await doLogin(username, password);
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl mb-4 text-white">Login</h2>
      {error && <p className="mb-2 text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border rounded bg-gray-800 text-white"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded bg-gray-800 text-white"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full py-2 bg-green-600 text-white rounded"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}