// src/App.jsx
import React, { useState } from "react";
import TabButton from "./components/TabButton";
import DashboardTab from "./pages/DashboardTab";
import SocialMediaTab from "./pages/SocialMediaTab";
import ProposalsTab from "./pages/ProposalsTab";
import PricingTab from "./pages/PricingTab";
import AuthComponent from "./pages/AuthComponent";
import "./index.css";

export default function App() {
  const [activeTab, setActiveTab]   = useState("dashboard");
  const [token, setToken]           = useState(localStorage.getItem("token"));
  const [username, setUsername]     = useState(localStorage.getItem("username"));

  // Colors for each tab’s glow
  const COLORS = {
    dashboard:    "rgba(0,200,255,0.8)",
    "social-media":"rgba(255,0,150,0.8)",
    proposals:    "rgba(150,0,255,0.8)",
    pricing:      "rgba(255,200,0,0.8)",
    login:        "rgba(0,255,150,0.8)",
    register:     "rgba(255,100,0,0.8)"
  };

  // Called by AuthComponent on success
  const handleAuth = ({ access_token, username }) => {
    localStorage.setItem("token", access_token);
    localStorage.setItem("username", username);
    setToken(access_token);
    setUsername(username);
    setActiveTab("dashboard");
  };

  // Logout clears data
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken(null);
    setUsername(null);
    setActiveTab("dashboard");
  };

  // If not logged in and tab is protected
  const renderProtected = () => (
    <div className="text-center py-20 text-gray-100">
      <h2 className="text-2xl font-bold mb-4">
        Please log in to access {activeTab.replace("-", " ")}.
      </h2>
      <TabButton
        tabName="login"
        activeTab={activeTab}
        onClick={setActiveTab}
        glowColor={COLORS.login}
      >
        Login
      </TabButton>
    </div>
  );

  // Main router
  const renderContent = () => {
    if (!token && ["social-media","proposals"].includes(activeTab)) {
      return renderProtected();
    }
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab onCtaClick={setActiveTab} />;
      case "social-media":
        return <SocialMediaTab />;
      case "proposals":
        return <ProposalsTab />;
      case "pricing":
        return <PricingTab onCtaClick={setActiveTab} />;
      case "login":
        return <AuthComponent onAuth={handleAuth} />;
      case "register":
        return <AuthComponent register onAuth={handleAuth} />;
      default:
        return <DashboardTab onCtaClick={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen relative bg-black flex items-center justify-center p-4 overflow-hidden">
      {/* Animated grid pattern */}
      <div className="background-pattern" />

      {/* Pulsating X overlays */}
      {["x-1","x-2","x-3","x-4"].map((cls,i) => (
        <div key={i} className={`animated-letter ${cls}`}>X</div>
      ))}

      {/* Subtle ghost logo */}
      <div className="floating-logo">
        <img
          src="http://devxhouse.com/download/kronos-logo.png"
          alt="Kronos Logo"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Glassmorphic container */}
      <div className="relative z-10 w-full max-w-7xl bg-white bg-opacity-5 backdrop-filter backdrop-blur-md rounded-3xl p-6 md:p-10 border border-white border-opacity-10 shadow-2xl">
        {/* Header with tabs + auth buttons */}
        <header className="flex flex-col md:flex-row items-center justify-between mb-8 pb-4 border-b border-white border-opacity-10">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <h1
              className="text-4xl font-extrabold text-white"
              style={{ fontFamily: "'Oswald', sans-serif", lineHeight: 1.1 }}
            >
              Kronos <span className="text-teal-300">DevX AI</span>
            </h1>
            <nav className="flex flex-wrap gap-3">
              {["dashboard","social-media","proposals","pricing"].map((tab) => (
                <TabButton
                  key={tab}
                  tabName={tab}
                  activeTab={activeTab}
                  onClick={setActiveTab}
                  glowColor={COLORS[tab]}
                >
                  {tab.replace("-", " ").replace(/\b\w/g, l=>l.toUpperCase())}
                </TabButton>
              ))}
            </nav>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-4 md:mt-0">
            {token && (
              <span className="username-glow">Welcome {username}!</span>
            )}
            {!token ? (
              <>
                <TabButton
                  tabName="login"
                  activeTab={activeTab}
                  onClick={setActiveTab}
                  glowColor={COLORS.login}
                >
                  Login
                </TabButton>
                <TabButton
                  tabName="register"
                  activeTab={activeTab}
                  onClick={setActiveTab}
                  glowColor={COLORS.register}
                >
                  Register
                </TabButton>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="btn-dynamic px-5 py-2 rounded-full bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold"
                style={{ "--btn-glow": "#ff5c8a" }}
              >
                Logout
              </button>
            )}
          </div>
        </header>

        {/* Render page */}
        <main className="min-h-[60vh]">{renderContent()}</main>
      </div>
    </div>
  );
}
