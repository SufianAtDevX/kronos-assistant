import React, { useEffect, useState } from "react";
import InfoCard from "../components/InfoCard";
import { connectSocialAccount, generateContent, generateImage, schedulePost, getSocialAccounts } from "../api";

export default function SocialMediaTab() {
  const [accounts, setAccounts] = useState([]);
  const [platform, setPlatform] = useState("Facebook