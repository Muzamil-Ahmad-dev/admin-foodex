 import axios from "axios";

const API_URL = "/api"; // relative path for Vercel proxy

const adminAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true, // cookie still works if possible
});

// Attach access token from memory/sessionStorage for protected requests
adminAxios.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("accessToken"); // store token in memory/sessionStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default adminAxios;
