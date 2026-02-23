 /**
 * @file CategoriesList.jsx
 * @description
 * Displays a list of categories with options to edit or delete each category.
 * Features:
 * - Fetches categories from the API on mount
 * - Allows inline update of category names via prompt
 * - Handles deletion of categories with confirmation
 * - Shows loading and error states
 * - Uses Framer Motion for hover animations
 *
 * @component
 *
 * @returns {JSX.Element} Grid UI of category cards with edit and delete actions
 *
 * @example
 * <CategoriesList />
 */
import React, { useEffect, useState } from "react";
import { fetchCategories, updateCategory, deleteCategory } from "../../features/categories/category.api";
import { motion } from "framer-motion";

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await fetchCategories();
      setCategories(data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleUpdate = async (id, currentName) => {
    const newName = prompt("Enter new category name:", currentName);
    if (!newName || !newName.trim()) return;
    try {
      await updateCategory(id, { name: newName });
      loadCategories();
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await deleteCategory(id);
      loadCategories();
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  if (loading)
    return <p className="text-gray-400 text-center py-6">Loading categories...</p>;
  if (error)
    return <p className="text-red-500 text-center py-6">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {categories.map((cat) => (
        <motion.div
          key={cat._id}
          className="bg-[#1E1B2A] rounded-xl shadow-lg p-5 flex flex-col justify-between border border-[#3B2A1E] hover:border-amber-500 transition-all duration-300"
          whileHover={{ scale: 1.03 }}
        >
          <div>
            <h3 className="text-xl font-bold text-amber-400 mb-1">{cat.name}</h3>
            <p className="text-gray-400 text-sm">ID: {cat._id}</p>
            <p className="text-gray-500 text-sm mt-1">Slug: {cat.slug}</p>
            <span
              className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${
                cat.isActive ? "bg-green-600 text-white" : "bg-red-500 text-white"
              }`}
            >
              {cat.isActive ? "Active" : "Inactive"}
            </span>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              onClick={() => handleUpdate(cat._id, cat.name)}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(cat._id)}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition"
            >
              Delete
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CategoriesList;