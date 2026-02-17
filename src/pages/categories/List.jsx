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

  if (loading) return <p className="text-gray-500 text-center">Loading categories...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {categories.map((cat) => (
        <motion.div
          key={cat._id}
          className="bg-white p-5 rounded-xl shadow-lg flex flex-col justify-between hover:shadow-2xl transition duration-200"
          whileHover={{ scale: 1.03 }}
        >
          <div>
            <h3 className="text-xl font-bold text-amber-700 mb-2">{cat.name}</h3>
            <p className="text-gray-500 text-sm">ID: {cat._id}</p>
            <p className="text-gray-400 text-sm">Slug: {cat.slug}</p>
            <p className={`text-sm font-medium ${cat.isActive ? "text-green-600" : "text-red-500"}`}>
              {cat.isActive ? "Active" : "Inactive"}
            </p>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => handleUpdate(cat._id, cat.name)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition duration-200"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(cat._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-200"
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
