import React from "react";
import CardSection from "../components/CardSection";

export default function PricingTab({ onCtaClick }) {
  const data = [
    {
      heading: "Basic",
      price: "Free",
      bullets: [
        "Manual Content Generation",
        "Manual Proposal Generation",
        "3 Social Profiles",
        "Email Support"
      ],
      cta: "Get Started",
      hue: 165,
      ctaAction: "social-media"
    },
    {
      heading: "Pro",
      price: "$49/mo",
      bullets: [
        "Everything in Basic",
        "Automated Scheduling",
        "AI Job Matching",
        "Priority Support"
      ],
      cta: "Upgrade",
      hue: 291,
      ctaAction: "proposals"
    },
    {
      heading: "Ultimate",
      price: "$99/mo",
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
}