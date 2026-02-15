 import adminAxios from "../auth/auth.api.js";

/* ============================
   PUBLIC
============================ */

// Fetch all categories (public)
export const fetchCategories = async () => {
  const res = await adminAxios.get("/categories");
  return res.data.data;
};

// Fetch category by slug (public)
export const fetchCategoryBySlug = async (slug) => {
  const res = await adminAxios.get(`/categories/${slug}`);
  return res.data.data;
};

/* ============================
   ADMIN ONLY
============================ */

// Create category
export const createCategory = async (data) => {
  const res = await adminAxios.post("/categories", data);
  return res.data.data;
};

// Update category
export const updateCategory = async (id, data) => {
  const res = await adminAxios.put(`/categories/${id}`, data);
  return res.data.data;
};

// Delete category
export const deleteCategory = async (id) => {
  const res = await adminAxios.delete(`/categories/${id}`);
  return res.data;
};
