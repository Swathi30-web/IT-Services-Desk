import axios from "axios";

const getBaseURL = () => {
  // Production environment
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_API_URL || "https://it-services-desk-6.onrender.com/api";
  }
  // Development environment
  return import.meta.env.VITE_API_URL || "http://localhost:3000";
};

const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;