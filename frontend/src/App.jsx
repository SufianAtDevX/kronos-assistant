import React, { useState } from "react";
import TabButton from "./components/TabButton";
import CardSection from "./components/CardSection";

// Dashboard cards
const dashboardCards = [
  {
    heading: "Social Media Automation",
    description: "AI-generated content, captions, scheduling across platforms.",
    cta: "Engage Social Media",
    hue: 210,
    ctaAction: "social-media"
  },
  {
    heading: "Proposal Intelligence",
    description: "Find jobs. Generate tailored freelance proposals instantly.",
    cta: "Initiate Proposals",
    hue: 165,
    ctaAction: "proposals"
  }
];

// Pricing cards
const pricingCards = [
  {
    heading: "Basic",
    price: "Free",
    bullets: [
      "Manual Content Generation",
      "Manual Proposal Generation",
      "3 Social Profiles",
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

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState(localStorage.getItem("username"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken(null);
    setUsername(null);
    setActiveTab("dashboard");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <CardSection
            heading="Dashboard"
            subtitle="Supercharge your digital ops with Kronos AI"
            cardData={dashboardCards}
            onCtaClick={setActiveTab}
          />
        );
      case "pricing":
        return (
          <CardSection
            heading="Unlock Your Potential"
            subtitle="Choose the right plan to elevate your workflow"
            cardData={pricingCards}
            onCtaClick={setActiveTab}
          />
        );
      case "login":
        return (
          <div className="max-w-md mx-auto text-white bg-gray-900 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Login to Kronos</h2>
            <p className="text-sm">Authentication component placeholder. Add logic here.</p>
          </div>
        );
      case "social-media":
      case "proposals":
        return (
          <div className="text-center py-20 text-gray-100">
            <h2 className="text-2xl font-bold mb-4">
              Please log in to access {activeTab.replace("-", " ")}.
            </h2>
            <TabButton tabName="login" activeTab={activeTab} onClick={setActiveTab}>
              Login
            </TabButton>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black p-4 flex items-center justify-center relative overflow-hidden font-sans">
      {/* Floating background blobs */}
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className={`animated-element element-${i}`} />
      ))}

      {/* Ghost logo */}
      <div className="floating-logo">
        <img src="http://devxhouse.com/download/kronos-logo.png" alt="Kronos Logo" />
      </div>

      {/* Main glass layout */}
      <div className="relative z-10 w-full max-w-7xl bg-white bg-opacity-5 backdrop-filter backdrop-blur-3xl rounded-3xl p-6 sm:p-10 border border-white border-opacity-10 shadow-2xl">
        <header className="flex flex-col md:flex-row items-center justify-between mb-12 pb-6 border-b border-white border-opacity-10">
          <div>
            <h1
              className="text-5xl font-extrabold text-white mb-4"
              style={{
                fontFamily: "'Oswald', sans-serif",
                lineHeight: "0.8"
              }}
            >
              <span className="text-blue-400">KR</span>
              <span className="text-blue-400">ON</span>
              <span className="text-blue-400">OS</span>
              <span
                className="block text-gray-400 text-sm mt-2"
                style={{ fontFamily: "'Saira', sans-serif" }}
              >
                DevX AI
              </span>
            </h1>

            <nav className="flex flex-wrap gap-4">
              <TabButton tabName="dashboard" activeTab={activeTab} onClick={setActiveTab}>
                Dashboard
              </TabButton>
              <TabButton tabName="social-media" activeTab={activeTab} onClick={setActiveTab}>
                Social Media
              </TabButton>
              <TabButton tabName="proposals" activeTab={activeTab} onClick={setActiveTab}>
                Proposals
              </TabButton>
              <TabButton tabName="pricing" activeTab={activeTab} onClick={setActiveTab}>
                Pricing
              </TabButton>
            </nav>
          </div>

          {/* Login/Logout button */}
          {token ? (
            <button
              onClick={logout}
              className="btn-glow px-6 py-3 mt-4 md:mt-0 rounded-full bg-gradient-to-r from-red-600 to-pink-700 text-white font-bold"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => setActiveTab("login")}
              className="btn-glow px-6 py-3 mt-4 md:mt-0 rounded-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-bold"
            >
              Login
            </button>
          )}
        </header>

        <main className="min-h-[500px]">{renderContent()}</main>
      </div>
    </div>
  );
}