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

  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategoriesApi();
        setCategories(res.data.data);
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
      setPreview(files[0] ? URL.createObjectURL(files[0]) : null);
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (
      formData.discountPrice &&
      Number(formData.discountPrice) >= Number(formData.price)
    ) {
      setError("Discount price must be less than price");
      setLoading(false);
      return;
    }

    if (!formData.category) {
      setError("Please select a category");
      setLoading(false);
      return;
    }

    try {
      await createMenuApi(formData);
      navigate("/products");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create menu item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <fieldset className="bg-[#5C4033] border-2 border-yellow-400 rounded-2xl shadow-xl p-8">
        <legend className="text-2xl font-bold text-yellow-400 px-2">
          Add New Food
        </legend>

        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Food Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="px-4 py-2 rounded-lg bg-white border border-yellow-400 focus:ring-2 focus:ring-yellow-500 outline-none"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="px-4 py-2 rounded-lg bg-white border border-yellow-400 focus:ring-2 focus:ring-yellow-500 outline-none"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="px-4 py-2 rounded-lg bg-white border border-yellow-400 focus:ring-2 focus:ring-yellow-500 outline-none"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            name="price"
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            className="px-4 py-2 rounded-lg bg-white border border-yellow-400 focus:ring-2 focus:ring-yellow-500 outline-none"
          />

          <input
            name="discountPrice"
            type="number"
            placeholder="Discount Price"
            value={formData.discountPrice}
            onChange={handleChange}
            className="px-4 py-2 rounded-lg bg-white border border-yellow-400 focus:ring-2 focus:ring-yellow-500 outline-none"
          />

          <input
            name="imageFile"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="px-4 py-2 rounded-lg bg-white border border-yellow-400"
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded-lg border-2 border-yellow-400"
            />
          )}

          <select
            name="spiceLevel"
            value={formData.spiceLevel}
            onChange={handleChange}
            className="px-4 py-2 rounded-lg bg-white border border-yellow-400 focus:ring-2 focus:ring-yellow-500 outline-none"
          >
            <option value="mild">🌿 Mild</option>
            <option value="medium">🌶 Medium</option>
            <option value="hot">🔥 Hot</option>
          </select>

          <label className="flex items-center gap-2 text-yellow-300 font-medium">
            <input
              name="isVeg"
              type="checkbox"
              checked={formData.isVeg}
              onChange={handleChange}
              className="accent-yellow-400"
            />
            Vegetarian
          </label>

          <input
            name="stock"
            type="number"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className="px-4 py-2 rounded-lg bg-white border border-yellow-400 focus:ring-2 focus:ring-yellow-500 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-400 hover:bg-yellow-500 text-brown-900 font-bold py-3 rounded-lg transition shadow-md disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Food"}
          </button>

          {error && (
            <p className="text-red-300 text-center font-medium mt-2">{error}</p>
          )}
        </form>
      </fieldset>
    </div>
  );
};

export default AddFood;