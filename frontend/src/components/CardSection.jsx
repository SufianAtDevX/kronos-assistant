import React, { useEffect, useRef } from "react";

export default function CardSection({
  heading,
  subtitle,
  cardData = [],
  onCtaClick,
}) {
  // holds one ref per card
  const cardsRef = useRef([]);

  useEffect(() => {
    // filter out any nulls (in case you re-render)
    const cards = cardsRef.current.filter(Boolean);

    // for each card, wire up pointermove + pointerleave
    cards.forEach((card) => {
      const onMove = (e) => {
        const r = card.getBoundingClientRect();
        // cursor coords inside this card
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        card.style.setProperty("--mx", `${x}px`);
        card.style.setProperty("--my", `${y}px`);
        card.style.setProperty("--mo", "1");
      };
      const onLeave = () => {
        card.style.setProperty("--mo", "0");
      };

      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", onLeave);

      // cleanup
      return () => {
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerleave", onLeave);
      };
    });
  }, [cardData]);

  return (
    <main className="main flow">
      <h1 className="main__heading">{heading}</h1>
      {subtitle && (
        <div className="text-center mb-6 text-gray-400">{subtitle}</div>
      )}

      <div className="cards__inner">
        {cardData.map((c, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="card"
            style={{ "--hue": c.hue }}
          >
            <h3 className="card__heading">{c.heading}</h3>
            {c.price && <p className="card__price">{c.price}</p>}
            {c.description && <div className="card__desc">{c.description}</div>}
            {c.bullets && (
              <ul className="card__bullets flow">
                {c.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            )}
            <button
              className="cta"
              onClick={() => onCtaClick?.(c.ctaAction)}
            >
              {c.cta}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
