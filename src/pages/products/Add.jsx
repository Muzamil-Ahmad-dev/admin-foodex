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
    <div className="max-w-lg mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Food</h2>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border px-3 py-2 rounded"
        />
        <input
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
        <input
          name="category"
          placeholder="Category ID"
          value={formData.category}
          onChange={handleChange}
          required
          className="border px-3 py-2 rounded"
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="border px-3 py-2 rounded"
        />
        <input
          name="discountPrice"
          type="number"
          placeholder="Discount Price"
          value={formData.discountPrice}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
        <input
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
        <select
          name="spiceLevel"
          value={formData.spiceLevel}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        >
          <option value="mild">Mild</option>
          <option value="medium">Medium</option>
          <option value="hot">Hot</option>
        </select>
        <label className="flex items-center gap-2">
          <input
            name="isVeg"
            type="checkbox"
            checked={formData.isVeg}
            onChange={handleChange}
          />
          Vegetarian
        </label>
        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-amber-500 text-white py-2 rounded mt-2"
        >
          {loading ? "Creating..." : "Create Food"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default AddFood;
