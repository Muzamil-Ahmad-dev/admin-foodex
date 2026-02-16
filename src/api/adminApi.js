 import axios from "axios";

// IMPORTANT: use relative path so Vercel proxy works
const API_URL = "/api";

// Admin axios instance
const adminAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true, // cookies will now be FIRST-PARTY
});

export default adminAxios;
