 import axios from "axios";

const api = axios.create({
  baseURL: "https://foodex-backend--muzamilsakhi079.replit.app/api/auth",
  withCredentials: true, // send cookies for refresh token
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper to attach accessToken automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// User login
export const userLogin = (email, password) =>
  api.post("/login", { email, password }).then((res) => {
    // Save accessToken for later requests
    localStorage.setItem("accessToken", res.data.accessToken);
    return res.data;
  });

// Admin login
export const adminLogin = (email, password) =>
  api.post("/login", { email, password }).then((res) => {
    localStorage.setItem("accessToken", res.data.accessToken);
    return res.data;
  });

// Logout
export const logout = () => {
  localStorage.removeItem("accessToken"); // remove stored token
  return api.post("/logout").then((res) => res.data);
};

export default api;
