import React, { useState } from "react";
import CardSection from "../components/CardSection";
import {
  getSocialAccounts,
  connectSocialAccount,
  generateContent,
  generateImage,
  schedulePost
} from "../api";

export default function SocialMediaTab() {
  const [accounts, setAccounts] = useState([]);
  const [topic, setTopic] = useState("");
  const [generated, setGenerated] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [msg, setMsg] = useState("");

  // Load accounts once
  React.useEffect(() => {
    getSocialAccounts()
      .then(({ data }) => setAccounts(data))
      .catch(() => setMsg("Unable to load accounts"));
  }, []);

  // Handle card CTA clicks
  const handleCtaClick = async (action) => {
    setMsg("");
    try {
      if (action === "connect") {
        // stub: open a modal or prompt
        const platform = prompt("Platform name?");
        const handle = prompt("Your handle?");
        if (!platform || !handle) throw new Error("Cancelled");
        const { data } = await connectSocialAccount(platform, handle);
        setAccounts((a) => [...a, data]);
        setMsg("Account connected");
      }
      if (action === "generate-text") {
        const { data } = await generateContent(topic);
        setGenerated(data);
        setMsg("Text generated");
      }
      if (action === "generate-image" && generated) {
        const { data } = await generateImage(generated.image_prompt);
        setImageUrl(data.image_url);
        setMsg("Image generated");
      }
      if (action === "schedule-post" && generated) {
        if (!accounts.length) throw new Error("Connect an account first");
        await schedulePost({
          content: generated.caption,
          hashtags: generated.hashtags,
          image_url: imageUrl,
          post_time: new Date(scheduleTime).toISOString(),
          account_id: accounts[0].id
        });
        setMsg("Post scheduled");
      }
    } catch (err) {
      setMsg(err.message || "Action failed");
    }
  };

  const cards = [
    {
      heading: "Connect Account",
      description:
        "Link your Facebook, Instagram, LinkedIn, or Twitter handle.",
      cta: "Connect",
      hue: 210,
      ctaAction: "connect"
    },
    {
      heading: "Generate Text",
      description:
        <>
          <input
            type="text"
            placeholder="Enter topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full mb-2 p-2 bg-gray-800 rounded text-white"
          />
        </>,
      cta: "Generate Text",
      hue: 291,
      ctaAction: "generate-text"
    },
    {
      heading: "Generate Image",
      description:
        generated
          ? <p className="text-gray-300">Prompt: "{generated.image_prompt}"</p>
          : <p className="text-gray-500">Generate text first</p>,
      cta: "Generate Image",
      hue: 338,
      ctaAction: "generate-image"
    },
    {
      heading: "Schedule Post",
      description:
        <>
          <input
            type="datetime-local"
            value={scheduleTime}
            onChange={(e) => setScheduleTime(e.target.value)}
            className="w-full mb-2 p-2 bg-gray-800 rounded text-white"
          />
          {generated && imageUrl && (
            <img src={imageUrl} alt="" className="w-full rounded mb-2" />
          )}
        </>,
      cta: "Schedule",
      hue: 165,
      ctaAction: "schedule-post"
    }
  ];

  return (
    <>
      {msg && <p className="text-center p-2 bg-gray-700 rounded mb-4">{msg}</p>}
      <CardSection
        heading="Social Media Matrix"
        subtitle="Connect, generate content & schedule with AI-powered ease"
        cardData={cards}
        onCtaClick={handleCtaClick}
      />
    </>
  );
}