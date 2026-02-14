 // src/features/auth/auth.api.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://foodex-backend--muzamilsakhi079.replit.app/api";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // send cookies automatically
});

// Optional: attach access token (memory only)
export const setAccessToken = (token) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// -------------------
// Auth APIs
// -------------------
export const loginUser = (data) => axiosInstance.post("/auth/login", data);
export const registerUser = (data) => axiosInstance.post("/auth/register", data);
export const logoutUser = () => axiosInstance.post("/auth/logout");
export const refreshAccessToken = async () => {
  const response = await axiosInstance.post("/auth/refresh");
  // optional: update memory header if you want
  setAccessToken(response.data.accessToken);
  return response.data;
};

// ✅ NEW: Fetch current logged-in user
export const getCurrentUser = () => axiosInstance.get("/auth/user/profile");

// -------------------
// Default export axios instance
// -------------------
export default axiosInstance;
