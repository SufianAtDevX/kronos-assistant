import React, { useEffect, useState } from "react";
import InfoCard from "../components/InfoCard";
import {
  getPlatforms,
  connectPlatform,
  findJobs,
<<<<<<< HEAD:src/pages/ProposalsTab.js
  generateProposal
=======
  generateProposal,
>>>>>>> 16f0b28809782d8fa2a6a0d5d536576fedd762b4:frontend/src/pages/ProposalsTab.js
} from "../api";

export default function ProposalsTab() {
  const [platforms, setPlatforms] = useState([]);
<<<<<<< HEAD:src/pages/ProposalsTab.js
  const [jobs, setJobs] = useState([]);
  const [newName, setNewName] = useState("Upwork");
  const [newUrl, setNewUrl] = useState("");
  const [proposal, setProposal] = useState("");
  const [msg, setMsg] = useState("");
=======
  const [newName, setNewName] = useState("Upwork");
  const [newUrl, setNewUrl] = useState("");
  const [jobs, setJobs] = useState([]);
  const [proposal, setProposal] = useState("");
  const [message, setMessage] = useState("");
>>>>>>> 16f0b28809782d8fa2a6a0d5d536576fedd762b4:frontend/src/pages/ProposalsTab.js

  useEffect(() => {
    Promise.all([getPlatforms(), findJobs()])
      .then(([pRes, jRes]) => {
        setPlatforms(pRes.data);
        setJobs(jRes.data);
      })
<<<<<<< HEAD:src/pages/ProposalsTab.js
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
=======
      .catch(() => setMessage("Fetch error"));
  }, []);

  const onConnect = async (e) => {
    e.preventDefault();
    try {
      const { data } = await connectPlatform(newName, newUrl);
      setPlatforms((p) => [...p, data]);
      setNewUrl("");
      setMessage("Platform added!");
    } catch {
      setMessage("Add failed");
    }
  };

  const onGenerate = async (title) => {
    try {
      const { data } = await generateProposal(title);
      setProposal(data.proposal_text);
      setMessage("Proposal ready!");
    } catch {
      setMessage("Generation failed");
>>>>>>> 16f0b28809782d8fa2a6a0d5d536576fedd762b4:frontend/src/pages/ProposalsTab.js
    }
  };

  return (
<<<<<<< HEAD:src/pages/ProposalsTab.js
    <div className="space-y-8">
      {msg && <p className="bg-gray-700 p-2 rounded">{msg}</p>}

      <InfoCard title="1. Connect Platforms">
        <form onSubmit={onAdd} className="space-y-2">
          <select
            value={newName}
            onChange={e => setNewName(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded text-white"
=======
    <div className="space-y-8 text-white">
      {message && <p className="bg-gray-700 p-2 rounded">{message}</p>}

      <InfoCard title="1. Connect Platforms">
        <ul className="space-y-2 mb-4">
          {platforms.length
            ? platforms.map((p) => (
                <li key={p.id}>
                  <a href={p.profile_url} target="_blank" rel="noreferrer">
                    {p.name}
                  </a>
                </li>
              ))
            : <li>No platforms connected.</li>}
        </ul>
        <form onSubmit={onConnect} className="space-y-2">
          <select
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded"
>>>>>>> 16f0b28809782d8fa2a6a0d5d536576fedd762b4:frontend/src/pages/ProposalsTab.js
          >
            <option>Fiverr</option>
            <option>Guru</option>
            <option>Upwork</option>
          </select>
          <input
            type="url"
            value={newUrl}
<<<<<<< HEAD:src/pages/ProposalsTab.js
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
=======
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="Profile URL"
            className="w-full p-2 bg-gray-800 rounded"
          />
          <button className="w-full py-2 bg-blue-600 rounded">Connect</button>
        </form>
>>>>>>> 16f0b28809782d8fa2a6a0d5d536576fedd762b4:frontend/src/pages/ProposalsTab.js
      </InfoCard>

      <InfoCard title="2. Find & Match Jobs">
        <ul className="space-y-4">
<<<<<<< HEAD:src/pages/ProposalsTab.js
          {jobs.map(job => (
            <li
              key={job.id}
              className="bg-gray-800 p-4 rounded text-gray-100"
            >
=======
          {jobs.map((job) => (
            <li key={job.id} className="bg-gray-800 p-3 rounded">
>>>>>>> 16f0b28809782d8fa2a6a0d5d536576fedd762b4:frontend/src/pages/ProposalsTab.js
              <h4 className="font-bold">
                {job.title}{" "}
                <span className="text-xs bg-green-600 px-2 rounded">
                  {job.platform_name}
                </span>
              </h4>
<<<<<<< HEAD:src/pages/ProposalsTab.js
              <p className="text-gray-400">{job.description}</p>
              <button
                onClick={() => onGenerate(job.title)}
                className="mt-2 py-1 w-full bg-purple-600 rounded text-white"
=======
              <p className="text-sm text-gray-400">{job.description}</p>
              <button
                onClick={() => onGenerate(job.title)}
                className="mt-2 w-full py-1 bg-purple-600 rounded"
>>>>>>> 16f0b28809782d8fa2a6a0d5d536576fedd762b4:frontend/src/pages/ProposalsTab.js
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