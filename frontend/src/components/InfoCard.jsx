import React, { useEffect, useRef } from "react";

export default function InfoCard({ title, children, className = "" }) {
  const ref = useRef();

  useEffect(() => {
    const card = ref.current;
    if (!card) return;

    const onMove = (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
      card.style.setProperty("--mo", "1");
    };
    const onLeave = () => {
      card.style.setProperty("--mo", "0");
    };

    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", onLeave);
    return () => {
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={`info-card ${className}`}>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div>{children}</div>
    </div>
  );
}
