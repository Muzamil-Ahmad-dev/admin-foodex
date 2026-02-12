 // src/features/categories/categoriesApi.js
import axios from "axios";

const BASE_URL = "https://foodex-backend--muzamilsakhi079.replit.app/api";
const CATEGORIES_URL = `${BASE_URL}/categories`;

// ---------------------------
// 1️⃣ Fetch all active categories (public)
// ---------------------------
export const fetchCategories = async () => {
  try {
    const res = await axios.get(CATEGORIES_URL);
    return res.data.data; // return categories array
  } catch (err) {
    console.error("Failed to fetch categories:", err.response?.data?.message || err.message);
    throw err;
  }
};

// ---------------------------
// 2️⃣ Fetch single category by slug (public)
// ---------------------------
export const fetchCategoryBySlug = async (slug) => {
  try {
    const res = await axios.get(`${CATEGORIES_URL}/${slug}`);
    return res.data.data;
  } catch (err) {
    console.error("Failed to fetch category:", err.response?.data?.message || err.message);
    throw err;
  }
};

// ---------------------------
// 3️⃣ Create new category (admin only)
// ---------------------------
export const createCategory = async (categoryData) => {
  try {
    const res = await axios.post(CATEGORIES_URL, categoryData, {
      withCredentials: true, // ✅ send cookies (refreshToken) automatically
    });
    return res.data.data;
  } catch (err) {
    console.error("Failed to create category:", err.response?.data?.message || err.message);
    throw err;
  }
};
