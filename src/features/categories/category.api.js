 /**
 * @file categories.api.js
 * @description
 * This module provides **CRUD API functions for category management**.
 * It interacts with the backend category endpoints using Axios.
 * 
 * Features:
 * - Fetch all categories
 * - Fetch a single category by slug
 * - Create a new category
 * - Update an existing category
 * - Delete a category
 * 
 * The `API_URL` is relative to support deployment on platforms like Vercel.
 * 
 * @module Api/categories
 * @dependencies
 * - Axios for HTTP requests
 */

import axios from "axios";

const API_URL = "/api/categories"; // relative path works for Vercel
// const API_URL = "http://localhost:5000/api/categories"; 

/**
 * Fetches all categories from the server.
 * @returns {Promise<Array<Object>>} Array of category objects
 */
export const fetchCategories = async () => {
  const res = await axios.get(API_URL);
  return res.data.data;
};

/**
 * Fetches a single category by its slug.
 * @param {string} slug - The unique slug identifier for the category
 * @returns {Promise<Object>} Category object
 */
export const fetchCategoryBySlug = async (slug) => {
  const res = await axios.get(`${API_URL}/${slug}`);
  return res.data.data;
};

/**
 * Creates a new category.
 * @param {Object} data - Category data (name, slug, description, etc.)
 * @returns {Promise<Object>} Newly created category object
 */
export const createCategory = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data.data;
};

/**
 * Updates an existing category by ID.
 * @param {string} id - Category ID to update
 * @param {Object} data - Updated category data
 * @returns {Promise<Object>} Updated category object
 */
export const updateCategory = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data.data;
};

/**
 * Deletes a category by ID.
 * @param {string} id - Category ID to delete
 * @returns {Promise<Object>} Response object from server
 */
export const deleteCategory = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};