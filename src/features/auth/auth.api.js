 import axios from "axios";

const api = axios.create({
  baseURL: "https://foodex-backend--muzamilsakhi079.replit.app/api/auth",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ attach access token automatically for protected routes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const userLogin = (email, password) =>
  api.post("/login", { email, password }).then((res) => res.data);

export const adminLogin = (email, password) =>
  api.post("/login", { email, password }).then((res) => res.data);

export const getAdminDashboard = () =>
  api.get("/admin/dashboard").then((res) => res.data);

export const logout = () => api.post("/logout").then((res) => res.data);

export default api;
