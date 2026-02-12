 import axios from "axios";

const BASE_URL = "https://foodex-backend--muzamilsakhi079.replit.app/api";

// ✅ Create axios instance (VERY IMPORTANT)
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // 🔥 Always send cookies automatically
});

// ---------------------------
// Fetch categories
export const fetchCategories = async () => {
  try {
    const res = await api.get("/categories");
    return res.data.data;
  } catch (err) {
    console.error(
      "Fetch categories error:",
      err.response?.data?.message || err.message
    );
    throw err;
  }
};

// ---------------------------
// Create category (admin only)
export const createCategory = async (categoryData) => {
  try {
    const res = await api.post("/categories", categoryData);
    return res.data.data;
  } catch (err) {
    console.error(
      "Create category error:",
      err.response?.data?.message || err.message
    );
    throw err;
  }
};

// ---------------------------
// Delete category (optional future use)
export const deleteCategory = async (id) => {
  try {
    const res = await api.delete(`/categories/${id}`);
    return res.data;
  } catch (err) {
    console.error(
      "Delete category error:",
      err.response?.data?.message || err.message
    );
    throw err;
  }
};
