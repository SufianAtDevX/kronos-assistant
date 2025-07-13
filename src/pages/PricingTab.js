import React from "react";
import CardSection from "../components/CardSection";

export default function PricingTab({ onCtaClick }) {
  const data = [
    {
      heading: "Basic",
      price: "Free",
      bullets: ["Manual Content", "Basic Proposals", "3 Profiles", "Email Support"],
      cta: "Get Started",
      hue: 165
    },
    {
      heading: "Pro",
      price: "$49/mo",
      bullets: ["Everything in Basic", "Auto Scheduling", "AI Matching", "Priority Support"],
      cta: "Upgrade",
      hue: 291
    },
    {
      heading: "Ultimate",
      price: "$99/mo",
      bullets: ["Everything in Pro", "Cloud Autopilot", "24/7 Premium Support"],
      cta: "Go Ultimate",
      hue: 338
    }
  ];

  return <CardSection heading="Unlock Your Potential" cardData={data} onCtaClick={onCtaClick} />;
}