 import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://foodex-backend--muzamilsakhi079.replit.app/api";

const menuAxios = axios.create({
  baseURL: API_URL,
});

// Attach token from localStorage
menuAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Optional: handle 401
menuAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Token expired, you can log out or redirect to login
      localStorage.removeItem("accessToken");
    }
    return Promise.reject(error);
  }
);

/* ======================
   MENU APIs
====================== */
export const getMenusApi = (queryParams = {}) =>
  menuAxios.get("/menu", { params: queryParams });

export const getMenuDetailsApi = (slug) =>
  menuAxios.get(`/menu/slug/${slug}`);

export const createMenuApi = (menuData) =>
  menuAxios.post("/menu", menuData);

export const updateMenuApi = (id, menuData) =>
  menuAxios.put(`/menu/${id}`, menuData);

export const deleteMenuApi = (id) =>
  menuAxios.delete(`/menu/${id}`);

export default menuAxios;
