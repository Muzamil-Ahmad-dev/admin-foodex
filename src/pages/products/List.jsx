 import React, { useEffect, useState } from "react";
import {
  getMenusApi,
  deleteMenuApi,
  updateMenuApi,
  getCategoriesApi,
} from "../../features/menu/menu.api";
import { FaLeaf, FaPepperHot, FaFire } from "react-icons/fa";

const FoodList = () => {
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editMenuId, setEditMenuId] = useState(null);
  const [editData, setEditData] = useState({});
  const [preview, setPreview] = useState(null);

  const spiceOptions = [
    { label: "Mild", value: "mild", icon: <FaLeaf className="text-green-400" /> },
    { label: "Medium", value: "medium", icon: <FaPepperHot className="text-orange-400" /> },
    { label: "Hot", value: "hot", icon: <FaFire className="text-red-500" /> },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menusRes, catsRes] = await Promise.all([getMenusApi(), getCategoriesApi()]);
        setMenus(menusRes.data.data);
        setCategories(catsRes.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this menu item?")) return;
    try {
      await deleteMenuApi(id);
      setMenus((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  const handleToggleAvailability = async (menu) => {
    try {
      await updateMenuApi(menu._id, { isAvailable: !menu.isAvailable });
      setMenus((prev) =>
        prev.map((m) => (m._id === menu._id ? { ...m, isAvailable: !m.isAvailable } : m))
      );
    } catch {
      alert("Failed to update availability");
    }
  };

  const handleEditClick = (menu) => {
    setEditMenuId(menu._id);
    setEditData({
      name: menu.name,
      description: menu.description,
      category: menu.category._id,
      price: menu.price,
      discountPrice: menu.discountPrice,
      stock: menu.stock,
      spiceLevel: menu.spiceLevel,
      isVeg: menu.isVeg,
      imageFile: null,
    });
    setPreview(menu.image);
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setEditData({ ...editData, imageFile: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setEditData({
        ...editData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (editData.discountPrice && Number(editData.discountPrice) >= Number(editData.price)) {
      alert("Discount price must be less than price");
      return;
    }

    if (!editData.category) {
      alert("Please select a category");
      return;
    }

    try {
      await updateMenuApi(editMenuId, editData);
      setEditMenuId(null);
      const res = await getMenusApi();
      setMenus(res.data.data);
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) return <p className="text-center text-yellow-400">Loading...</p>;
  if (error) return <p className="text-center text-red-400">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
      {menus.map((menu) => (
        <div
          key={menu._id}
          className="bg-[#5C4033] border-2 border-yellow-400 rounded-2xl shadow-xl overflow-hidden flex flex-col"
        >
          <img
            src={editMenuId === menu._id ? preview : menu.image}
            alt={menu.name}
            className="h-48 w-full object-cover"
          />

          <div className="p-4 flex-1 text-yellow-100 flex flex-col">
            {editMenuId === menu._id ? (
              <form onSubmit={handleEditSubmit} className="flex flex-col gap-2">
                <input
                  name="name"
                  value={editData.name}
                  onChange={handleEditChange}
                  className="rounded px-2 py-1"
                />
                <textarea
                  name="description"
                  value={editData.description}
                  onChange={handleEditChange}
                  className="rounded px-2 py-1"
                />
                <select
                  name="category"
                  value={editData.category}
                  onChange={handleEditChange}
                  className="rounded px-2 py-1"
                >
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  name="price"
                  value={editData.price}
                  onChange={handleEditChange}
                  className="rounded px-2 py-1"
                  placeholder="Price (PKR)"
                />
                <input
                  type="number"
                  name="discountPrice"
                  value={editData.discountPrice}
                  onChange={handleEditChange}
                  className="rounded px-2 py-1"
                  placeholder="Discount Price (PKR)"
                />
                <input
                  type="number"
                  name="stock"
                  value={editData.stock}
                  onChange={handleEditChange}
                  className="rounded px-2 py-1"
                  placeholder="Stock"
                />

                {/* Spice Level with icon preview */}
                <div className="flex items-center gap-2 mt-1">
                  {spiceOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt.value}
                      onClick={() => setEditData({ ...editData, spiceLevel: opt.value })}
                      className={`flex items-center gap-1 px-2 py-1 rounded ${
                        editData.spiceLevel === opt.value ? "bg-gray-600" : "bg-gray-700"
                      }`}
                    >
                      {opt.icon} {opt.label}
                    </button>
                  ))}
                </div>

                <label className="flex items-center gap-2 text-yellow-300 font-medium mt-2">
                  <input
                    name="isVeg"
                    type="checkbox"
                    checked={editData.isVeg}
                    onChange={handleEditChange}
                    className="accent-yellow-400"
                  />
                  Vegetarian <FaLeaf className="text-green-400" />
                </label>

                <input type="file" name="imageFile" onChange={handleEditChange} />

                <div className="flex gap-2 mt-2">
                  <button className="flex-1 bg-yellow-400 text-brown-900 font-bold py-1 rounded">
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditMenuId(null)}
                    className="flex-1 bg-gray-400 text-white py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  {menu.name}
                  {menu.isVeg && <FaLeaf className="text-green-400" />}
                </h3>

                <p className="text-sm opacity-90">{menu.description}</p>

                <div className="flex items-center gap-3 mt-1">
                  <p className="font-bold">PKR {menu.price}</p>

                  {menu.spiceLevel === "mild" && (
                    <span className="flex items-center gap-1 text-green-400 text-sm">
                      <FaLeaf /> Mild
                    </span>
                  )}
                  {menu.spiceLevel === "medium" && (
                    <span className="flex items-center gap-1 text-orange-400 text-sm">
                      <FaPepperHot /> Medium
                    </span>
                  )}
                  {menu.spiceLevel === "hot" && (
                    <span className="flex items-center gap-1 text-red-500 text-sm">
                      <FaFire /> Hot
                    </span>
                  )}
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleToggleAvailability(menu)}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold ${
                      menu.isAvailable
                        ? "bg-yellow-400 text-brown-900"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {menu.isAvailable ? "Available" : "Unavailable"}
                  </button>

                  <button
                    onClick={() => handleEditClick(menu)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-bold"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(menu._id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-bold"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodList;