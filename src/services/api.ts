import axios from "axios";

const api = axios.create({
  baseURL: "https://6h903gf6-3000.use2.devtunnels.ms",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
