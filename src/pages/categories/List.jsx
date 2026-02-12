 import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchCategories } from "../../features/categories/category.api";

const CategoriesList = () => {
  const { user } = useSelector((state) => state.auth);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load categories from API
  const loadCategories = async () => {
    try {
      setLoading(true);
      setError("");

      // ✅ Axios interceptor automatically attaches accessToken
      const data = await fetchCategories();
      setCategories(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadCategories();
    } else {
      setLoading(false);
    }
  }, [user]);

  // User not logged in
  if (!user)
    return <p className="text-yellow-600">Please login to view categories.</p>;

  // Loading state
  if (loading)
    return <p className="text-gray-500">Loading categories...</p>;

  // Error state
  if (error)
    return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-amber-700">All Categories</h2>

      {categories.length === 0 ? (
        <p className="text-gray-500">No categories found.</p>
      ) : (
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li
              key={cat._id}
              className="bg-white p-2 rounded shadow flex justify-between items-center"
            >
              <span>{cat.name}</span>
              <span className="text-gray-500 text-sm">{cat.slug}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoriesList;
