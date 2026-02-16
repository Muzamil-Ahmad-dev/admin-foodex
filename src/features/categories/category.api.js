 import axios from "axios";

const API_URL = "/api/categories"; // relative path works for Vercel

// --------------------
// Public CRUD functions
// --------------------

export const fetchCategories = async () => {
  const res = await axios.get(API_URL);
  return res.data.data;
};

export const fetchCategoryBySlug = async (slug) => {
  const res = await axios.get(`${API_URL}/${slug}`);
  return res.data.data;
};

export const createCategory = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data.data;
};

export const updateCategory = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data.data;
};

export const deleteCategory = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
