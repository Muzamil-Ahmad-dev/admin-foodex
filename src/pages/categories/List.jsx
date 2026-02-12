 import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchCategories } from "../../features/categories/category.api";

const CategoriesList = () => {
  const { user } = useSelector((state) => state.auth);

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
    if (user) {
      loadCategories(); // ✅ wait for login
    } else {
      setLoading(false);
    }
  }, [user]);

  if (!user)
    return (
      <p className="text-yellow-600">
        Please login to view categories.
      </p>
    );

  if (loading)
    return <p className="text-gray-500">Loading categories...</p>;

  if (error)
    return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-amber-700">
        All Categories
      </h2>
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
    </div>
  );
};

export default CategoriesList;
