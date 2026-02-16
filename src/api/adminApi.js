 import axios from "axios";

const API_URL = "/api"; // relative path for Vercel proxy

const adminAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true, // cookies still work if present
});

// Send access token from sessionStorage for admin/protected requests
adminAxios.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default adminAxios;
