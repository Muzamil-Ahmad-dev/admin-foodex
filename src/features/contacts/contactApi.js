 /**
 * @file contact.api.js
 * @description
 * This module provides **admin APIs for managing contact queries** in the Foodify application.
 * All requests use the preconfigured `adminAxios` instance for authentication and server communication.
 * 
 * Features:
 * - Fetch all contact queries
 * - Fetch a single contact by ID
 * - Respond to a contact query
 * - Delete a contact query
 * 
 * @module Api/adminContacts
 * @dependencies
 * - adminAxios: Axios instance preconfigured for admin routes
 */

import adminAxios from "../../api/adminApi"; // reuse admin axios

/**
 * Fetches all contact queries from the server.
 * @returns {Promise<Array<Object>>} Array of contact objects
 * @throws Will throw an error if the request fails
 */
export const fetchContacts = async () => {
  try {
    const res = await adminAxios.get("/contact");
    return res.data.data; // adjust if your backend structure is different
  } catch (err) {
    console.error("Fetch contacts error:", err.response?.data?.message || err.message);
    throw err;
  }
};

/**
 * Fetches a single contact query by ID.
 * @param {string} id - Contact ID
 * @returns {Promise<Object>} Contact object
 * @throws Will throw an error if the request fails
 */
export const fetchContactById = async (id) => {
  try {
    const res = await adminAxios.get(`/contact/${id}`);
    return res.data.data;
  } catch (err) {
    console.error("Fetch contact error:", err.response?.data?.message || err.message);
    throw err;
  }
};

/**
 * Responds to a contact query by ID.
 * @param {string} id - Contact ID
 * @param {Object} responseData - Response data (e.g., message content)
 * @returns {Promise<Object>} Updated contact object
 * @throws Will throw an error if the request fails
 */
export const respondToContact = async (id, responseData) => {
  try {
    const res = await adminAxios.put(`/contact/${id}/respond`, responseData);
    return res.data.data;
  } catch (err) {
    console.error("Respond contact error:", err.response?.data?.message || err.message);
    throw err;
  }
};

/**
 * Deletes a contact query by ID.
 * @param {string} id - Contact ID
 * @returns {Promise<Object>} Server response object
 * @throws Will throw an error if the request fails
 */
export const deleteContact = async (id) => {
  try {
    const res = await adminAxios.delete(`/contact/${id}`);
    return res.data;
  } catch (err) {
    console.error("Delete contact error:", err.response?.data?.message || err.message);
    throw err;
  }
};