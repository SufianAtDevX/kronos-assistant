import axios from "axios";

const API_BASE =
  process.env.REACT_APP_API_URL ||
  "https://SufianAtDevX.pythonanywhere.com/api";

const client = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("kronos_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = (username, password) =>
  client.post("/register", { username, password });

export const login = (username, password) =>
  client.post("/login", { username, password });

export const getSocialAccounts = () => client.get("/social/accounts");
export const connectSocialAccount = (platform, handle) =>
  client.post("/social/connect", { platform, handle });
export const generateContent = (topic) =>
  client.post("/social/generate-content", { topic });
export const generateImage = (prompt) =>
  client.post("/social/generate-image", { prompt });
export const schedulePost = (payload) =>
  client.post("/social/schedule", payload);

export const getPlatforms = () => client.get("/proposals/platforms");
export const connectPlatform = (name, profile_url) =>
  client.post("/proposals/connect-platform", { name, profile_url });
export const findJobs = () => client.get("/proposals/find-jobs");
export const generateProposal = (job_title) =>
  client.post("/proposals/generate", { job_title });

export default client;