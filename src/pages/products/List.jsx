 import React, { useEffect, useState } from "react";
import { getMenusApi } from "../../features/menu/menu.api";

const FoodList = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchMenus();
  }, []);

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
        </div>
      ))}
    </div>
  );
};

export default FoodList;
