// src/pages/AuthComponent.jsx
import React, { useState } from "react";

export default function AuthComponent({ setToken, setUsername, setActiveTab }) {
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const endpoint = isLogin ? "/api/login" : "/api/register";
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usernameInput,
          password: passwordInput
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Authentication failed.");
      if (isLogin) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("username", data.username);
        setToken(data.access_token);
        setUsername(data.username);
        setActiveTab("dashboard");
      } else {
        setMessage("Registration successful! Please log in.");
        setIsLogin(true);
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-900 rounded-xl text-white">
      <h2 className="text-2xl mb-4 font-bold">
        {isLogin ? "Login to Kronos" : "Register for Kronos"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
          placeholder="Username"
          className="w-full p-2 bg-gray-800 rounded"
        />
        <input
          type="password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          placeholder="Password"
          className="w-full p-2 bg-gray-800 rounded"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 rounded btn-glow"
        >
          {isLogin ? "Login" : "Register"}
        </button>
        {message && <p className="text-sm text-red-400 mt-2">{message}</p>}
      </form>
      <p className="mt-4 text-gray-400">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setMessage("");
          }}
          className="ml-2 text-blue-400 underline"
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
    </div>
  );
}