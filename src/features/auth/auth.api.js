 /**
 * @file auth.api.js
 * @description
 * This module provides **admin authentication API calls** for the Foodify application.
 * It includes endpoints for admin registration, login, logout, and fetching the admin profile.
 * All requests use `adminAxios` as the HTTP client.
 * 
 * Features:
 * - POST `/auth/register` → Registers a new admin
 * - POST `/auth/login` → Logs in an existing admin
 * - POST `/auth/logout` → Logs out the current admin
 * - GET `/admin/dashboard` → Fetches the authenticated admin’s profile (protected route)
 * 
 * @module Api/adminAuth
 * @dependencies
 * - adminAxios (preconfigured Axios instance with base URL and interceptors)
 */

/**
 * Registers a new admin.
 * @param {Object} data - Admin registration payload (name, email, password, role)
 * @returns {Promise<import('axios').AxiosResponse>} Axios response with user data
 */
export const adminRegisterApi = (data) =>
  adminAxios.post("/auth/register", data);

/**
 * Logs in an existing admin.
 * @param {Object} data - Login payload (email, password)
 * @returns {Promise<import('axios').AxiosResponse>} Axios response with user data and tokens
 */
export const adminLoginApi = (data) =>
  adminAxios.post("/auth/login", data);

/**
 * Logs out the current admin.
 * @returns {Promise<import('axios').AxiosResponse>} Axios response confirming logout
 */
export const adminLogoutApi = () =>
  adminAxios.post("/auth/logout");

/**
 * Fetches the authenticated admin’s profile.
 * Protected route: requires valid access token in headers.
 * @returns {Promise<import('axios').AxiosResponse>} Axios response with admin profile data
 */
export const adminProfileApi = () =>
  adminAxios.get("/admin/dashboard");