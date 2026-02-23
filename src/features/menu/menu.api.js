 /**
 * @file menu.api.js
 * @description
 * Centralized API module for **Foodify menu and category management**.
 * Provides functions for CRUD operations on categories and menus,
 * including file uploads via FormData for menus.
 * 
 * Features:
 * - Category APIs: fetch, create, update, delete
 * - Menu APIs: fetch, create, update, delete, get details by slug
 * - Helper function to convert menu objects into FormData
 * 
 * @module Api/menu
 * @dependencies
 * - axios: HTTP client
 * - menuAxios: preconfigured axios instance with baseURL and credentials
 */

import axios from "axios";

/** Base API URL for menu and category endpoints */
const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://foodex-backend--muzamilsakhi079.replit.app/api";
// const API_URL = "http://localhost:5000/api";

/** Preconfigured axios instance for menu/category requests */
const menuAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

/* ======================
   CATEGORY APIs
====================== */

/**
 * Fetch all categories
 * @returns {Promise<Array<Object>>} List of categories
 */
export const getCategoriesApi = () => menuAxios.get("/categories");

/**
 * Fetch a category by slug
 * @param {string} slug - Category slug
 * @returns {Promise<Object>} Category object
 */
export const getCategoryBySlugApi = (slug) =>
  menuAxios.get(`/categories/${slug}`);

/**
 * Create a new category
 * @param {Object} data - Category data
 * @returns {Promise<Object>} Created category
 */
export const createCategoryApi = (data) =>
  menuAxios.post("/categories", data);

/**
 * Update an existing category
 * @param {string} id - Category ID
 * @param {Object} data - Updated category data
 * @returns {Promise<Object>} Updated category
 */
export const updateCategoryApi = (id, data) =>
  menuAxios.put(`/categories/${id}`, data);

/**
 * Delete a category by ID
 * @param {string} id - Category ID
 * @returns {Promise<Object>} Server response
 */
export const deleteCategoryApi = (id) =>
  menuAxios.delete(`/categories/${id}`);

/* ======================
   MENU APIs
====================== */

/**
 * Converts a menu object into FormData for file uploads
 * @param {Object} menuData - Menu data with optional files
 * @returns {FormData} FormData object
 */
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

/**
 * Create a new menu item
 * @param {Object} menuData - Menu data (can include files)
 * @returns {Promise<Object>} Created menu
 */
export const createMenuApi = (menuData) =>
  menuAxios.post("/menus", toFormData(menuData));

/**
 * Update an existing menu item
 * @param {string} id - Menu ID
 * @param {Object} menuData - Updated menu data (can include files)
 * @returns {Promise<Object>} Updated menu
 */
export const updateMenuApi = (id, menuData) =>
  menuAxios.put(`/menus/${id}`, toFormData(menuData));

/**
 * Fetch menus with optional query parameters
 * @param {Object} [queryParams={}] - Filters and pagination options
 * @returns {Promise<Array<Object>>} List of menus
 */
export const getMenusApi = (queryParams = {}) =>
  menuAxios.get("/menus", { params: queryParams });

/**
 * Fetch menu details by slug
 * @param {string} slug - Menu slug
 * @returns {Promise<Object>} Menu details
 */
export const getMenuDetailsApi = (slug) =>
  menuAxios.get(`/menus/slug/${slug}`);

/**
 * Delete a menu by ID
 * @param {string} id - Menu ID
 * @returns {Promise<Object>} Server response
 */
export const deleteMenuApi = (id) => menuAxios.delete(`/menus/${id}`);

/** Default export: preconfigured axios instance */
export default menuAxios;