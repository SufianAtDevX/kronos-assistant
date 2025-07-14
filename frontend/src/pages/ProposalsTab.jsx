import React, { useEffect, useState } from "react";
import CardSection from "../components/CardSection";
import {
  getPlatforms,
  connectPlatform,
  findJobs,
  generateProposal
} from "../api";

export default function ProposalsTab() {
  const [platforms, setPlatforms] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [proposal, setProposal] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    Promise.all([getPlatforms(), findJobs()])
      .then(([pRes, jRes]) => {
        setPlatforms(pRes.data);
        setJobs(jRes.data);
      })
      .catch(() => setMsg("Failed to load data"));
  }, []);

  const handleCtaClick = async (action, payload) => {
    setMsg("");
    try {
      if (action === "connect-platform") {
        const name = prompt("Platform name?");
        const url = prompt("Profile URL?");
        if (!name || !url) throw new Error("Cancelled");
        const { data } = await connectPlatform(name, url);
        setPlatforms((p) => [...p, data]);
        setMsg("Platform connected");
      }
      if (action === "generate-proposal") {
        const { data } = await generateProposal(payload);
        setProposal(data.proposal_text);
        setMsg("Proposal ready");
      }
    } catch (err) {
      setMsg(err.message || "Failed");
    }
  };

  const cards = [
    {
      heading: "Connect Platform",
      description:
        "Link your Upwork, Fiverr or Guru profile for auto proposals.",
      cta: "Connect",
      hue: 210,
      ctaAction: "connect-platform"
    },
    {
      heading: "Find Jobs",
      description: (
        <ul className="text-gray-300 list-disc list-inside space-y-1">
          {jobs.map((j) => (
            <li key={j.id}>
              {j.title} – <em>{j.platform_name}</em>
            </li>
          ))}
        </ul>
      ),
      cta: "Generate Proposal",
      hue: 291,
      ctaAction: "generate-proposal"
    },
    {
      heading: "Your Proposal",
      description: (
        <textarea
          readOnly
          value={proposal}
          placeholder="Generated proposal appears here…"
          className="w-full h-32 p-2 bg-gray-800 rounded text-gray-200"
        />
      ),
      cta: "Copy",
      hue: 165,
      ctaAction: "copy-proposal"
    }
  ];

  return (
    <>
      {msg && <p className="text-center p-2 bg-gray-700 rounded mb-4">{msg}</p>}
      <CardSection
        heading="Proposals Protocol"
        subtitle="Connect, discover jobs & pitch with AI accuracy"
        cardData={cards}
        onCtaClick={(action) => {
          // pass job title for proposal generation
          if (action === "generate-proposal" && jobs[0]) {
            handleCtaClick(action, jobs[0].title);
          } else {
            handleCtaClick(action);
          }
        }}
      />
    </>
  );
}