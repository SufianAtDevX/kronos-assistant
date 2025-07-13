import React from "react";
import InfoCard from "../components/InfoCard";

export default function Dashboard({ onCtaClick }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <InfoCard title="Digital Presence Orchestration">
        <p className="mb-4 text-gray-300">
          Automate content creation, scheduling, and posting across all your social media platforms.
        </p>
        <button
          onClick={() => onCtaClick("social-media")}
          className="px-4 py-2 bg-blue-600 rounded text-white"
        >
          Engage Social Media
        </button>
      </InfoCard>

      <InfoCard title="Strategic Proposal Deployment">
        <p className="mb-4 text-gray-300">
          Find matching jobs on freelance platforms and generate tailored proposals with AI.
        </p>
        <button
          onClick={() => onCtaClick("proposals")}
          className="px-4 py-2 bg-green-600 rounded text-white"
        >
          Initiate Proposals
        </button>
      </InfoCard>
    </div>
  );
}