 import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://foodex-backend--muzamilsakhi079.replit.app/api";

// Admin axios instance
const adminAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true, // REQUIRED for httpOnly cookies
});

/* ======================
   ADMIN AUTH APIs
====================== */

// Admin Register (role enforced in frontend + backend)
export const adminRegisterApi = (data) =>
  adminAxios.post("/auth/register", {
    ...data,
    role: "admin", // hard-enforced
  });

// Admin Login
export const adminLoginApi = (data) =>
  adminAxios.post("/auth/login", data);

// Admin Logout
export const adminLogoutApi = () =>
  adminAxios.post("/auth/logout");
 

// Admin Profile (protected)
export const adminProfileApi = () =>
  adminAxios.get("/admin/dashboard");

export default adminAxios;
