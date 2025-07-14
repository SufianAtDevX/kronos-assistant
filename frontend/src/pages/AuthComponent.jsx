import React, { useState } from "react";

const API = process.env.REACT_APP_API_URL || "http://localhost:5001/api";

export default function AuthComponent({ register, onAuth }) {
  const [usern, setUsern] = useState("");
  const [pwd, setPwd] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await fetch(`${API}/${register ? "register" : "login"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: usern, password: pwd })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.msg || "Failed");
      if (!register) {
        onAuth({ access_token: data.access_token, username: data.username });
      } else {
        setMsg("Registered! Please login.");
      }
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-900 rounded-xl text-white space-y-4">
      <h2 className="text-2xl font-bold">{register ? "Register" : "Login"}</h2>
      <form onSubmit={submit} className="space-y-3">
        <input
          type="text" value={usern}
          onChange={e => setUsern(e.target.value)}
          placeholder="Username"
          className="w-full p-2 bg-gray-800 rounded"
        />
        <input
          type="password" value={pwd}
          onChange={e => setPwd(e.target.value)}
          placeholder="Password"
          className="w-full p-2 bg-gray-800 rounded"
        />
        <button className="btn-dynamic w-full py-2" style={{ "--btn-glow": "#00ff6a" }}>
          {register ? "Register" : "Login"}
        </button>
      </form>
      {msg && <div className="text-red-400">{msg}</div>}
    </div>
  );
}