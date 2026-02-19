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

// Create menu
export const createMenuApi = (menuData) => {
  const formData = new FormData();

  Object.keys(menuData).forEach((key) => {
    if (menuData[key] !== undefined && menuData[key] !== null) {
      formData.append(key, menuData[key]);
    }
  });

  return menuAxios.post("/menu", formData);
};

// Update menu
export const updateMenuApi = (id, menuData) => {
  const formData = new FormData();

  Object.keys(menuData).forEach((key) => {
    if (menuData[key] !== undefined && menuData[key] !== null) {
      formData.append(key, menuData[key]);
    }
  });

  return menuAxios.put(`/menu/${id}`, formData);
};

// Fetch menus
export const getMenusApi = (queryParams = {}) =>
  menuAxios.get("/menu", { params: queryParams });

// Fetch menu details
export const getMenuDetailsApi = (slug) =>
  menuAxios.get(`/menu/slug/${slug}`);

// Delete menu
export const deleteMenuApi = (id) =>
  menuAxios.delete(`/menu/${id}`);

export default menuAxios;
