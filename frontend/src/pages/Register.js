import React, { useState } from "react";
import { register } from "../api";

export default function Register() {
  const [usern, setUsern] = useState("");
  const [pwd, setPwd] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async e => {
    e.preventDefault();
    try {
      const { data } = await register(usern, pwd);
      setMsg(data.message);
    } catch (err) {
      setMsg(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 text-white">
      <h2 className="text-2xl mb-4">Register</h2>
      {msg && <p className="mb-2">{msg}</p>}
      <form onSubmit={submit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={usern}
          onChange={e => setUsern(e.target.value)}
          className="w-full p-2 bg-gray-800 rounded text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={pwd}
          onChange={e => setPwd(e.target.value)}
          className="w-full p-2 bg-gray-800 rounded text-white"
        />
        <button className="w-full py-2 bg-blue-600 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}