 import React, { useEffect, useState } from "react";
import { getMenusApi, deleteMenuApi, updateMenuApi } from "../../features/menu/menu.api";

const FoodList = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch menus
  const fetchMenus = async () => {
    try {
      setLoading(true);
      const res = await getMenusApi();
      setMenus(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch menus");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  // Delete a menu item
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this menu item?")) return;
    try {
      await deleteMenuApi(id);
      setMenus((prev) => prev.filter((menu) => menu._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete menu");
    }
  };

  // Toggle availability
  const handleToggleAvailability = async (menu) => {
    try {
      const updatedMenu = {
        ...menu,
        isAvailable: !menu.isAvailable,
      };
      await updateMenuApi(menu._id, updatedMenu);
      setMenus((prev) =>
        prev.map((m) => (m._id === menu._id ? updatedMenu : m))
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update menu");
    }
  };

  if (loading)
    return <p className="text-center text-amber-700 font-medium">Loading menus...</p>;
  if (error)
    return <p className="text-center text-red-600 font-medium">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {menus.map((menu) => (
        <div
          key={menu._id}
          className="bg-white rounded-xl shadow-lg border border-amber-200 overflow-hidden flex flex-col"
        >
          <div className="relative">
            <img
              src={menu.image || "/placeholder.png"}
              alt={menu.name}
              className="w-full h-48 object-cover"
            />
            {menu.isVeg && (
              <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                Veg
              </span>
            )}
            {!menu.isVeg && (
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                Non-Veg
              </span>
            )}
            <span className="absolute top-2 right-2 bg-amber-600 text-white text-xs px-2 py-1 rounded">
              {menu.spiceLevel === "mild" && "🌿 Mild"}
              {menu.spiceLevel === "medium" && "🌶 Medium"}
              {menu.spiceLevel === "hot" && "🔥 Hot"}
            </span>
          </div>

          <div className="p-4 flex flex-col gap-2 flex-1">
            <h3 className="font-semibold text-lg text-amber-700">{menu.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{menu.description}</p>
            <p className="font-bold text-amber-800">₹{menu.price}</p>

            {/* Buttons */}
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleToggleAvailability(menu)}
                className={`flex-1 py-2 text-white rounded-lg text-sm font-medium transition 
                  ${menu.isAvailable ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-pointer"}`}
              >
                {menu.isAvailable ? "Mark Unavailable" : "Unavailable"}
              </button>
              <button
                onClick={() => handleDelete(menu._id)}
                className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodList;
