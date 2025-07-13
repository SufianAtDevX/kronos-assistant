import React, { useEffect, useState } from "react";
import InfoCard from "../components/InfoCard";
import {
  getSocialAccounts,
  connectSocialAccount,
  generateContent,
  generateImage,
  schedulePost,
} from "../api";

export default function SocialMediaTab() {
  const [accounts, setAccounts] = useState([]);
  const [platform, setPlatform] = useState("Facebook");    // <-- closed quote!
  const [handle, setHandle] = useState("");
  const [topic, setTopic] = useState("");
  const [generated, setGenerated] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getSocialAccounts()
      .then(({ data }) => setAccounts(data))
      .catch(() => setMessage("Error fetching accounts"));
  }, []);

  const onConnect = async (e) => {
    e.preventDefault();
    try {
      const { data } = await connectSocialAccount(platform, handle);
      setAccounts((a) => [...a, data]);
      setHandle("");
      setMessage("Account connected!");
    } catch {
      setMessage("Connection failed");
    }
  };

  const onGenerateText = async (e) => {
    e.preventDefault();
    try {
      const { data } = await generateContent(topic);
      setGenerated(data);
      setMessage("Content generated!");
    } catch {
      setMessage("Generation failed");
    }
  };

  const onGenerateImage = async () => {
    if (!generated?.image_prompt) return setMessage("Generate text first");
    try {
      const { data } = await generateImage(generated.image_prompt);
      setImgUrl(data.image_url);
      setMessage("Image ready!");
    } catch {
      setMessage("Image generation failed");
    }
  };

  const onSchedule = async (e) => {
    e.preventDefault();
    if (!generated) return setMessage("No content to schedule");
    try {
      await schedulePost({
        content: generated.caption,
        hashtags: generated.hashtags,
        image_url: imgUrl,
        post_time: new Date(scheduleTime).toISOString(),
        account_id: accounts[0]?.id,
      });
      setMessage("Post scheduled!");
    } catch {
      setMessage("Scheduling failed");
    }
  };

  return (
    <div className="space-y-8 text-white">
      {message && <p className="bg-gray-700 p-2 rounded">{message}</p>}

      <InfoCard title="1. Connect Accounts">
        <ul className="space-y-2 mb-4">
          {accounts.length
            ? accounts.map((a) => (
                <li key={a.id}>
                  {a.platform}: @{a.handle}
                </li>
              ))
            : <li>No accounts connected.</li>}
        </ul>
        <form onSubmit={onConnect} className="space-y-2">
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded"
          >
            <option>Facebook</option>
            <option>Instagram</option>
            <option>LinkedIn</option>
            <option>Twitter</option>
          </select>
          <input
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="@handle"
            className="w-full p-2 bg-gray-800 rounded"
          />
          <button className="w-full py-2 bg-blue-600 rounded">Connect</button>
        </form>
      </InfoCard>

      <InfoCard title="2. Generate Content">
        <form onSubmit={onGenerateText} className="space-y-2">
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Post topic..."
            className="w-full p-2 bg-gray-800 rounded"
          />
          <button className="w-full py-2 bg-purple-600 rounded">
            Generate Text
          </button>
        </form>
        {generated && (
          <div className="mt-4 space-y-2">
            <p><strong>Caption:</strong> {generated.caption}</p>
            <p><strong>Hashtags:</strong> {generated.hashtags}</p>
            <button
              onClick={onGenerateImage}
              className="w-full py-2 bg-pink-600 rounded"
            >
              Generate Image
            </button>
          </div>
        )}
      </InfoCard>

      <InfoCard title="3. Schedule Post">
        <form onSubmit={onSchedule} className="space-y-2">
          <input
            type="datetime-local"
            value={scheduleTime}
            onChange={(e) => setScheduleTime(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded"
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