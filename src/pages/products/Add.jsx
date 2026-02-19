 import React, { useState, useEffect } from "react";
import { createMenuApi, getCategoriesApi } from "../../features/menu/menu.api";
import { useNavigate } from "react-router-dom";

const AddFood = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    discountPrice: "",
    imageFile: null,
    isVeg: false,
    spiceLevel: "mild",
    stock: 100,
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategoriesApi();
        setCategories(res.data.data); // expects { data: [...] }
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, imageFile: files[0] });
    } else {
      setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const payload = new FormData();
      for (const key of Object.keys(formData)) {
        if (["price", "discountPrice", "stock"].includes(key)) {
          payload.append(key, Number(formData[key]));
        } else if (key === "imageFile" && formData[key]) {
          payload.append("imageFile", formData[key]);
        } else {
          payload.append(key, formData[key]);
        }
      }

      await createMenuApi(payload);
      setLoading(false);
      navigate("/products");
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Failed to create menu item");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gradient-to-br from-amber-100 via-amber-200 to-amber-50 rounded-xl shadow-lg border border-amber-300">
      <h2 className="text-3xl font-bold mb-6 text-amber-700 text-center">Add New Food</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="border border-amber-400 px-4 py-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none transition" />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border border-amber-400 px-4 py-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none transition" />

        {/* Category Dropdown */}
        <select name="category" value={formData.category} onChange={handleChange} required className="border border-amber-400 px-4 py-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none transition">
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>

        <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} required className="border border-amber-400 px-4 py-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none transition" />
        <input name="discountPrice" type="number" placeholder="Discount Price" value={formData.discountPrice} onChange={handleChange} className="border border-amber-400 px-4 py-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none transition" />
        <input name="imageFile" type="file" accept="image/*" onChange={handleChange} className="border border-amber-400 px-4 py-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none transition" />

        <select name="spiceLevel" value={formData.spiceLevel} onChange={handleChange} className="border border-amber-400 px-4 py-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none transition">
          <option value="mild">Mild 🌿</option>
          <option value="medium">Medium 🌶️</option>
          <option value="hot">Hot 🔥</option>
        </select>

        <label className="flex items-center gap-2 text-amber-700 font-medium">
          <input name="isVeg" type="checkbox" checked={formData.isVeg} onChange={handleChange} className="accent-amber-600" />
          Vegetarian
        </label>

        <input name="stock" type="number" placeholder="Stock" value={formData.stock} onChange={handleChange} className="border border-amber-400 px-4 py-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none transition" />

        <button type="submit" disabled={loading} className="bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold transition">
          {loading ? "Creating..." : "Create Food"}
        </button>
        {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default AddFood;
