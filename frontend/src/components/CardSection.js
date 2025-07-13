import React, { useRef, useEffect } from "react";

export default function CardSection({
  heading,
  subtitle,
  cardData,
  onCtaClick,
}) {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const overlay = overlayRef.current;
    if (!container || !overlay) return;

    const handleMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      overlay.style.setProperty("--opacity", "1");
      overlay.style.setProperty("--x", `${x}px`);
      overlay.style.setProperty("--y", `${y}px`);
    };
    const handleLeave = () => overlay.style.setProperty("--opacity", "0");

    container.addEventListener("pointermove", handleMove);
    container.addEventListener("pointerleave", handleLeave);
    return () => {
      container.removeEventListener("pointermove", handleMove);
      container.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return (
    <div className="cards-container">
      <h2 className="cards-heading">{heading}</h2>
      {subtitle && <p className="cards-subtitle">{subtitle}</p>}
      <div className="cards" ref={containerRef}>
        <div className="cards__inner grid auto-cols-fr gap-6">
          {cardData.map((card, i) => (
            <div
              key={i}
              className="card"
              style={{ "--hue": card.hue }}
            >
              <h3 className="card__heading">{card.heading}</h3>
              {card.price && <p className="card__price">{card.price}</p>}
              {card.description && (
                <p className="text-gray-300">{card.description}</p>
              )}
              {card.bullets && (
                <ul className="card__bullets">
                  {card.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              )}
              <button
                onClick={() => onCtaClick(card.ctaAction)}
                className="cta"
              >
                {card.cta}
              </button>
            </div>
          ))}
        </div>
        <div className="overlay cards__inner" ref={overlayRef}>
          {cardData.map((card, i) => (
            <div
              key={i}
              className="card"
              style={{ "--hue": card.hue }}
            >
              <h3 className="card__heading">{card.heading}</h3>
              {card.price && <p className="card__price">{card.price}</p>}
              {card.description && (
                <p className="text-gray-300">{card.description}</p>
              )}
              {card.bullets && (
                <ul className="card__bullets">
                  {card.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              )}
              <button
                onClick={() => onCtaClick(card.ctaAction)}
                className="cta"
              >
                {card.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}