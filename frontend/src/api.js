import axios from "axios";

// Centralized Axios instance
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // picks from .env or Vercel config
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
