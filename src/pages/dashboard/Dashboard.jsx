 "use client";

import React, { useEffect, useState } from "react";

const DashboardPage = () => {
  const [menus, setMenus] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Stats calculation
  const totalProducts = menus.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const pendingOrders = orders.filter((o) => o.status === "Pending").length;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const menusRes = await fetch("https://foodex-backend--muzamilsakhi079.replit.app/api/menus");
        const menusData = await menusRes.json();
        setMenus(menusData.data || []);

        const ordersRes = await fetch("https://foodex-backend--muzamilsakhi079.replit.app/api/orders");
        const ordersData = await ordersRes.json();
        setOrders(ordersData.orders || []);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-amber-400">Loading dashboard...</p>;
  }

  const stats = [
    { title: "Total Products", value: totalProducts },
    { title: "Total Orders", value: totalOrders },
    { title: "Total Revenue", value: `₨${totalRevenue.toLocaleString("en-PK")}` },
    { title: "Pending Orders", value: pendingOrders },
  ];

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent">
        Product & Orders Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-6 bg-[#3B2A1E]/80 rounded-xl shadow-md flex flex-col items-start"
          >
            <h2 className="text-lg font-semibold text-gray-300">{stat.title}</h2>
            <p className="text-2xl font-bold mt-2 text-amber-400">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Latest Products */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {menus.map((menu) => (
            <div key={menu._id} className="bg-[#3B2A1E]/80 rounded-xl shadow-md overflow-hidden">
              <img
                src={menu.image}
                alt={menu.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-white">{menu.name}</h3>
                <p className="text-gray-300 text-sm mt-1">{menu.category?.name}</p>
                <p className="text-amber-400 font-bold mt-2">₨{menu.discountPrice}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Orders */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-[#3B2A1E]/80 text-gray-300">
              <tr>
                <th className="border px-3 py-2">Order ID</th>
                <th className="border px-3 py-2">Items</th>
                <th className="border px-3 py-2">Total</th>
                <th className="border px-3 py-2">Payment</th>
                <th className="border px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-[#3B2A1E]/50 transition-colors"
                >
                  <td className="border px-3 py-2 text-amber-400 font-semibold">
                    #{order._id.slice(-6).toUpperCase()}
                  </td>
                  <td className="border px-3 py-2">
                    {order.items.map((i) => `${i.menuItem?.name} x ${i.quantity}`).join(", ")}
                  </td>
                  <td className="border px-3 py-2 text-green-400 font-medium">
                    ₨{order.totalAmount.toLocaleString("en-PK")}
                  </td>
                  <td className="border px-3 py-2">{order.paymentMethod}</td>
                  <td className="border px-3 py-2">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;