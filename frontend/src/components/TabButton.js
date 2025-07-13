import React from "react";

export default function TabButton({ tabName, activeTab, onClick, children }) {
  const isActive = activeTab === tabName;
  const baseClasses =
    "px-6 py-3 rounded-full text-lg font-bold tracking-wider focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-all duration-300";
  const activeClasses =
    "bg-gradient-to-r from-blue-600 to-teal-700 text-white shadow-lg scale-105";
  const inactiveClasses =
    "bg-white bg-opacity-5 text-gray-300 border border-white border-opacity-10 hover:bg-opacity-10 hover:text-white hover:scale-105 hover:shadow-xl";

  return (
    <button
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
      onClick={() => onClick(tabName)}
      style={{ fontFamily: "'Oswald', sans-serif" }}
    >
      {children}
    </button>
  );
}