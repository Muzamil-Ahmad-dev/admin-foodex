 import api from "../../utils/api";

// Fetch categories (public route)
export const fetchCategories = async () => {
  try {
    const res = await api.get("/categories");
    return res.data.data;
  } catch (err) {
    console.error("Fetch categories error:", err.response?.data?.message || err.message);
    throw err;
  }
};

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

// Delete category
export const deleteCategory = async (id) => {
  try {
    const res = await api.delete(`/categories/${id}`);
    return res.data;
  } catch (err) {
    console.error("Delete category error:", err.response?.data?.message || err.message);
    throw err;
  }
};
