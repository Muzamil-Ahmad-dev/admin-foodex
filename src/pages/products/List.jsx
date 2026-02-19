 import React, { useEffect, useState } from "react";
import {
  getMenusApi,
  deleteMenuApi,
  updateMenuApi,
  getCategoriesApi,
} from "../../features/menu/menu.api";

const FoodList = () => {
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editMenuId, setEditMenuId] = useState(null);
  const [editData, setEditData] = useState({});
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menusRes, catsRes] = await Promise.all([
          getMenusApi(),
          getCategoriesApi(),
        ]);
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
        prev.map((m) =>
          m._id === menu._id
            ? { ...m, isAvailable: !m.isAvailable }
            : m
        )
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
    try {
      await updateMenuApi(editMenuId, editData);
      setEditMenuId(null);
      const res = await getMenusApi();
      setMenus(res.data.data);
    } catch {
      alert("Update failed");
    }
  };

  if (loading) return <p className="text-center text-yellow-400">Loading...</p>;
  if (error) return <p className="text-center text-red-400">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

          <div className="p-4 flex-1 text-yellow-100">
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
                />

                <input
                  type="file"
                  name="imageFile"
                  onChange={handleEditChange}
                />

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
                <h3 className="text-xl font-bold">{menu.name}</h3>
                <p className="text-sm opacity-90">{menu.description}</p>
                <p className="font-bold mt-1">₹{menu.price}</p>

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
