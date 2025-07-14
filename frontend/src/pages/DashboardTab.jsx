import React from "react";
import CardSection from "../components/CardSection";

export default function DashboardTab({ onCtaClick }) {
  const cards = [
    {
      heading: "Social Media Automation",
      description:
        "Automate posts, captions, and scheduling across all your social channels with AI.",
      cta: "Go Social",
      hue: 210,
      ctaAction: "social-media"
    },
    {
      heading: "Proposal Intelligence",
      description:
        "Discover freelance gigs and generate tailored proposals in seconds.",
      cta: "Go Proposals",
      hue: 165,
      ctaAction: "proposals"
    }
  ];

  return (
    <CardSection
      heading="Dashboard"
      subtitle="Choose your workflow and let Kronos AI handle the heavy lifting."
      cardData={cards}
      onCtaClick={onCtaClick}
    />
  );
}