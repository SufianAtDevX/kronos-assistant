// src/App.js
import React, { useState, useContext } from "react";
import { AuthProvider, AuthContext } from "./AuthContext";

import TabButton from "./components/TabButton";

import Dashboard from "./pages/Dashboard";
import SocialMediaTab from "./pages/SocialMediaTab";
import ProposalsTab from "./pages/ProposalsTab";
import PricingTab from "./pages/PricingTab";
import Login from "./pages/Login";
import Register from "./pages/Register";

function AppContent() {
  const { user, doLogout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Determine what to render in <main>
  let mainContent;
  if (!user && (activeTab === "social-media" || activeTab === "proposals")) {
    mainContent = (
      <div className="text-center py-20 text-gray-100">
        <h2 className="text-2xl font-bold mb-4">
          Please log in to access {activeTab.replace("-", " ")}.
        </h2>
        <TabButton
          tabName="login"
          activeTab={activeTab}
          onClick={handleTabClick}
        >
          Login
        </TabButton>
      </div>
    );
  } else {
    switch (activeTab) {
      case "dashboard":
        mainContent = <Dashboard />;
        break;
      case "social-media":
        mainContent = <SocialMediaTab />;
        break;
      case "proposals":
        mainContent = <ProposalsTab />;
        break;
      case "pricing":
        mainContent = <PricingTab onCtaClick={setActiveTab} />;
        break;
      case "login":
        mainContent = <Login />;
        break;
      case "register":
        mainContent = <Register />;
        break;
      default:
        mainContent = <Dashboard />;
    }
  }

  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col">
      <header className="flex flex-col md:flex-row items-center justify-between p-6 pb-4 border-b border-gray-700">
        <h1 className="text-4xl font-extrabold text-white mb-4 md:mb-0">
          KRONOS
        </h1>

        <nav className="flex flex-wrap gap-4">
          <TabButton
            tabName="dashboard"
            activeTab={activeTab}
            onClick={handleTabClick}
          >
            Dashboard
          </TabButton>
          <TabButton
            tabName="social-media"
            activeTab={activeTab}
            onClick={handleTabClick}
          >
            Social Media
          </TabButton>
          <TabButton
            tabName="proposals"
            activeTab={activeTab}
            onClick={handleTabClick}
          >
            Proposals
          </TabButton>
          <TabButton
            tabName="pricing"
            activeTab={activeTab}
            onClick={handleTabClick}
          >
            Pricing
          </TabButton>
          {!user && (
            <>
              <TabButton
                tabName="login"
                activeTab={activeTab}
                onClick={handleTabClick}
              >
                Login
              </TabButton>
              <TabButton
                tabName="register"
                activeTab={activeTab}
                onClick={handleTabClick}
              >
                Register
              </TabButton>
            </>
          )}
        </nav>

        {user && (
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="text-gray-300">Welcome, {user}!</span>
            <button
              onClick={doLogout}
              className="px-4 py-2 bg-red-600 rounded text-white"
            >
              Logout
            </button>
          </div>
        )}
      </header>

      <main className="flex-grow p-6">{mainContent}</main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}