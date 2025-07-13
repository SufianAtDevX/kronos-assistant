import React, { useEffect, useState } from "react";
import InfoCard from "../components/InfoCard";
import {
  getPlatforms,
  connectPlatform,
  findJobs,
  generateProposal
} from "../api";

export default function ProposalsTab() {
  const [platforms, setPlatforms] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [newName, setNewName] = useState("Upwork");
  const [newUrl, setNewUrl] = useState("");
  const [proposal, setProposal] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    Promise.all([getPlatforms(), findJobs()])
      .then(([pRes, jRes]) => {
        setPlatforms(pRes.data);
        setJobs(jRes.data);
      })
      .catch(() => setMsg("Fetch error"));
  }, []);

  const onAdd = async e => {
    e.preventDefault();
    try {
      const { data } = await connectPlatform(newName, newUrl);
      setPlatforms(prev => [...prev, data]);
      setNewUrl("");
      setMsg("Platform added");
    } catch {
      setMsg("Add failed");
    }
  };

  const onGenerate = async title => {
    try {
      const { data } = await generateProposal(title);
      setProposal(data.proposal_text);
      setMsg("Proposal ready");
    } catch {
      setMsg("Generation failed");
    }
  };

  return (
    <div className="space-y-8">
      {msg && <p className="bg-gray-700 p-2 rounded">{msg}</p>}

      <InfoCard title="1. Connect Platforms">
        <form onSubmit={onAdd} className="space-y-2">
          <select
            value={newName}
            onChange={e => setNewName(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded text-white"
          >
            <option>Fiverr</option>
            <option>Guru</option>
            <option>Upwork</option>
          </select>
          <input
            type="url"
            value={newUrl}
            onChange={e => setNewUrl(e.target.value)}
            placeholder="Profile URL"
            className="w-full p-2 bg-gray-800 rounded text-white"
          />
          <button className="w-full py-2 bg-blue-600 rounded">
            Connect
          </button>
        </form>
        <ul className="mt-4 list-disc list-inside">
          {platforms.length
            ? platforms.map(p => (
                <li key={p.id}>
                  <a
                    href={p.profile_url}
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-blue-300"
                  >
                    {p.name}
                  </a>
                </li>
              ))
            : <li>No platforms connected.</li>}
        </ul>
      </InfoCard>

      <InfoCard title="2. Find & Match Jobs">
        <ul className="space-y-4">
          {jobs.map(job => (
            <li
              key={job.id}
              className="bg-gray-800 p-4 rounded text-gray-100"
            >
              <h4 className="font-bold">
                {job.title}{" "}
                <span className="text-xs bg-green-600 px-2 rounded">
                  {job.platform_name}
                </span>
              </h4>
              <p className="text-gray-400">{job.description}</p>
              <button
                onClick={() => onGenerate(job.title)}
                className="mt-2 py-1 w-full bg-purple-600 rounded text-white"
              >
                Generate Proposal
              </button>
            </li>
          ))}
        </ul>
      </InfoCard>

      <InfoCard title="3. Generated Proposal">
        <textarea
          readOnly
          value={proposal}
          className="w-full p-2 bg-gray-800 text-gray-300 rounded h-40"
          placeholder="Your proposal appears here..."
        />
      </InfoCard>
    </div>
  );
}