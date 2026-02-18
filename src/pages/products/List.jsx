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
      const res = await getMenusApi(); // public fetch
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
      // Remove deleted menu from state
      setMenus((prev) => prev.filter((menu) => menu._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete menu");
    }
  };

  // Update a menu item (for demo purposes, just toggle availability)
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

  if (loading) return <p>Loading menus...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {menus.map((menu) => (
        <div
          key={menu._id}
          className="border rounded shadow p-4 flex flex-col gap-2"
        >
          <img
            src={menu.image || "/placeholder.png"}
            alt={menu.name}
            className="w-full h-40 object-cover rounded"
          />
          <h3 className="font-semibold text-lg">{menu.name}</h3>
          <p className="text-sm text-gray-600">{menu.description}</p>
          <p className="font-bold">₹{menu.price}</p>

          {/* Buttons for update & delete */}
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => handleToggleAvailability(menu)}
              className="bg-blue-500 text-white py-1 px-2 rounded text-sm"
            >
              {menu.isAvailable ? "Mark Unavailable" : "Mark Available"}
            </button>
            <button
              onClick={() => handleDelete(menu._id)}
              className="bg-red-500 text-white py-1 px-2 rounded text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodList;
