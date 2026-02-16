 import React, { useState } from "react";
import { createCategory } from "../../features/categories/category.api";

const CategoriesAdd = ({ onAdded }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const newCategory = await createCategory({ name });

      setName("");
      setSuccess(`Category "${newCategory.name}" added successfully!`);

      if (onAdded) onAdded(newCategory);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-amber-700">Add Category</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Name"
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-amber-500 text-white py-2 rounded hover:bg-amber-600"
        >
          {loading ? "Adding..." : "Add Category"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
      </form>
    </div>
  );
};

export default CategoriesAdd;
