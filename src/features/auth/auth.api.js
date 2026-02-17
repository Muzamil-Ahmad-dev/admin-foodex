 import adminAxios from "../../api/adminApi";

/* -------------------
   Admin Auth APIs
------------------- */

// Admin Register
export const adminRegisterApi = (data) =>
  adminAxios.post("/auth/register", data);

// Admin Login
export const adminLoginApi = (data) =>
  adminAxios.post("/auth/login", data);

// Admin Logout
export const adminLogoutApi = () =>
  adminAxios.post("/auth/logout");

// Fetch Admin Profile (protected)
export const adminProfileApi = () =>
  adminAxios.get("/admin/dashboard");
