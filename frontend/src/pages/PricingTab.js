import React from "react";
import CardSection from "../components/CardSection";

export default function PricingTab({ onCtaClick }) {
  const pricingData = [
    {
      heading: "Basic",
      price: "Free",
      bullets: [
        "Manual Content Generation",
        "Basic Proposal Generation",
        "3 Profiles",
        "Email Support"
      ],
      cta: "Get Started",
      hue: 165
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
      cta: "Upgrade to Pro",
      hue: 291
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
      hue: 338
    }
  ];

  return (
    <CardSection
      heading="Unlock Your Potential"
      subtitle="Choose the right plan to elevate your workflow"
      cardData={pricingData}
      onCtaClick={onCtaClick}
    />
  );
}