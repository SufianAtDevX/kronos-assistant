import React from "react";

export default function InfoCard({ title, children, className = "" }) {
  return (
    <div className={`bg-gray-900 bg-opacity-50 border border-gray-700 rounded-lg p-6 shadow ${className}`}>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div>{children}</div>
    </div>
  );
}