 import React, { useEffect, useState } from "react";
import {
  fetchCategories,
  deleteCategory,
  updateCategory,
} from "../../features/categories/category.api";

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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await deleteCategory(id);
      loadCategories();
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  const handleUpdate = async (id, currentName) => {
    const newName = prompt("Enter new category name:", currentName);
    if (!newName || newName.trim() === "") return;
    try {
      await updateCategory(id, { name: newName });
      loadCategories();
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  if (loading) return <p className="text-gray-500">Loading categories...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-amber-700">All Categories</h2>
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li
            key={cat._id}
            className="bg-white p-2 rounded shadow flex justify-between items-center"
          >
            <span>{cat.name}</span>
            <span className="flex gap-2">
              <button
                onClick={() => handleUpdate(cat._id, cat.name)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(cat._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesList;
