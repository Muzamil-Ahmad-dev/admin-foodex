 import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://foodex-backend--muzamilsakhi079.replit.app/api";

const menuAxios = axios.create({
  baseURL: API_URL,
});

/* ======================
   CATEGORY APIs
====================== */
export const getCategoriesApi = () => menuAxios.get("/categories");
export const getCategoryBySlugApi = (slug) => menuAxios.get(`/categories/${slug}`);
export const createCategoryApi = (data) => menuAxios.post("/categories", data);
export const updateCategoryApi = (id, data) => menuAxios.put(`/categories/${id}`, data);
export const deleteCategoryApi = (id) => menuAxios.delete(`/categories/${id}`);

/* ======================
   MENU APIs (CRUD)
====================== */

// Fetch all menus, with optional query params
export const getMenusApi = (queryParams = {}) =>
  menuAxios.get("/menu", { params: queryParams });

// Get menu details by slug
export const getMenuDetailsApi = (slug) =>
  menuAxios.get(`/menu/slug/${slug}`);

// Create menu item (FormData or JSON)
export const createMenuApi = (menuData) => {
  const isFormData = menuData instanceof FormData;
  return menuAxios.post("/menu", menuData, isFormData ? { headers: { "Content-Type": "multipart/form-data" } } : {});
};

// Update menu item by ID (FormData or JSON)
export const updateMenuApi = (id, menuData) => {
  const isFormData = menuData instanceof FormData;
  return menuAxios.put(`/menu/${id}`, menuData, isFormData ? { headers: { "Content-Type": "multipart/form-data" } } : {});
};

// Delete menu item
export const deleteMenuApi = (id) => menuAxios.delete(`/menu/${id}`);

export default menuAxios;
