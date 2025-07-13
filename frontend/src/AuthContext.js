import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem("kronos_user"));

  const doLogin = async (username, password) => {
    // We import login() lazily to avoid circular imports
    const { login } = await import("./api");
    const { data } = await login(username, password);
    localStorage.setItem("kronos_token", data.access_token);
    localStorage.setItem("kronos_user", data.username);
    setUser(data.username);
  };

  const doLogout = () => {
    localStorage.removeItem("kronos_token");
    localStorage.removeItem("kronos_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, doLogin, doLogout }}>
      {children}
    </AuthContext.Provider>
  );
}