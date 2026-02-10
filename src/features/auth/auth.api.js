 const BASE_URL = import.meta.env.VITE_API_URL || "https://foodex-backend--muzamilsakhi079.replit.app/api/auth";

// User API
export const registerUser = async (name, email, password) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return res.json();
};

export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

// Admin API
export const loginAdmin = async (email, password) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

// Protected requests
export const getUserProfile = async (token) => {
  const res = await fetch(`${BASE_URL}/user/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const getAdminDashboard = async (token) => {
  const res = await fetch(`${BASE_URL}/admin/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};
