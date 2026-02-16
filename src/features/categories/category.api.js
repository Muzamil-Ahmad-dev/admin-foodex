 import adminAxios from "../auth/auth.api.js";

/* ============================
   PUBLIC
============================ */

export const fetchCategories = async () => {
  const res = await adminAxios.get("/categories");
  return res.data.data;
};

export const fetchCategoryBySlug = async (slug) => {
  const res = await adminAxios.get(`/categories/${slug}`);
  return res.data.data;
};

/* ============================
   ADMIN ONLY
============================ */

export const createCategory = async (data) => {
  const res = await adminAxios.post("/categories", data);
  return res.data.data;
};

export const updateCategory = async (id, data) => {
  const res = await adminAxios.put(`/categories/${id}`, data);
  return res.data.data;
};

export const deleteCategory = async (id) => {
  const res = await adminAxios.delete(`/categories/${id}`);
  return res.data;
};
