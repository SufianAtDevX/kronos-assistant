import React from "react";

export default function TabButton({
  tabName,
  activeTab,
  onClick,
  glowColor,
  children
}) {
  const isActive = tabName === activeTab;
  return (
    <button
      onClick={() => onClick(tabName)}
      style={{ "--btn-glow": glowColor }}
      className={[
        "btn-dynamic px-5 py-2 rounded-full font-semibold transition-all duration-200",
        isActive
          ? "bg-gradient-to-r from-white via-gray-200 to-white text-black shadow-lg scale-105"
          : "bg-white bg-opacity-10 text-gray-400 hover:bg-opacity-20 hover:text-white"
      ].join(" ")}
    >
      {children}
    </button>
  );
}
