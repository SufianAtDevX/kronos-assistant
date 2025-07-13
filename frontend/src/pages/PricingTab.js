import React from "react";
import CardSection from "../components/CardSection";

export default function PricingTab({ onCtaClick }) {
  const data = [
    {
      heading: "Basic",
      price: "Free",
<<<<<<< HEAD:src/pages/PricingTab.js
      bullets: ["Manual Content", "Basic Proposals", "3 Profiles", "Email Support"],
      cta: "Get Started",
      hue: 165
=======
      bullets: [
        "Manual Content Generation",
        "Manual Proposal Generation",
        "3 Social Profiles",
        "Email Support"
      ],
      cta: "Get Started",
      hue: 165,
      ctaAction: "social-media"
>>>>>>> 16f0b28809782d8fa2a6a0d5d536576fedd762b4:frontend/src/pages/PricingTab.js
    },
    {
      heading: "Pro",
      price: "$49/mo",
<<<<<<< HEAD:src/pages/PricingTab.js
      bullets: ["Everything in Basic", "Auto Scheduling", "AI Matching", "Priority Support"],
      cta: "Upgrade",
      hue: 291
=======
      bullets: [
        "Everything in Basic",
        "Automated Scheduling",
        "AI Job Matching",
        "Priority Support"
      ],
      cta: "Upgrade",
      hue: 291,
      ctaAction: "proposals"
>>>>>>> 16f0b28809782d8fa2a6a0d5d536576fedd762b4:frontend/src/pages/PricingTab.js
    },
    {
      heading: "Ultimate",
      price: "$99/mo",
<<<<<<< HEAD:src/pages/PricingTab.js
      bullets: ["Everything in Pro", "Cloud Autopilot", "24/7 Premium Support"],
      cta: "Go Ultimate",
      hue: 338
    }
  ];

  return <CardSection heading="Unlock Your Potential" cardData={data} onCtaClick={onCtaClick} />;
=======
      bullets: [
        "Everything in Pro",
        "Autonomous Cloud Ops",
        "24/7 Premium Support"
      ],
      cta: "Go Ultimate",
      hue: 338,
      ctaAction: "pricing"
    }
  ];

  return (
    <CardSection
      heading="Unlock Your Potential"
      cardData={data}
      onCtaClick={onCtaClick}
    />
  );
>>>>>>> 16f0b28809782d8fa2a6a0d5d536576fedd762b4:frontend/src/pages/PricingTab.js
}