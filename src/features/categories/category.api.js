 import axios from "axios";

const BASE_URL = "https://foodex-backend--muzamilsakhi079.replit.app/api";

// ✅ Axios instance with cookies
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // browser automatically sends cookies
});

// ---------------------------
// Fetch all categories (public)
export const fetchCategories = async () => {
  try {
    const res = await api.get("/categories");
    return res.data.data;
  } catch (err) {
    console.error("Fetch categories error:", err.response?.data?.message || err.message);
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
    console.error("Create category error:", err.response?.data?.message || err.message);
    throw err;
  }
};

// ---------------------------
// Update category (admin only)
export const updateCategory = async (id, categoryData) => {
  try {
    const res = await api.put(`/categories/${id}`, categoryData);
    return res.data.data;
  } catch (err) {
    console.error("Update category error:", err.response?.data?.message || err.message);
    throw err;
  }
};

// ---------------------------
// Delete category (admin only)
export const deleteCategory = async (id) => {
  try {
    const res = await api.delete(`/categories/${id}`);
    return res.data;
  } catch (err) {
    console.error("Delete category error:", err.response?.data?.message || err.message);
    throw err;
  }
};

export default api;
