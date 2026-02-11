 // src/api/auth.api.js
const BASE_URL =
  import.meta.env.VITE_API_URL || "https://foodex-backend--muzamilsakhi079.replit.app/api/auth";

const request = async (endpoint, options = {}) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    credentials: "include", // REQUIRED for cookies/sessions
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

// -------------------- API FUNCTIONS --------------------
export const userLogin = (email, password) =>
  request("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const adminLogin = (email, password) =>
  request("/admin/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const getAdminDashboard = () => request("/admin/dashboard");

export const logoutAdmin = () =>
  request("/logout", { method: "POST" });
