import axios from "axios";

const api = axios.create({
  baseURL: "https://it-services-desk-6.onrender.com/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;