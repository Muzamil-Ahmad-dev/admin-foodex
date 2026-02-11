 // src/api/auth.api.js
import axios from "axios";

// -------------------- AXIOS INSTANCE --------------------
const api = axios.create({
  baseURL: "https://foodex-backend--muzamilsakhi079.replit.app/api/auth", // production backend
  withCredentials: true, // send cookies for auth
  headers: {
    "Content-Type": "application/json",
  },
});

// -------------------- API FUNCTIONS --------------------

// User login
export const userLogin = (email, password) =>
  api.post("/login", { email, password }).then((res) => res.data);

// Admin login (uses same endpoint as user login)
export const adminLogin = (email, password) =>
  api.post("/login", { email, password }).then((res) => res.data);

// Get admin dashboard
export const getAdminDashboard = () =>
  api.get("/admin/dashboard").then((res) => res.data);

// Logout (user or admin)
export const logout = () => api.post("/logout").then((res) => res.data);

export default api;
