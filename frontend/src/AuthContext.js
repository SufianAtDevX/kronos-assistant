import React, { createContext, useState } from "react";
import { login } from "./api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem("kronos_user") || null);

  const doLogin = async (username, password) => {
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