 import axios from "axios";

const api = axios.create({
  baseURL: "https://foodex-backend--muzamilsakhi079.replit.app/api/auth",
  withCredentials: true, // ✅ send cookies automatically
  headers: {
    "Content-Type": "application/json",
  },
});

// User login
export const userLogin = (email, password) =>
  api.post("/login", { email, password }).then((res) => res.data);

// Admin login
export const adminLogin = (email, password) =>
  api.post("/login", { email, password }).then((res) => res.data);

// Logout
export const logout = () => api.post("/logout").then((res) => res.data);

export default api;
