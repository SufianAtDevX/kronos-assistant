import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL;

const client = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" }
});

client.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("kronos_token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export const register = (u, p) => client.post("/register", { username: u, password: p });
export const login    = (u, p) => client.post("/login",    { username: u, password: p });
export const getSocialAccounts   = () => client.get("/social/accounts");
export const connectSocialAccount= (plat,handle) => client.post("/social/connect", { platform:plat, handle });
export const generateContent     = (topic) => client.post("/social/generate-content", { topic });
export const generateImage       = (prompt) => client.post("/social/generate-image", { prompt });
export const schedulePost        = (data) => client.post("/social/schedule", data);
export const getPlatforms        = () => client.get("/proposals/platforms");
export const connectPlatform     = (name,url) => client.post("/proposals/connect-platform",{ name, profile_url:url });
export const findJobs            = () => client.get("/proposals/find-jobs");
export const generateProposal    = (title) => client.post("/proposals/generate",{ job_title:title });

export default client;