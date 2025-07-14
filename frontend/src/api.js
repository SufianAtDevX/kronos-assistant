// central Axios instance with Auth header
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001/api";
const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Social endpoints
export const getSocialAccounts = () => api.get("/social/accounts");
export const connectSocialAccount = (platform, handle) =>
  api.post("/social/connect", { platform, handle });
export const generateContent = (topic) =>
  api.post("/social/generate-content", { topic });
export const generateImage = (prompt) =>
  api.post("/social/generate-image", { prompt });
export const schedulePost = (payload) => api.post("/social/schedule", payload);

// Proposals endpoints
export const getPlatforms = () => api.get("/proposals/platforms");
export const connectPlatform = (name, url) =>
  api.post("/proposals/connect-platform", { name, profile_url: url });
export const findJobs = () => api.get("/proposals/find-jobs");
export const generateProposal = (job_title) =>
  api.post("/proposals/generate", { job_title });
