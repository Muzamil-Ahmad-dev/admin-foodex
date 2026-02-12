 // src/features/auth/auth.api.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // send cookies automatically
});

// Request interceptor to attach access token
export const setAccessToken = (token) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// Auth APIs
export const loginUser = (data) => axiosInstance.post("/auth/login", data);
export const registerUser = (data) => axiosInstance.post("/auth/register", data);
export const logoutUser = () => axiosInstance.post("/auth/logout");
export const refreshAccessToken = async () => {
  const response = await axiosInstance.post("/auth/refresh");
  setAccessToken(response.data.accessToken); // update in memory
  return response.data;
};

export default axiosInstance;
