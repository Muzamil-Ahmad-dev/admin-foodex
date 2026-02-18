  import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://foodex-backend--muzamilsakhi079.replit.app/api";

const menuAxios = axios.create({
  baseURL: API_URL,
});

/* ======================
   MENU APIs (PUBLIC)
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
