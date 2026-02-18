 import React, { useState } from "react";
import { createMenuApi } from "../../features/menu/menu.api";
import { useNavigate } from "react-router-dom";

const AddFood = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    discountPrice: "",
    image: "",
    isVeg: false,
    spiceLevel: "mild",
    stock: 100,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createMenuApi({
        ...formData,
        price: Number(formData.price),
        discountPrice: Number(formData.discountPrice),
        stock: Number(formData.stock),
      });
      setLoading(false);
      navigate("/products"); // go back to products list
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Failed to create menu");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gradient-to-br from-amber-100 via-amber-200 to-amber-50 rounded-xl shadow-lg border border-amber-300">
      <h2 className="text-3xl font-bold mb-6 text-amber-700 text-center">
        Add New Food
      </h2>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border border-amber-400 px-4 py-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none transition"
        />
        <input
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border border-amber-400 px-4 py-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none transition"
        />
        <input
          name="category"
          placeholder="Category ID"
          value={formData.category}
          onChange={handleChange}
          required
          className="border border-amber-400 px-4 py-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none transition"
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="border border-amber-400 px-4 py-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none transition"
        />
        <input
          name="discountPrice"
          type="number"
          placeholder="Discount Price"
          value={formData.discountPrice}
          onChange={handleChange}
          className="border border-amber-400 px-4 py-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none transition"
        />
        <input
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="border border-amber-400 px-4 py-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none transition"
        />
        <select
          name="spiceLevel"
          value={formData.spiceLevel}
          onChange={handleChange}
          className="border border-amber-400 px-4 py-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none transition"
        >
          <option value="mild">Mild 🌿</option>
          <option value="medium">Medium 🌶️</option>
          <option value="hot">Hot 🔥</option>
        </select>
        <label className="flex items-center gap-2 text-amber-700 font-medium">
          <input
            name="isVeg"
            type="checkbox"
            checked={formData.isVeg}
            onChange={handleChange}
            className="accent-amber-600"
          />
          Vegetarian
        </label>
        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          className="border border-amber-400 px-4 py-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none transition"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold transition"
        >
          {loading ? "Creating..." : "Create Food"}
        </button>
        {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default AddFood;
