 "use client";

import React, { useState, useEffect, Fragment } from "react";
import { createMenuApi, getCategoriesApi } from "../../features/menu/menu.api";
import { useNavigate } from "react-router-dom";
import { Listbox, Transition } from "@headlessui/react";
import { FaLeaf, FaPepperHot, FaFire } from "react-icons/fa";

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

    if (formData.discountPrice && Number(formData.discountPrice) >= Number(formData.price)) {
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

  const spiceOptions = [
    { label: "Mild", value: "mild", icon: <FaLeaf className="text-green-400" /> },
    { label: "Medium", value: "medium", icon: <FaPepperHot className="text-orange-400" /> },
    { label: "Hot", value: "hot", icon: <FaFire className="text-red-500" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-start py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl">
        <div className="bg-[#3B2A1E]/80 p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl text-white">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-400 mb-6 text-center">
            Add New Food Item
          </h2>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Name */}
            <input
              name="name"
              placeholder="Food Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-300 focus:ring-2 focus:ring-amber-400 outline-none"
            />

            {/* Description */}
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 h-28 rounded-lg bg-gray-700 text-white placeholder-gray-300 focus:ring-2 focus:ring-amber-400 outline-none resize-none"
            />

            {/* Category */}
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-amber-400 outline-none"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Price and Discount */}
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                name="price"
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                required
                className="flex-1 px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-300 focus:ring-2 focus:ring-amber-400 outline-none"
              />
              <input
                name="discountPrice"
                type="number"
                placeholder="Discount Price"
                value={formData.discountPrice}
                onChange={handleChange}
                className="flex-1 px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-300 focus:ring-2 focus:ring-amber-400 outline-none"
              />
            </div>

            {/* Image Upload */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <input
                name="imageFile"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="text-white"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg border-2 border-amber-400 mt-2 sm:mt-0"
                />
              )}
            </div>

            {/* Spice Level */}
            <Listbox
              value={formData.spiceLevel}
              onChange={(val) => setFormData({ ...formData, spiceLevel: val })}
            >
              <div className="relative">
                <Listbox.Button className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white text-left focus:ring-2 focus:ring-amber-400 outline-none">
                  {spiceOptions.find((o) => o.value === formData.spiceLevel)?.label}
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 w-full bg-gray-700 rounded-lg shadow-lg z-10">
                    {spiceOptions.map((option) => (
                      <Listbox.Option
                        key={option.value}
                        value={option.value}
                        className={({ active }) =>
                          `cursor-pointer select-none px-4 py-2 flex items-center gap-2 ${
                            active ? "bg-gray-600" : ""
                          }`
                        }
                      >
                        {option.icon} {option.label}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>

            {/* Vegetarian */}
            <label className="flex items-center gap-2 text-amber-300 font-medium">
              <input
                name="isVeg"
                type="checkbox"
                checked={formData.isVeg}
                onChange={handleChange}
                className="accent-amber-400"
              />
              Vegetarian <FaLeaf className="text-green-400" />
            </label>

            {/* Stock */}
            <input
              name="stock"
              type="number"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-300 focus:ring-2 focus:ring-amber-400 outline-none"
            />

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 rounded-lg transition shadow-md disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Food"}
            </button>

            {error && <p className="text-red-400 text-center font-medium mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFood;