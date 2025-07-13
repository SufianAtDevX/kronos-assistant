import React from "react";

export default function TabButton({ tabName, activeTab, onClick, children }) {
  const isActive = activeTab === tabName;
  return (
    <button
      onClick={() => onClick(tabName)}
      className={[
        "btn-glow px-6 py-3 rounded-full text-lg font-bold tracking-wide focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition",
        isActive
          ? "bg-gradient-to-r from-blue-600 to-teal-700 text-white shadow-lg scale-105"
          : "bg-white bg-opacity-5 text-gray-300 hover:bg-opacity-10 hover:text-white"
      ].join(" ")}
      style={{ fontFamily: "'Oswald', sans-serif" }}
    >
      {children}
    </button>
  );
}