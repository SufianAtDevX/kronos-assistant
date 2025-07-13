import React from "react";

export default function InfoCard({ title, children, className = "" }) {
  return (
    <div
      className={`bg-white bg-opacity-5 border border-white border-opacity-10 rounded-xl p-6 shadow-lg h-full flex flex-col ${className}`}
    >
      <h3
        className="text-xl font-bold text-blue-300 mb-4"
        style={{ fontFamily: "'Oswald', sans-serif" }}
      >
        {title}
      </h3>
      <div className="flex-grow overflow-y-auto">{children}</div>
    </div>
  );
}