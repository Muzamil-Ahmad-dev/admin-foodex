 // src/features/categories/categories.api.js
import adminAxios from "../auth/auth.api.js"; // <- reuse the admin axios instance

// ---------------------------
// PUBLIC API (no auth required)
export const fetchCategories = async () => {
  try {
    const res = await adminAxios.get("/categories"); // still works for public
    return res.data.data;
  } catch (err) {
    console.error("Fetch categories error:", err.response?.data?.message || err.message);
    throw err;
  }
};

// ---------------------------
// ADMIN-ONLY API
export const createCategory = async (categoryData) => {
  try {
    const res = await adminAxios.post("/categories", categoryData);
    return res.data.data;
  } catch (err) {
    console.error("Create category error:", err.response?.data?.message || err.message);
    throw err;
  }
};

export const updateCategory = async (id, categoryData) => {
  try {
    const res = await adminAxios.put(`/categories/${id}`, categoryData);
    return res.data.data;
  } catch (err) {
    console.error("Update category error:", err.response?.data?.message || err.message);
    throw err;
  }
};

export const deleteCategory = async (id) => {
  try {
    const res = await adminAxios.delete(`/categories/${id}`);
    return res.data;
  } catch (err) {
    console.error("Delete category error:", err.response?.data?.message || err.message);
    throw err;
  }
};
