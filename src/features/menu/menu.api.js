 import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://foodex-backend--muzamilsakhi079.replit.app/api";

const menuAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

/* ======================
   CATEGORY APIs
====================== */
export const getCategoriesApi = () => menuAxios.get("/categories");
export const getCategoryBySlugApi = (slug) =>
  menuAxios.get(`/categories/${slug}`);
export const createCategoryApi = (data) =>
  menuAxios.post("/categories", data);
export const updateCategoryApi = (id, data) =>
  menuAxios.put(`/categories/${id}`, data);
export const deleteCategoryApi = (id) =>
  menuAxios.delete(`/categories/${id}`);

/* ======================
   MENU APIs
====================== */

// Helper to convert menu data to FormData
const toFormData = (menuData) => {
  const formData = new FormData();
  Object.keys(menuData).forEach((key) => {
    const value = menuData[key];
    if (value !== undefined && value !== null && value !== "") {
      formData.append(key, value);
    }
  });
  return formData;
};

// Create menu
export const createMenuApi = (menuData) =>
  menuAxios.post("/menus", toFormData(menuData));

// Update menu
export const updateMenuApi = (id, menuData) =>
  menuAxios.put(`/menus/${id}`, toFormData(menuData));

// Fetch menus
export const getMenusApi = (queryParams = {}) =>
  menuAxios.get("/menus", { params: queryParams });

// Fetch menu details by slug
export const getMenuDetailsApi = (slug) =>
  menuAxios.get(`/menus/slug/${slug}`);

// Delete menu
export const deleteMenuApi = (id) => menuAxios.delete(`/menus/${id}`);

export default menuAxios;