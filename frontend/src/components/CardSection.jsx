import React, { useEffect, useRef } from "react";

export default function CardSection({ heading, subtitle, cardData = [], onCtaClick }) {
  const containerRef = useRef();
  const overlayRef = useRef();
  const cardsRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const overlay = overlayRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!container || !overlay || cards.length === 0) return;

    cards.forEach((card, i) => {
      const ovCard = document.createElement("div");
      ovCard.className = "card";
      ovCard.style.setProperty("--hue", card.style.getPropertyValue("--hue"));
      const cta = document.createElement("div");
      cta.className = "cta";
      cta.textContent = card.querySelector(".cta")?.textContent || "Learn More";
      cta.setAttribute("aria-hidden", "true");
      ovCard.appendChild(cta);
      overlay.appendChild(ovCard);
    });

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const i = cards.indexOf(entry.target);
        overlay.children[i].style.width = `${entry.contentRect.width}px`;
        overlay.children[i].style.height = `${entry.contentRect.height}px`;
      });
    });
    cards.forEach(card => resizeObserver.observe(card));

    const applyMask = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      container.style.setProperty("--x", `${x}px`);
      container.style.setProperty("--y", `${y}px`);
      container.style.setProperty("--opacity", "1");
    };
    const clearMask = () => container.style.setProperty("--opacity", "0");

    container.addEventListener("pointermove", applyMask);
    container.addEventListener("pointerleave", clearMask);

    return () => {
      resizeObserver.disconnect();
      container.removeEventListener("pointermove", applyMask);
      container.removeEventListener("pointerleave", clearMask);
    };
  }, []);

  return (
    <main className="main flow">
      <h1 className="main__heading">{heading}</h1>
      {subtitle && <p className="text-center text-gray-400 mb-6">{subtitle}</p>}

      <div className="cards" ref={containerRef}>
        <div className="cards__inner">
          {cardData.map((card, i) => (
            <div
              key={i}
              className="card"
              ref={(el) => (cardsRef.current[i] = el)}
              style={{ "--hue": card.hue }}
            >
              <h3 className="card__heading">{card.heading}</h3>
              {card.price && <p className="card__price">{card.price}</p>}
              {card.description && <p className="text-gray-300">{card.description}</p>}
              {card.bullets && (
                <ul className="card__bullets flow">
                  {card.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              )}
              <button className="cta" onClick={() => onCtaClick?.(card.ctaAction)}>
                {card.cta}
              </button>
            </div>
          ))}
        </div>
        <div className="overlay cards__inner" ref={overlayRef}></div>
      </div>
    </main>
  );
}