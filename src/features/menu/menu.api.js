// menu.api.js
import axios from "axios";

// Base API URL
const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://foodex-backend--muzamilsakhi079.replit.app/api";

// Axios instance
const menuAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Needed for refresh token cookie
});

// Attach accessToken from sessionStorage to headers
menuAxios.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle expired access token
menuAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh access token
        const res = await menuAxios.post("/auth/refresh");
        const { accessToken } = res.data;
        if (accessToken) {
          sessionStorage.setItem("accessToken", accessToken);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return menuAxios(originalRequest); // retry original request
        }
      } catch (err) {
        sessionStorage.removeItem("accessToken"); // logout if refresh fails
      }
    }

    return Promise.reject(error);
  }
);

/* ======================
   MENU APIs
====================== */

// Public: Get all menus
export const getMenusApi = (queryParams = {}) =>
  menuAxios.get("/menu", { params: queryParams });

// Public: Get menu details
export const getMenuDetailsApi = (slug) =>
  menuAxios.get(`/menu/${slug}`);

// Admin: Create new menu
export const createMenuApi = (menuData) =>
  menuAxios.post("/menu", menuData); // protected route, uses Authorization header

export default menuAxios;
