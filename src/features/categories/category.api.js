 import axios from "axios";

const BASE_URL = "https://foodex-backend--muzamilsakhi079.replit.app/api";
const CATEGORIES_URL = `${BASE_URL}/categories`;

// Fetch categories (admin protected or cookie protected)
export const fetchCategories = async () => {
  try {
    const res = await axios.get(CATEGORIES_URL, {
      withCredentials: true, // ✅ IMPORTANT (same as SupportChat)
    });
    return res.data.data;
  } catch (err) {
    console.error(
      "Failed to fetch categories:",
      err.response?.data?.message || err.message
    );
    throw err;
  }
};

// Create new category (admin only)
export const createCategory = async (categoryData) => {
  try {
    const res = await axios.post(CATEGORIES_URL, categoryData, {
      withCredentials: true, // ✅ IMPORTANT
    });
    return res.data.data;
  } catch (err) {
    console.error(
      "Failed to create category:",
      err.response?.data?.message || err.message
    );
    throw err;
  }
};
