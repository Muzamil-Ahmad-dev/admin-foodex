 // src/api/auth.api.js
import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: "https://foodex-backend--muzamilsakhi079.replit.app/api/auth", // fallback hardcoded URL
  withCredentials: true, // ✅ required for sending cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// -------------------- API FUNCTIONS --------------------

// User login
export const userLogin = (email, password) =>
  api.post("/login", { email, password }).then((res) => res.data);

// Admin login
export const adminLogin = (email, password) =>
  api.post("/admin/login", { email, password }).then((res) => res.data);

// Get admin dashboard
export const getAdminDashboard = () =>
  api.get("/admin/dashboard").then((res) => res.data);

// Logout admin
export const logoutAdmin = () =>
  api.post("/logout").then((res) => res.data);
