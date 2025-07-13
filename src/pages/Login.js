import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";

export default function Login() {
  const { doLogin } = useContext(AuthContext);
  const [usern, setUsern] = useState("");
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");

  const submit = async e => {
    e.preventDefault();
    try {
      await doLogin(usern, pwd);
    } catch {
      setErr("Invalid credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 text-white">
      <h2 className="text-2xl mb-4">Login</h2>
      {err && <p className="text-red-500 mb-2">{err}</p>}
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
        <button className="w-full py-2 bg-green-600 rounded">
          Sign In
        </button>
      </form>
    </div>
  );
}