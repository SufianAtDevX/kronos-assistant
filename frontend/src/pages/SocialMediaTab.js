import React, { useEffect, useState } from "react";
import InfoCard from "../components/InfoCard";
import {
  getSocialAccounts,
  connectSocialAccount,
  generateContent,
  generateImage,
  schedulePost
} from "../api";

export default function SocialMediaTab() {
  const [accounts, setAccounts] = useState([]);
  const [platform, setPlatform] = useState("Facebook");
  const [handle, setHandle] = useState("");
  const [topic, setTopic] = useState("");
  const [generated, setGenerated] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getSocialAccounts()
      .then(res => setAccounts(res.data))
      .catch(() => setMsg("Failed to load accounts"));
  }, []);

  const onConnect = async e => {
    e.preventDefault();
    try {
      const { data } = await connectSocialAccount(platform, handle);
      setAccounts(prev => [...prev, data]);
      setHandle("");
      setMsg("Account connected");
    } catch {
      setMsg("Connect failed");
    }
  };

  const onGenText = async e => {
    e.preventDefault();
    try {
      const { data } = await generateContent(topic);
      setGenerated(data);
      setMsg("Text generated");
    } catch {
      setMsg("Generation failed");
    }
  };

  const onGenImage = async () => {
    if (!generated?.image_prompt) return setMsg("Generate text first");
    try {
      const { data } = await generateImage(generated.image_prompt);
      setImgUrl(data.image_url);
      setMsg("Image ready");
    } catch {
      setMsg("Image failed");
    }
  };

  const onSchedule = async e => {
    e.preventDefault();
    if (!generated) return setMsg("No content to schedule");
    try {
      await schedulePost({
        content: generated.caption,
        hashtags: generated.hashtags,
        image_url: imgUrl,
        post_time: new Date(dateTime).toISOString(),
        account_id: accounts[0]?.id
      });
      setMsg("Post scheduled");
      setGenerated(null);
      setImgUrl("");
      setTopic("");
      setDateTime("");
    } catch {
      setMsg("Schedule failed");
    }
  };

  return (
    <div className="space-y-8">
      {msg && <p className="bg-gray-700 p-2 rounded">{msg}</p>}

      <InfoCard title="1. Connect Accounts">
        <form onSubmit={onConnect} className="space-y-2">
          <select
            value={platform}
            onChange={e => setPlatform(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded"
          >
            <option>Facebook</option>
            <option>Instagram</option>
            <option>LinkedIn</option>
            <option>Twitter</option>
          </select>
          <input
            type="text"
            value={handle}
            onChange={e => setHandle(e.target.value)}
            placeholder="@username"
            className="w-full p-2 bg-gray-800 rounded text-white"
          />
          <button className="w-full py-2 bg-blue-600 rounded">Connect</button>
        </form>
        <ul className="mt-4 list-disc list-inside">
          {accounts.length
            ? accounts.map(a => (
                <li key={a.id}>
                  {a.platform}: @{a.handle}
                </li>
              ))
            : <li>No accounts connected.</li>}
        </ul>
      </InfoCard>

      <InfoCard title="2. Generate Content">
        <form onSubmit={onGenText} className="space-y-2">
          <textarea
            value={topic}
            onChange={e => setTopic(e.target.value)}
            placeholder="Topic..."
            className="w-full p-2 bg-gray-800 rounded text-white"
          />
          <button className="w-full py-2 bg-purple-600 rounded">
            Generate Text
          </button>
        </form>
        {generated && (
          <div className="mt-4 space-y-2">
            <p>
              <strong>Caption:</strong> {generated.caption}
            </p>
            <p>
              <strong>Hashtags:</strong> {generated.hashtags}
            </p>
            <button
              onClick={onGenImage}
              className="w-full py-2 bg-pink-600 rounded"
            >
              Generate Image
            </button>
            {imgUrl && (
              <img
                src={imgUrl}
                alt="Generated"
                className="w-full mt-4 rounded shadow-lg"
              />
            )}
          </div>
        )}
      </InfoCard>

      <InfoCard title="3. Schedule Post">
        <form onSubmit={onSchedule} className="space-y-2">
          <input
            type="datetime-local"
            value={dateTime}
            onChange={e => setDateTime(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded text-white"
          />
          <button
            disabled={!generated}
            className="w-full py-2 bg-teal-600 rounded"
          >
            Schedule
          </button>
        </form>
      </InfoCard>
    </div>
  );
}