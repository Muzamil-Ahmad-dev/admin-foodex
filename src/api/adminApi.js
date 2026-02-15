import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://foodex-backend--muzamilsakhi079.replit.app/api";

// Admin axios instance
const adminAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true, // ✅ send httpOnly cookies automatically
});

export default adminAxios;
