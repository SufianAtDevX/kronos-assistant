import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { getSocialAccounts } from "../api";

export default function Dashboard() {
  const { user, doLogout } = useContext(AuthContext);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await getSocialAccounts();
        setAccounts(res.data);
      } catch {
        doLogout();
      }
    }
    load();
  }, [doLogout]);

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl mb-4">Welcome, {user}!</h1>
      <button
        onClick={doLogout}
        className="mb-4 px-4 py-2 bg-red-600 rounded"
      >
        Logout
      </button>
      <h2 className="text-xl mb-2">Your Social Accounts</h2>
      {accounts.length === 0 ? (
        <p>No accounts yet.</p>
      ) : (
        <ul className="list-disc pl-6">
          {accounts.map((a) => (
            <li key={a.id}>
              {a.platform}: {a.handle}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}